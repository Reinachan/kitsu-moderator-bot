import fetch from 'node-fetch';
import { setServerSideProps } from '../google/setProps';

const notify = async (data: UnbanData) => {
	const content =
		data.unmuteMessage ||
		'Your account has been unmuted. Welcome back to Kitsu :)';

	const body = {
		data: {
			attributes: { content: content, embedUrl: null, spoiler: false },
			relationships: {
				targetUser: { data: { type: 'users', id: data.uId } },
				user: { data: { type: 'users', id: '-12' } },
				uploads: { data: [] },
			},
			type: 'posts',
		},
	};

	const post = await fetch(`https://kitsu.io/api/edge/posts`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + process.env.KITSU_BEARER,
			'Content-Type': 'application/vnd.api+json',
		},
		body: JSON.stringify(body),
	});

	const res = JSON.parse(await post.text());

	console.log(res);
};

export default notify;
