import { google } from 'googleapis';

export const setServerSideProps = async (id: number) => {
	console.log('set action');
	// Authenticate
	const auth = await google.auth.getClient({
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});

	const sheets = google.sheets({ version: 'v4', auth });

	const range = `Unban!A${id}`;

	const body = {
		range: `Unban!A${id}`,
		values: [['TRUE']],
	};

	const response = await sheets.spreadsheets.values.update({
		spreadsheetId: process.env.SHEET_ID,
		range,
		valueInputOption: 'USER_ENTERED',
		requestBody: body,
	});

	console.log('edited');
};
