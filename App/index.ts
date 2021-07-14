import unban from './kitsu/unban';
import { getServerSideProps } from './google/getProps';
import checkDate from './util/checkDate';
import authorize from './kitsu/auth';
require('dotenv').config();

console.log('before');

const mainFunction = async () => {
	let i = 2;
	let cont = true;

	while (cont) {
		const list = await getServerSideProps(i);

		if (
			list.props.unban === undefined ||
			list.props.uId === undefined ||
			list.props.unban === '' ||
			list.props.uId === ''
		) {
			console.log('stopped');
			cont = false;
		} else if (list.props.completed === 'TRUE') {
			console.log('already completed');
			i++;
		} else {
			console.log(list.props);

			if (
				checkDate(list.props.unban, list.props.time) &&
				list.props.completed === 'FALSE'
			) {
				console.log('unbanning');
				unban(list.props.id, list.props.uId);
			}

			i++;
		}
	}
	authorize();
};

authorize();

mainFunction();
setInterval(() => mainFunction(), 300000);
