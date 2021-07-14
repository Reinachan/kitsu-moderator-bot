import fetch from 'node-fetch';
import { setServerSideProps } from '../google/setProps';
import authorize from './auth';

const unban = async (id: number, uId: string) => {
	const unbanned = await fetch(`https://kitsu.io/api/edge/users/${uId}/_ban`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + process.env.KITSU_BEARER,
			'Content-Type': 'application/vnd.api+json',
		},
	});

	const res = JSON.parse(await unbanned.text());

	console.log(res.banned);

	if (res.banned === false) {
		console.log('banned');
		setServerSideProps(id);
	}
};

export default unban;
