import { GraphQLClient } from 'graphql-request';
import { ReportsDocument } from '../gen/queries'; // THIS FILE IS THE GENERATED FILE
import { ReportsQuery } from '../gen/kitsu';
import authorize from '../kitsu/auth';
import { checkExists } from '../util/ReportsStorage';

import client from '../ApolloGraphql';
import { ApolloQueryResult, gql } from '@apollo/client/core';

const fetchReports = async () => {
	const variables = {
		first: 20,
	};

	const get = await client();

	const res = await get.query<ReportsQuery>({
		query: ReportsDocument,
		variables: variables,
		errorPolicy: 'all',
	});

	return res;
};

// const fetchReportsDeprecated = async () => {
// 	await authorize();

// 	const kitsu = 'https://kitsu.io/api/graphql';

// 	const variables = {
// 		first: 15,
// 	};

// 	const requestHeaders = {
// 		Authorization: 'Bearer ' + process.env.KITSU_BEARER,
// 		'content-type': 'application/json',
// 	};

// 	const client = new GraphQLClient(kitsu);

// 	const sdk = getSdk(client);

// 	const { reports } = await sdk.Reports(variables, requestHeaders); // This is fully typed, based on the query

// 	return reports;
// };

export default fetchReports;
