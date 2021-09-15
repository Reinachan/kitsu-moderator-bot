import fetch from 'node-fetch';
require('dotenv').config();

interface AuthRes {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	created_at: number;
}

interface BodyType {
	grant_type: string;
	refresh_token?: string;
	username?: string;
	password?: string;
}

const expiresWhen = (expIn: number) => {
	const now = Date.now();
	// Coerces it to expire earlier than it actually does so that it can be refreshed in time
	const expires = now + expIn * 1000 - 2400000;

	return expires.toString();
};

const setAuth = (res: AuthRes) => {
	process.env.KITSU_BEARER = res.access_token;
	process.env.KITSU_REFRESH = res.refresh_token;

	process.env.KITSU_EXPIRES = expiresWhen(res.expires_in);

	console.log(parseInt(process.env.KITSU_EXPIRES) - Date.now());
};

const token = async (body: BodyType) => {
	const auth = await fetch(`https://kitsu.io/api/oauth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	return JSON.parse(await auth.text());
};

const getAuth = async (uname: string, psswrd: string) => {
	const body = {
		grant_type: 'password',
		username: uname,
		password: psswrd,
	};

	return await token(body);
};

const refreshToken = async () => {
	const refresh = process.env.KITSU_REFRESH;

	const body = {
		grant_type: 'refresh_token',
		refresh_token: refresh,
	};

	console.log('refreshing token');

	return await token(body);
};

const isExpired = async (expires: number) => {
	if (Date.now() <= expires) {
		return process.env.KITSU_BEARER;
	}
	const refreshed: AuthRes = await refreshToken();

	setAuth(refreshed);

	return refreshed;
};

const authorize = async () => {
	const uname = process.env.KITSU_USERNAME;
	const psswrd = process.env.KITSU_PASSWORD;
	const expires = process.env.KITSU_EXPIRES;

	const bearer = async () => {
		if (uname && psswrd && !expires) {
			const auth: AuthRes = await getAuth(uname, psswrd);

			setAuth(auth);

			return auth.access_token;
		} else if (expires) {
			return await isExpired(parseInt(expires));
		} else {
			console.log('add login to .env');
		}
	};

	return await bearer();
};

export default authorize;
