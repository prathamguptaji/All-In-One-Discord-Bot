# ICCNEX All-in-One Discord Bot v2.0

A modular Discord.js v14 bot. Add commands by creating a `.js` file under `src/commands/`; the loader discovers nested folders automatically.

## Features included
- Automatic slash-command discovery and registration on startup
- `/help`, `/ping`, `/botinfo`, `/reloadcommands`
- Moderation: `/ban`, `/kick`, `/timeout`, `/purge`
- Configuration: `/setlog`, `/setwelcome`, `/automod`
- Tickets: `/ticketsetup`, private ticket channels, close button
- Economy: `/balance`, `/daily`, `/work`, `/pay`
- Leveling: XP on messages and `/level`
- Welcome messages and message-delete/leave logs
- Basic anti-spam timeout (opt-in via `/automod enabled:true`)
- Fun: `/coinflip`
- JSON persistence in `data/db.json`

## Requirements
- Node.js 20 or newer
- A Discord application and bot token

## Setup
1. Extract the ZIP.
2. Run `npm install` inside the project folder.
3. Copy `.env.example` to `.env` and fill in `DISCORD_TOKEN`, `CLIENT_ID`, and optionally `GUILD_ID`.
4. In the Discord Developer Portal, enable **Server Members Intent** and **Message Content Intent** for the bot. Invite it with `bot` and `applications.commands` scopes and the permissions it needs.
5. Run `npm start`.

Set `GUILD_ID` while developing to register commands in one server quickly. Remove it for global registration; global propagation can take time.

## Add your own command
Create `src/commands/fun/hello.js`:
```js
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  category: 'Fun',
  data: new SlashCommandBuilder().setName('hello').setDescription('Say hello'),
  async execute(interaction, client) {
    await interaction.reply(`Hello ${interaction.user.username}!`);
  }
};
```
Restart the bot, or run `/reloadcommands` (Administrator permission). Use unique slash-command names.

## Add your own event
Create a `.js` file in `src/events/` exporting `{ name: Events.EventName, execute(client, ...args) {} }`. See existing event files.

## Notes
- This project stores settings and economy/XP data in a local JSON file. Back up `data/db.json` and do not edit it while the bot is running.
- Keep `.env` private. Never share your bot token or commit it to GitHub.
- Discord role hierarchy still applies: put the bot's role above roles it must moderate.
- Basic anti-spam is intentionally conservative but can still misidentify fast legitimate messages. Test in a private server before enabling it publicly.
- Giveaway join buttons are included as a handler foundation; there is not yet a giveaway creation/end command in this version.
- This is a starter platform, not a replacement for server backups, staff review, or proper anti-raid protection.


## Embed styling
All slash-command text responses and button interaction responses are automatically displayed as Discord embeds. Welcome messages, level-up notices, custom responses, and giveaway winner announcements are also sent as embeds. Existing rich embeds remain unchanged.
