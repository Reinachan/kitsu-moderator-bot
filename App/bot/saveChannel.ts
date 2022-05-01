import { TextChannel } from 'discord.js';
import fs from 'fs';
import { client } from '../index';
import { SettingName, StoredChannel } from './settings';

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
						'https://media.kitsu.io/users/avatars/172892/large.png',
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
	).catch(console.error);

	return done;

	console.log('webhook channel storage smth');
};

export const readWebhookChannel = (setting: SettingName) => {
	const path = `log/${setting}Hook.json`;
	const exists = fs.existsSync(path);

	if (exists) {
		const webhook = fs.readFileSync(path, 'utf8');
		const json = JSON.parse(webhook) as StoredChannel;

		const textChannel = client.channels.cache.get(json.channelId);

		console.log('TEXT CHANNEL' + textChannel);

		return {
			name: json.name,
			channelId: textChannel?.id,
			webhookToken: json.webhookToken,
			webhookId: json.webhookId,
		} as unknown as StoredChannel;
	}
};

export default setWebhookChannel;
