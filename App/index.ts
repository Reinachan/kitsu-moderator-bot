import unban from './kitsu/unban';
import { getServerSideProps } from './google/getProps';
import checkDate from './util/checkDate';
import authorize from './kitsu/auth';
import fetchReports from './reports/fetchReports';
import sendReport from './reports/sendReports';
import { Report } from './gen/kitsu';
import webhookLog from './webhookLog';
import { checkExists } from './util/ReportsStorage';

require('dotenv').config();

console.log('Start');

const unbanFunction = async () => {
	let i = 2;
	let cont = true;

	while (cont) {
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
	const { data, error, partial } = await fetchReports();

	if (error && partial) {
		webhookLog('Reports Partial Error', error.message);
	}

	if (error && !partial) {
		throw error.message;
	}

	const nodes = data.reports?.nodes as Report[];

	let reports = [...nodes];

	if (reports) {
		reports = reports.reverse();

		for (let i = 0; i < reports.length; i++) {
			const timeout = 1000 + i * 2000;

			if (reports[i]) {
				const existing = checkExists(reports[i].id);

				setTimeout(function () {
					if (!existing) {
						sendReport(reports[i]);
					} else if (existing.status !== reports[i].status) {
						sendReport(reports[i], existing);
					}
				}, timeout);
			}
		}
	}
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
		webhookLog('Crashed', 'Total collapse');
	}
}
