import { GraphQLClient } from 'graphql-request';
import { GqlReports, GqlReportsPartial } from '../gen/query'; // THIS FILE IS THE GENERATED FILE
import { ReportsQuery } from '../gen/kitsu';
import authorize from '../kitsu/auth';
import { checkExists } from '../util/ReportsStorage';

import client from '../ApolloGraphql';
import { ApolloQueryResult, gql } from '@apollo/client/core';

export const enum FetchData {
	All = 1,
	Partial = 2,
}

const fetchReports = async (fetchData: FetchData) => {
	const variables = {
		first: 20,
	};

	const get = await client();

	if (fetchData === FetchData.All) {
		const res = await get.query<ReportsQuery>({
			query: GqlReports,
			variables: variables,
			errorPolicy: 'all',
		});

		return res;
	} else {
		const res = await get.query<ReportsQuery>({
			query: GqlReportsPartial,
			variables: variables,
			errorPolicy: 'all',
		});

		return res;
	}
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
