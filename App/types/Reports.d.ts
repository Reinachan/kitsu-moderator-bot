interface SavedReport {
	id: string;
	status: string;
	discordId: string;
}

interface ReportsFileShape {
	reports: SavedReport[];
}
