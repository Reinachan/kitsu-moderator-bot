import {
	ApplicationCommand,
	ApplicationCommandPermissionData,
	ApplicationCommandPermissions,
	Client,
	GuildApplicationCommandPermissionData,
	GuildResolvable,
	Intents,
	TextChannel,
} from 'discord.js';
import { ApplicationCommandPermissionType } from 'discord.js/node_modules/discord-api-types';
import setWebhookChannel, { readWebhookChannel } from './bot/saveChannel';
import { Report } from './gen/kitsu';
import { getServerSideProps } from './google/getProps';
import unban from './kitsu/unban';
import fetchReports from './reports/fetchReports';
import sendReport from './reports/sendReports';
import checkDate from './util/checkDate';
import { checkExists } from './util/ReportsStorage';
import webhookLog from './webhookLog';

require('dotenv').config();

console.log('Start');

// Create a new client instance
export const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', async () => {
	console.log('Ready!');

	const permissionCommand = client.application?.commands.fetch();

	console.log(await permissionCommand);

	const init = ['reports', 'logging', 'unbans'];

	init.forEach((hookName) => {
		console.log(hookName);
		initWebhookEnvironment(hookName);
	});

	const reports = process.env.REPORTS_ID;
	const logging = process.env.LOGGING_ID;
	const unban = process.env.UNBAN_ID;

	if (reports && logging && unban) {
		main();
	}
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName, options, guild } = interaction;

	const role = options.getRole('role');

	if (commandName === 'permissions') {
		if (role?.id) {
			botRolePermissions(role.id, guild as GuildResolvable);
			interaction.reply({
				content: `Gave <@${role.id}> permissions to use commands`,
			});
		} else {
			interaction.reply({ content: `Make sure you add a role correctly` });
		}
	} else if (commandName === 'start') {
		const reports = process.env.REPORTS_ID;
		const logging = process.env.LOGGING_ID;
		const unban = process.env.UNBAN_ID;

		if (reports && logging && unban) {
			interaction.reply('Starting');

			main();
			return;
		} else {
			interaction.reply({
				content: 'Missing either reports, logging, or unban webhook',
				ephemeral: true,
			});

			return;
		}
	} else {
		const channel = options.getChannel('channel') as TextChannel;

		const hook = await setWebhookChannel(
			commandName as SettingName,
			channel as TextChannel
		);

		console.log(hook?.name, 'HERE');

		webhookEnvironment(commandName, hook);

		await interaction.reply({
			content: `${commandName} is set to <#${channel.id}>`,
			ephemeral: true,
		});
	}
});

const botRolePermissions = async (role: string, guild: GuildResolvable) => {
	const commands = (await client.application?.commands.fetch())!.forEach(
		async (command) => {
			const permissions: ApplicationCommandPermissionData[] = [
				{
					id: role,
					type: 'ROLE',
					permission: true,
				},
			];

			await command.permissions.set({ guild: guild, permissions: permissions });
		}
	);
};

const initWebhookEnvironment = (hookName: string) => {
	const hook = readWebhookChannel(hookName as SettingName);

	if (hook) webhookEnvironment(hookName, hook);
};

const webhookEnvironment = (commandName: string, hook: StoredChannel) => {
	switch (commandName) {
		case 'logging':
			console.log('logging');
			process.env.LOGGING_ID = hook?.webhookId;
			process.env.LOGGING_TOKEN = hook?.webhookToken;
			break;
		case 'reports':
			console.log('reports');
			process.env.REPORTS_ID = hook?.webhookId;
			process.env.REPORTS_TOKEN = hook?.webhookToken;
			break;
		case 'unbans':
			console.log('unbans');
			process.env.UNBAN_ID = hook?.webhookId;
			process.env.UNBAN_TOKEN = hook?.webhookToken;
			break;
	}
};

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);

const unbanFunction = async () => {
	let i = 2;
	let cont = true;

	while (cont) {
		const list: UnbanData = await getServerSideProps(i);

		if (
			list.unban === undefined ||
			list.uId === undefined ||
			list.unban === '' ||
			list.uId === ''
		) {
			console.log('stopped');
			cont = false;
		} else if (list.completed === 'TRUE') {
			console.log('already completed');
			i++;
		} else {
			console.log(list);

			if (checkDate(list.unban, list.time) && list.completed === 'FALSE') {
				unban(list);
			}

			i++;
		}
	}
};

const reportsFunction = async () => {
	const { data, error, partial } = await fetchReports();

	if (error && partial) {
		webhookLog('Reports Partial Error', error.message);
	}

	if (error && !partial) {
		throw error.message;
	}

	const nodes = data.reports?.nodes as Report[];

	let reports = [...nodes];

	if (reports) {
		reports = reports.reverse();

		for (let i = 0; i < reports.length; i++) {
			const timeout = 1000 + i * 2000;

			if (reports[i]) {
				const existing = checkExists(reports[i].id);

				setTimeout(function () {
					if (!existing) {
						sendReport(reports[i]);
					} else if (existing.status !== reports[i].status) {
						sendReport(reports[i], existing);
					}
				}, timeout);
			}
		}
	}
};

const main = () => {
	if (process.argv[2]) {
		webhookLog(process.argv[2], process.argv[3]);
	} else {
		try {
			try {
				reportsFunction();
				setInterval(() => reportsFunction(), 60000);
			} catch {
				throw 'Failed somewhere within the reports part';
			}

			try {
				unbanFunction();
				setInterval(() => unbanFunction(), 1800000);
			} catch {
				webhookLog('Crashed', 'Failed somewhere within the unbanning part');
			}
		} catch (e) {
			webhookLog('Crashed', 'Total collapse');
		}
	}
};
