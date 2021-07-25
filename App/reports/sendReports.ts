import Discord from 'discord.js';
import { Report, ReportItemUnion } from '../gen/kitsu';
import simpleReportsStore, {
	simpleUpdateReportStore,
} from '../util/ReportsStorage';
import axios from 'axios';

interface NaughtyContent {
	id: string;
	reason: string;
	content: string;
	media?: string | null;
}

const naughtyContent = (
	naughty: ReportItemUnion
): NaughtyContent | undefined => {
	if (naughty.__typename === 'Post') {
		return {
			id: naughty.id,
			reason: 'posts',
			content: naughty.content,
			// @ts-ignore
			media: naughty.postMedia?.titles?.canonical,
		};
	}
	if (naughty.__typename === 'Comment') {
		return { id: naughty.id, reason: 'comments', content: naughty.content };
	}
	if (naughty.__typename === 'MediaReaction') {
		return {
			id: naughty.id,
			reason: 'media-reactions',
			content: naughty.reaction,
			media: naughty.media?.titles?.canonical,
		};
	}
	if (naughty.__typename === 'Review') {
		return {
			id: naughty.id,
			reason: 'reviews',
			content: naughty.content,
			media: naughty.media?.titles?.canonical,
		};
	}
};

const isSpoiler = (report: Report) => {
	if (report.reason === 'SPOILER') {
		return true;
	}
	return false;
};

const sendReport = async (report: Report, update?: SavedReport) => {
	const webhookClient = new Discord.WebhookClient(
		process.env.REPORTS_WEBHOOK_ID ?? '',
		process.env.REPORTS_WEBHOOK_TOKEN ?? ''
	);

	const avatar = (link: string | undefined) => {
		if (link === '/avatars/original/missing.png' || link === undefined) {
			return 'https://media.kitsu.io/users/avatars/172892/large.png?1618344125';
		}
		return link;
	};

	const naughty = naughtyContent(report.naughty);

	const spoiler = isSpoiler(report);

	const description = spoiler
		? 'Potential spoiler for ' +
		  naughty?.media +
		  '\n\n||' +
		  naughty?.content +
		  '||'
		: naughty?.content;

	const links = `[${report.naughty.author.name}](https://kitsu.io/users/${
		report.naughty.author.id
	})\n[${report.reason.toLowerCase()}](https://kitsu.io/${naughty?.reason}/${
		naughty?.id
	})\n[Open Reports](https://kitsu.io/admin/reports/open)`;

	const fields: Discord.EmbedFieldData[] = [
		{ name: 'Reason', value: report.reason.toLowerCase(), inline: true },
		{ name: 'Links', value: links, inline: true },
	];

	// Remove the numbers at the end of the pfp which is causing issues
	const modPfp =
		avatar(
			report.moderator?.avatarImage?.original.url.replace(/\?[0-9]+$/, '')
		) ?? undefined;

	console.log(modPfp);

	const embed = {
		author: {
			name: report.naughty.author.name,
			icon_url: avatar(report.naughty.author.avatarImage?.original.url),
			url: 'https://kitsu.io/users/' + report.naughty.author.id,
		},
		description: description,
		footer: {
			text: report.moderator?.name + ' • ' + report.status,
			icon_url: modPfp,
		},
		timestamp: report.createdAt,
		fields: fields,
		title: report.naughty.__typename,
		color: 15097922,
	};

	if (update) {
		const discord = axios({
			url: process.env.REPORTS_WEBHOOK + '/messages/' + update?.discordId,
			headers: {
				wait: 'false',
			},
			method: 'patch',
			data: {
				content: report.explanation ?? '',
				username: report.reporter.name,
				avatar_url: avatar(report.reporter.avatarImage?.original.url),
				embeds: [embed],
			},
			responseType: 'json',
		});

		const response = await discord;
		console.log(response);

		console.log('update');
		console.log(
			report.status,
			report.reason,
			report.naughty.__typename,
			report.id
		);

		simpleUpdateReportStore({
			id: report.id,
			discordId: update.discordId,
			status: report.status,
		});
	} else {
		const discord = webhookClient.send(report.explanation, {
			username: report.reporter.name,
			avatarURL: avatar(report.reporter.avatarImage?.original.url),
			embeds: [embed],
		});

		const response = await discord;

		console.log('send new');

		simpleReportsStore({
			id: report.id,
			discordId: response.id,
			status: report.status,
		});
	}
};

export default sendReport;
