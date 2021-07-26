import { DiscordAPIError } from 'discord.js';
import fs from 'fs';

const reportsLocation = './log/reports.json';

const indent = (ob: object) => {
	return JSON.stringify(ob, undefined, 2);
};

const createReportsFile = () => {
	const template: ReportsFileShape = {
		reports: [{ id: '0', discordId: '0', status: 'SOLVED' }],
	};

	fs.writeFileSync(reportsLocation, indent(template));
};

const reportsFile = () => {
	try {
		return fs.readFileSync(reportsLocation, 'utf8');
	} catch {
		createReportsFile();
		return fs.readFileSync(reportsLocation, 'utf8');
	}
};

export const checkExists = (id: string): SavedReport | null => {
	let reports: ReportsFileShape = JSON.parse(reportsFile());

	let data = null;

	reports.reports.find((report) => {
		if (report.id === id) {
			data = report;
			return true;
		}
		return false;
	});

	return data;
};

export const simpleUpdateReportStore = (data: SavedReport) => {
	let reports: ReportsFileShape = JSON.parse(reportsFile());

	const write: ReportsFileShape = {
		reports: [],
	};

	reports.reports.forEach((report) => {
		if (report.id === data.id) {
			write.reports.push(data);
		} else write.reports.push(report);
	});

	fs.writeFileSync(reportsLocation, indent(write));
};

const simpleReportsStore = (data: SavedReport) => {
	let reports: ReportsFileShape = JSON.parse(reportsFile());

	reports.reports.push(data);
	const writeData = reports;

	fs.writeFileSync(reportsLocation, indent(writeData));
};

export default simpleReportsStore;
