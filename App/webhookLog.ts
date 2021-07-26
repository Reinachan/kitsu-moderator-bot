import axios from 'axios';

const webhookLog = (name: string, content: string, channel?: string) => {
	const logLink = process.env.LOG_LINK;

	console.log(name, content);

	const discord = axios({
		url: channel ?? logLink,
		headers: {
			wait: 'false',
		},
		method: 'post',
		data: {
			content: content,
			username: name,
			avatar_url:
				'https://cdn.discordapp.com/icons/459452478673649665/4f6c3b9f6a3aab24c5333261cc519ba6.webp?size=256',
		},
		responseType: 'json',
	});
};

export default webhookLog;
