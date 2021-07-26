import unban from './kitsu/unban';
import { getServerSideProps } from './google/getProps';
import checkDate from './util/checkDate';
import authorize from './kitsu/auth';
import fetchReports from './reports/fetchReports';
import sendReport from './reports/sendReports';
import { Report } from './gen/kitsu';
import sendSlowly from './util/doSlowly';
import webhookLog from './webhookLog';
import { rawListeners } from 'process';

require('dotenv').config();

console.log('before');

const unbanFunction = async () => {
	let i = 2;
	let cont = true;

	while (cont) {
		await authorize();

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
	const reports = await fetchReports();

	let rReports = reports?.nodes?.reverse();

	sendSlowly(rReports as Report[], 2000);

	/* rReports?.forEach((report) => {
		sendReport(report as Report);
	}); */

	console.log('posting');
};

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
		webhookLog('Crashed', e);
	}
}
