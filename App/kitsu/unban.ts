import axios from 'axios';
import fetch from 'node-fetch';
import { setServerSideProps } from '../google/setProps';
import webhookLog from '../webhookLog';
import notify from './notify';

const unbanMessage = (data: UnbanData) => {
  const logLink = `https://discord.com/api/webhooks/${process.env.UNBAN_ID}/${process.env.UNBAN_TOKEN}`;

  const boolSign = (bool: string) => {
    if (bool === 'TRUE') {
      return '✓';
    }
    return 'x';
  };

  const discord = axios({
    url: logLink,
    headers: {
      wait: 'false',
    },
    method: 'post',
    data: {
      username: 'Unban',
      avatar_url:
        'https://cdn.discordapp.com/icons/459452478673649665/4f6c3b9f6a3aab24c5333261cc519ba6.webp?size=256',
      embeds: [
        {
          title: `Unbanned ${data?.dName}`,
          // url: `https://kitsu.io/users/${data.uId}`,
          timestamp: data?.unban,
          description: `[Open profile](https://kitsu.io/users/${data?.uId})`,
          fields: [
            { name: 'Reason for ban', value: data?.reason, inline: false },
            {
              name: 'Status',
              value:
                `Unbanned: ${boolSign('TRUE')}\n` +
                `Notified: ${boolSign(data?.notify)}`,
              inline: true,
            },
            { name: 'Responsible', value: data?.moderator, inline: true },
          ],
          color: 15097922,
        },
      ],
    },
    responseType: 'json',
  });

  console.log(discord);
};

const unban = async (data: UnbanData) => {
  console.log('UNBAN');
  const id: number = data?.id;
  const uId: string = data?.uId;

  const unbanned = await fetch(`https://kitsu.io/api/edge/users/${uId}/_ban`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + process.env.KITSU_BEARER,
      'Content-Type': 'application/vnd.api+json',
    },
  });

  try {
    const res = JSON.parse(await unbanned?.text());
    console.log(res?.banned);

    if (res.banned === false) {
      console.log('unbanned');

      if (data?.notify === 'TRUE') {
        notify(data);
      }
      setServerSideProps(id);

      unbanMessage(data);
    }
  } catch {
    webhookLog('Partially Down', 'Failed to unban in some way');
  }
};

export default unban;
