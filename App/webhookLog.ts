import axios from 'axios';

const webhookLog = (name: string, content: string) => {
	const logLink = process.env.LOG_LINK;

	const discord = axios({
		url: logLink,
		headers: {
			wait: 'false',
		},
		method: 'post',
		data: {
			content: content,
			username: name,
			avatar_url: '',
		},
		responseType: 'json',
	});
};

export default webhookLog;
