const checkDate = (date: string, time: string | null) => {
	let datetime = date + 'T12:00:00';
	if (time && time !== '') {
		datetime = date + 'T' + time + ':00';
	}

	const unban = Date.parse(datetime);
	const now = Date.now();

	console.log(datetime);

	console.log(unban, now, unban - now);

	// If the unban date is before the current date, return false
	if (unban >= now) {
		return false;
	}
	return true;
};

export default checkDate;
