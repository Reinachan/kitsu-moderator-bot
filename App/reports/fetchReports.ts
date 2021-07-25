import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../gen/kitsu'; // THIS FILE IS THE GENERATED FILE
import authorize from '../kitsu/auth';
import { checkExists } from '../util/ReportsStorage';

const fetchReports = async () => {
	await authorize();

	const kitsu = 'https://kitsu.io/api/graphql';

	const variables = {
		first: 15,
	};

	const requestHeaders = {
		Authorization: 'Bearer ' + process.env.KITSU_BEARER,
		'content-type': 'application/json',
	};

	const client = new GraphQLClient(kitsu);

	const sdk = getSdk(client);

	const { reports } = await sdk.Reports(variables, requestHeaders); // This is fully typed, based on the query

	return reports;
};

export default fetchReports;
