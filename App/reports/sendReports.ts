import Discord, {
	Client,
	Message,
	MessageActionRow,
	MessageActionRowOptions,
	MessageButton,
	MessageButtonOptions,
	MessageEmbed,
	TextChannel,
} from 'discord.js';
import { Profile, Report, ReportItemUnion } from '../gen/kitsu';
import simpleReportsStore, {
	simpleUpdateReportStore,
} from '../util/ReportsStorage';
import axios from 'axios';
import { UserFragment } from '../gen/kitsu';
import { client } from '../index';

interface NaughtyContent {
	id: string;
	reason: string;
	content: string;
	media?: string | null;
	source?: string;
}

const naughtyContent = (
	naughty: ReportItemUnion
): NaughtyContent | undefined => {
	if (naughty.__typename === 'Post') {
		return {
			id: naughty.id,
			reason: 'posts',
			content: naughty.content ?? 'Image',
			// @ts-ignore
			media: naughty.postMedia?.titles?.canonical,
		};
	}
	if (naughty.__typename === 'Comment') {
		return {
			id: naughty.id,
			reason: 'comments',
			content: naughty.content ?? 'Image',
			source: naughty?.post?.id,
		};
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

const mkdLink = (displayed: string, link: string) => {
	return `[${displayed}](${link})`;
};

const isSpoiler = (report: Report) => {
	if (report.reason === 'SPOILER') {
		return true;
	}
	return false;
};

const truncate = (description: string) => {
	if (description && description.length > 2500) {
		return description.slice(0, 2500);
	}
	return description;
};

const linkButton = (label: string, url: string): MessageButtonOptions => {
	return {
		type: 2,
		label: label,
		url: url,
		style: 5,
	};
};

const avatar = (link: string | undefined) => {
	if (link === '/avatars/original/missing.png' || link === undefined) {
		return 'https://media.kitsu.io/users/avatars/172892/large.png?1618344125';
	}
	return link;
};

const sendReport = async (report: Report, update?: SavedReport) => {
	const reportsId = process.env.REPORTS_ID || '';
	const reportsToken = process.env.REPORTS_TOKEN || '';

	const webhookClient = new Discord.WebhookClient({
		id: reportsId,
		token: reportsToken,
	});

	const naughty = naughtyContent(report.naughty);

	const spoiler = isSpoiler(report);

	const description = spoiler
		? 'Potential spoiler for ' +
		  naughty?.media +
		  '\n\n||' +
		  truncate(naughty?.content ?? '') +
		  '||'
		: truncate(naughty?.content ?? '');

	const contentLink = (): MessageButtonOptions[] => {
		return [
			linkButton(
				report?.naughty?.__typename!,
				`https://kitsu.io/${naughty?.reason}/${naughty?.id}`
			),
			report.naughty.__typename === 'Comment'
				? linkButton('⟶ Post', `https://kitsu.io/posts/${naughty?.source}`)
				: (undefined as unknown as MessageButtonOptions),
		];
	};

	const links =
		`[${report.naughty.author.name}](https://kitsu.io/users/${report.naughty.author.id})\n` +
		contentLink() +
		`[Open Reports](https://kitsu.io/admin/reports/open)`;

	const fields: Discord.EmbedFieldData[] = [
		{ name: 'Reason', value: report.reason.toLowerCase(), inline: true },
		{ name: 'User ID', value: report.naughty.author.id, inline: true },
	];

	const linkSource = () => {
		if (report.naughty.__typename === 'Comment')
			return [
				linkButton(
					report?.naughty?.__typename!,
					`https://kitsu.io/${naughty?.reason}/${naughty?.id}`
				),
				linkButton('on Post', `https://kitsu.io/posts/${naughty?.source}`),
			];
		return [
			linkButton(
				report?.naughty?.__typename!,
				`https://kitsu.io/${naughty?.reason}/${naughty?.id}`
			),
		];
	};

	const openReports = [
		linkButton('Open Reports', 'https://kitsu.io/admin/reports/open'),
	];

	const userRow: MessageButtonOptions[] = [
		linkButton('Reporter', `https://kitsu.io/users/${report.reporter.id}`),
		linkButton(
			report.naughty.author.name,
			`https://kitsu.io/users/${report.naughty.author.id}`
		),
	];

	// Remove the numbers at the end of the pfp which is causing issues
	const modPfp =
		avatar(
			report.moderator?.avatarImage?.original.url.replace(/\?[0-9]+$/, '')
		) ?? undefined;

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

	const messageContent = report.explanation
		? report.explanation?.length > 0
			? report.explanation
			: 'No explanation'
		: 'No explanation';

	const componentRow = (
		buttons: MessageButtonOptions[]
	): MessageActionRowOptions => {
		return {
			type: 1,
			components: buttons,
		};
	};

	if (update) {
		const discord = axios({
			url: `https://discord.com/api/webhooks/${reportsId}/${reportsToken}/messages/${update?.discordId}`,
			headers: {
				wait: 'false',
			},
			method: 'patch',
			data: {
				content: messageContent,
				username: report.reporter.name,
				avatar_url: avatar(report.reporter.avatarImage?.original.url),
				embeds: [embed],
				components: [
					componentRow(userRow),
					componentRow(linkSource()),
					componentRow(openReports),
				],
			},
			responseType: 'json',
		});

		const response = await discord;

		simpleUpdateReportStore({
			id: report.id,
			discordId: update.discordId,
			status: report.status,
		});
	} else {
		const discord = webhookClient.send({
			content: messageContent,
			username: report.reporter.name,
			avatarURL: avatar(report.reporter.avatarImage?.original.url),
			embeds: [embed],
			components: [
				componentRow(userRow),
				componentRow(linkSource()),
				componentRow(openReports),
			],
		});

		const response = await discord;

		simpleReportsStore({
			id: report.id,
			discordId: response.id,
			status: report.status,
		});
	}
};

export const editReport = async (data: SavedReport, moderator: Profile) => {
	const reportsId = process.env.REPORTS_ID || '';
	const reportsToken = process.env.REPORTS_TOKEN || '';

	const webhookClient = new Discord.WebhookClient({
		id: reportsId,
		token: reportsToken,
	});

	const guild = client.guilds.cache.find(
		(guild) => guild.name === process.env.SERVER
	);

	const channel = guild?.channels.cache.find(
		(channel) => channel.id === process.env.REPORTS_CHANNEL_ID
	) as TextChannel;

	console.log(process.env.REPORTS_CHANNEL_ID);

	const messageList = await channel.messages.fetch({ limit: 20 });

	const message = messageList.get(data.discordId);

	console.log(message);

	const recievedEmbed = message?.embeds[0];

	console.log(recievedEmbed);

	const modPfp =
		avatar(moderator?.avatarImage?.original.url.replace(/\?[0-9]+$/, '')) ??
		undefined;

	const embed = new MessageEmbed(recievedEmbed).setFooter(
		`${moderator?.name} • ${data.status}`,
		modPfp
	);

	console.log(embed);

	const edited = webhookClient.editMessage(data.discordId, {
		content: message?.content,
		embeds: [embed],
	});

	simpleReportsStore({
		id: data.id,
		discordId: data.discordId,
		status: data.status,
	});
};

export default sendReport;
