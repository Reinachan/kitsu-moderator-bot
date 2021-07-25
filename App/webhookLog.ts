import axios from 'axios';

const webhookLog = (failed: string) => {
	const logLink = process.env.LOG_LINK;

	const discord = axios({
		url: logLink,
		headers: {
			wait: 'false',
		},
		method: 'post',
		data: {
			content: 'The ' + failed + ' part has failed',
			username: failed,
			avatar_url: '',
		},
		responseType: 'json',
	});
};

export default webhookLog;
