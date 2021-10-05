import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

require('dotenv').config();

const commands = [
	new SlashCommandBuilder()
		.setName('permissions')
		.setDescription(
			'Choose which roles can do restricted commands with this bot'
		)
		.setDefaultPermission(false)
		.addRoleOption((option) =>
			option
				.setName('role')
				.setDescription(
					'The role that should be permitted dangerous access to this bot'
				)
				.setRequired(true)
		),
	new SlashCommandBuilder()
		.setName('logging')
		.setDescription('Select channel as the channel to log to')
		.setDefaultPermission(false)
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('Choose channel')
				.setRequired(true)
		),
	new SlashCommandBuilder()
		.setName('unbans')
		.setDescription('Select channel to send unban messages to')
		.setDefaultPermission(false)
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('Choose channel')
				.setRequired(true)
		),
	new SlashCommandBuilder()
		.setName('reports')
		.setDescription('Select channel to send reports to')
		.setDefaultPermission(false)
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('Choose channel')
				.setRequired(true)
		),
	new SlashCommandBuilder()
		.setName('start')
		.setDescription('Start the bot after initialising webhooks')
		.setDefaultPermission(false),
].map((command) => command.toJSON());

const clientId = process.env.BOT_CLIENT_ID;
const guildId = process.env.BOT_GUILD_ID;
const token = process.env.BOT_TOKEN;

console.log(clientId, guildId, token);

if (!clientId) {
	console.log('Missing Bot Client ID');
}
if (!token) {
	console.log('Missing Bot Token');
}
if (!guildId) {
	console.log('Missing bot Guild ID');
}

if (clientId && token && guildId) {
	const rest = new REST({ version: '9' }).setToken(token);

	(async () => {
		try {
			await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
				body: commands,
			});

			console.log('Successfully registered application commands.');
		} catch (error) {
			console.error(error);
		}
	})();
}
