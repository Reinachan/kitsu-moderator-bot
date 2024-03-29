import Discord, {
  BaseMessageComponentOptions,
  MessageActionRowComponentResolvable,
  MessageActionRowOptions,
  MessageEmbed,
  TextChannel,
} from 'discord.js';
import { ReportFragment } from '../gen/kitsu';
import simpleReportsStore, {
  simpleUpdateReportStore,
} from '../helpers/ReportsStorage';
import { client } from '../index';

interface NaughtyContent {
  id: string;
  reason: string;
  content: string;
  media?: string | null;
  source?: string;
}

const naughtyContent = (
  naughty: ReportFragment['naughty']
): NaughtyContent | undefined => {
  if (naughty?.__typename === 'Post') {
    return {
      id: naughty.id,
      reason: 'posts',
      content: naughty.content ?? 'Image',
      // @ts-ignore
      media: naughty.postMedia?.titles?.canonical,
    };
  }
  if (naughty?.__typename === 'Comment') {
    return {
      id: naughty.id,
      reason: 'comments',
      content: naughty.content ?? 'Image',
      source: naughty?.post?.id,
    };
  }
  if (naughty?.__typename === 'MediaReaction') {
    return {
      id: naughty.id,
      reason: 'media-reactions',
      content: naughty.reaction,
      media: naughty.media?.titles?.canonical,
    };
  }
  if (naughty?.__typename === 'Review') {
    return {
      id: naughty.id,
      reason: 'reviews',
      content: naughty.reviewContent,
      media: naughty.media?.titles?.canonical,
    };
  }
};

// const mkdLink = (displayed: string, link: string) => {
//   return `[${displayed}](${link})`;
// };

const isSpoiler = (report: ReportFragment) => {
  if (report.reason === 'SPOILER') {
    return true;
  }
  return false;
};

const truncate = (description: string) => {
  if (description && description.length > 2500) {
    return description.slice(0, 2400) + '...';
  }
  return description;
};

const linkButton = (
  label: string,
  url: string
): MessageActionRowComponentResolvable => {
  return {
    type: 2,
    label: label,
    url: url,
    style: 5,
  };
};

const avatar = (link: string | undefined) => {
  if (link === '/avatars/original/missing.png' || link === undefined) {
    return 'https://media.kitsu.io/users/avatars/172892/large.png';
  }
  return link;
};

const generateDescription = (
  spoiler: boolean,
  content: string,
  mediaTitle?: string | null
) => {
  if (spoiler && mediaTitle) {
    return `Potential spoiler for: ${mediaTitle}\n\n||${truncate(content)}||`;
  }
  if (spoiler) {
    return `||${truncate(content)}||`;
  }
  return truncate(content);
};

const sendReport = async (report: ReportFragment) => {
  const reportsId = process.env.REPORTS_ID || '';
  const reportsToken = process.env.REPORTS_TOKEN || '';

  const webhookClient = new Discord.WebhookClient({
    id: reportsId,
    token: reportsToken,
  });

  const naughty = naughtyContent(report.naughty);

  const spoiler = isSpoiler(report);

  const description = generateDescription(
    spoiler,
    naughty?.content ?? '',
    naughty?.media
  );

  // const contentLink = (): MessageActionRowComponentResolvable[] => {
  //   return [
  //     linkButton(
  //       report?.naughty?.__typename ?? 'Reported Content',
  //       `https://kitsu.io/${naughty?.reason}/${naughty?.id}`
  //     ),
  //     report?.naughty?.__typename === 'Comment'
  //       ? linkButton('⟶ Post', `https://kitsu.io/posts/${naughty?.source}`)
  //       : (undefined as unknown as MessageActionRowComponentResolvable),
  //   ];
  // };

  // const links =
  //   `[${report?.naughty?.author.name}](https://kitsu.io/users/${report?.naughty?.author.id})\n` +
  //   contentLink() +
  //   `[Open Reports](https://kitsu.io/admin/reports/open)`;

  const fields: Discord.EmbedFieldData[] = [
    { name: 'Reason', value: report?.reason?.toLowerCase(), inline: true },
    {
      name: 'User ID',
      value: report?.naughty?.author.id ?? 'missing id',
      inline: true,
    },
  ];

  const linkSource = () => {
    if (report?.naughty?.__typename === 'Comment') {
      return [
        linkButton(
          report.naughty.__typename,
          `https://kitsu.io/${naughty?.reason}/${naughty?.id}`
        ),
        linkButton('on Post', `https://kitsu.io/posts/${naughty?.source}`),
      ];
    }
    if (report?.naughty?.__typename) {
      return [
        linkButton(
          report?.naughty?.__typename ?? '',
          `https://kitsu.io/${naughty?.reason}/${naughty?.id}`
        ),
      ];
    } else {
      return [linkButton('unknown', 'https://kitsu.io/')];
    }
  };

  const openReports = [
    linkButton('Open Reports', 'https://kitsu.io/admin/reports/open'),
  ];

  const userRow: MessageActionRowComponentResolvable[] = [
    linkButton('Reporter', `https://kitsu.io/users/${report.reporter.id}`),
    linkButton(
      report?.naughty?.author.name ?? 'Naughty User',
      `https://kitsu.io/users/${report?.naughty?.author.id}`
    ),
  ];

  // Remove the numbers at the end of the pfp which is causing issues
  const modPfp =
    avatar(
      report.moderator?.avatarImage?.original.url.replace(/\?[0-9]+$/, '')
    ) ?? undefined;

  const embed = {
    author: {
      name: report?.naughty?.author.name,
      icon_url: avatar(report?.naughty?.author.avatarImage?.original.url),
      url: 'https://kitsu.io/users/' + report?.naughty?.author.id,
    },
    description: description,
    footer: {
      text: report.moderator?.name + ' • ' + report.status,
      icon_url: modPfp,
    },
    timestamp: report.createdAt,
    fields: fields,
    title: report?.naughty?.__typename,
    color: 15097922,
  };

  const messageContent = report.explanation
    ? report.explanation?.length > 0
      ? report.explanation
      : 'No explanation'
    : 'No explanation';

  const componentRow = (
    buttons: MessageActionRowComponentResolvable[]
  ): Required<BaseMessageComponentOptions> & MessageActionRowOptions => {
    return {
      type: 1,
      components: buttons,
    };
  };

  const response = await webhookClient.send({
    content: messageContent,
    username: report.reporter.name,
    avatarURL: avatar(report.reporter.avatarImage?.original.url),
    embeds: [embed],
    components: [
      componentRow(userRow.concat(linkSource().concat(openReports))),
    ],
  });

  simpleReportsStore({
    id: report.id,
    discordId: response.id,
    status: report.status,
  });
};

export const editReport = async (
  data: SavedReport,
  moderator: ReportFragment['moderator']
) => {
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

  const messageList = await channel.messages.fetch({ limit: 20 });

  const message = messageList.get(data.discordId);

  const recievedEmbed = message?.embeds[0];

  const modPfp =
    avatar(moderator?.avatarImage?.original.url.replace(/\?[0-9]+$/, '')) ??
    undefined;

  const embed = new MessageEmbed(recievedEmbed).setFooter({
    text: `${moderator?.name} • ${data.status}`,
    iconURL: modPfp,
  });

  console.log(embed);

  const res = await webhookClient.editMessage(data.discordId, {
    embeds: [embed],
  });

  console.log(res);

  if (res.content) {
    simpleUpdateReportStore({
      id: data.id,
      discordId: data.discordId,
      status: data.status,
    });
  }
};

export default sendReport;
