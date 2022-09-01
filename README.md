# Kitsu Moderator Bot

Unbans users on a specified date and time using a Google Sheet as well as sending reports to a Discord channel.

Fetches every 30 minutes.

## Setup

Add the `./kitsu-moderator-bot.service` file as a systemd service like this

Modify the "exec" field in `./kitsu-moderator-bot.service` to be the absolute path to the `./start.sh` script in this folder.

Restrict read/write access so only you can read/write and the group can only read by running

```bash
sudo chmod 640 ./kitsu-moderator-bot.service
```

From this directory, run

```bash
sudo cp ./kitsu-moderator-bot.service /etc/systemd/system
```

Reload the daemon for the upcoming systemctl commands to work with this command

```bash
sudo systemctl daemon-reload
```

To enable the service to start when the computer starts, run

```bash
sudo systemctl enable kitsu-moderator-bot
```

To start the service run

```bash
sudo systemctl start kitsu-moderator-bot
```

To verify it's working correctly, run

```bash
sudo systemctl status kitsu-moderator-bot
```

To stop the service run

```bash
sudo systemctl stop kitsu-moderator-bot
```

To disable the service run

```bash
sudo systemctl disable kitsu-moderator-bot
```

## Sheet format

| **Done** | **Displayname** | **User ID**\* | **Date**\* | **Time** (24h, UTC+2) | **Moderator** | **Reason**                     |
| :------: | :-------------- | ------------: | ---------: | --------------------: | :------------ | :----------------------------- |
| &#9745;  | Reina           |         00000 | 2021-07-13 |                 12:00 | Reina         | Was too cool for school        |
| &#9744;  | Something       |         00000 | 2021-07-14 |                 22:00 | Reina         | Maybe also too cool for school |

\*Required fields

## Notes

Fill in at least the 'User ID' and 'date' fields. If either are missing, it will not parse it that round.

Once every 30 min, it will fetch rows from a Google Sheet until it reaches a row without a date. Then it will stop fetching more.

Make sure you're inputting the ID. The username/slug will not work. Get the ID from the profile picture's link.<br>
`https://media.kitsu.io/users/avatars/`**`171606`**`/large.jpeg?1622853524`

Date formating is `YYYY-MM-DD`, time formating is 24h, like `23:30`

After 12am UTC+2 (or the timezone of the hoster's machine), it will unban the current day's bans if there are no time overrides

If the `Done` checkmark is checked, it will not do anything to that specific entry anymore (unless you change the checkmark), whether it's before or after other incompleted entries.
