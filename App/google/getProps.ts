import { google } from 'googleapis';

export const getServerSideProps = async (id: number) => {
	// Authenticate
	const auth = await google.auth.getClient({
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});

	const sheets = google.sheets({ version: 'v4', auth });

	const range = `Unban!A${id}:E${id}`;

	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: process.env.SHEET_ID,
		range,
	});

	const [completed, dName, uId, unban, time]: string[] = response.data
		.values![0] ?? ['', '', '', '', ''];

	return {
		props: {
			id,
			completed,
			dName,
			uId,
			unban,
			time,
		},
	};
};
