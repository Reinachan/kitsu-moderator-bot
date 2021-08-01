import { Report } from '../gen/kitsu';
import sendReport from '../reports/sendReports';
import { checkExists } from './ReportsStorage';

const sendSlowly = (array: Report[], speed: number) => {
	if (array.length == 0) return;

	const existing = checkExists(array[0].id);

	setTimeout(function () {
		if (!existing) {
			sendReport(array[0]);
			sendSlowly(array.slice(1), 2000);
		} else if (existing.status !== array[0].status) {
			sendReport(array[0], existing);
			sendSlowly(array.slice(1), 2000);
		} else {
			sendSlowly(array.slice(1), 2000);
		}
	}, speed);
};

export default sendSlowly;
