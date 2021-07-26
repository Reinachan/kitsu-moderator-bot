import fetch from 'node-fetch';
import { setServerSideProps } from '../google/setProps';
import webhookLog from '../webhookLog';
import notify from './notify';

const unban = async (data: UnbanData) => {
	console.log('UNBAN');
	const id: number = data.id;
	const uId: string = data.uId;

	const unbanned = await fetch(`https://kitsu.io/api/edge/users/${uId}/_ban`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + process.env.KITSU_BEARER,
			'Content-Type': 'application/vnd.api+json',
		},
	});

	try {
		const res = JSON.parse(await unbanned.text());
		console.log(res.banned);

		if (res.banned === false) {
			console.log('unbanned');

			if (data.notify === 'TRUE') {
				notify(data);
			}
			setServerSideProps(id);
			webhookLog('Unban', `Unbanning ${data.dName}`, process.env.UNBAN_LINK);
		}
	} catch {
		webhookLog('Partially Down', 'Failed to unban in some way');
	}
};

export default unban;
