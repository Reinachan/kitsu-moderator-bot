import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client/core';
import fetch from 'cross-fetch';
import authorize from './kitsu/auth';

const client = async () => {
	const token = await authorize();

	const requestHeaders = {
		Authorization: token ? `Bearer ${token}` : '',
		'content-type': 'application/json',
	};

	console.log(requestHeaders);

	const link = createHttpLink({
		uri: 'https://kitsu.io/api/graphql',
		fetch: fetch,
		headers: requestHeaders,
	});

	const apollo = new ApolloClient({
		link: link,
		cache: new InMemoryCache(),
	});

	return apollo;
};

export default client;
