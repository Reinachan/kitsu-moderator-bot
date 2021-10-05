import { CommandInteractionOptionResolver, TextChannel } from 'discord.js';
import fs from 'fs';
import { client } from '../index';
import { tokenToString } from 'typescript';

const setWebhookChannel = async (
	setting: SettingName,
	channel: TextChannel
) => {
	const logDir = fs.existsSync('log/');

	const path = `log/${setting}Hook.json`;

	console.log(channel);

	const done = new Promise(
		(resolve: (value: StoredChannel) => void, reject) => {
			channel
				.createWebhook(setting, {
					avatar:
						'https://media.kitsu.io/users/avatars/172892/large.png?1618344125',
				})
				.then((webhook) => {
					if (logDir) {
						const settingsStore = {
							name: channel.name,
							channelId: channel.id,
							webhookToken: webhook.token,
							webhookId: webhook.id,
						};
						fs.writeFileSync(path, JSON.stringify(settingsStore));
						resolve(settingsStore as StoredChannel);
					}
					console.log(`token ${webhook.token} id ${webhook.id}`);
					reject('failed');
				})
				.catch(console.error);
		}
	);

	return done;

	console.log('webhook channel storage smth');
};

export const readWebhookChannel = (setting: SettingName) => {
	const path = `log/${setting}Hook.json`;
	const exists = fs.existsSync(path);

	if (exists) {
		const webhook = fs.readFileSync(path, 'utf8');
		const json = JSON.parse(webhook) as StoredChannel;

		const textChannel = client.channels.cache.get(
			json.channelId
		) as TextChannel;

		return {
			name: json.name,
			channel: textChannel,
			webhookToken: json.webhookToken,
			webhookId: json.webhookId,
		} as unknown as StoredChannel;
	}
};

export default setWebhookChannel;
