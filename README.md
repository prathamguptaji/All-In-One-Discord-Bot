# ICCNEX All-in-One Discord Bot

A powerful, modular, and customizable Discord bot built with **Discord.js v14**. Designed to bring moderation, automation, tickets, economy, leveling, giveaways, and utility commands together in one place.

The bot uses a modular command structure, making it easy to add your own commands without modifying the core system.

## Features

- **Embed-Based Responses** — Clean and consistent Discord embeds.
- **Moderation** — Ban, kick, timeout, and message purge commands.
- **AutoMod** — Basic anti-spam protection.
- **Ticket System** — Create and manage private support tickets.
- **Welcome System** — Configure welcome messages for new members.
- **Logging** — Track message deletions and member departures.
- **Economy System** — Balance, daily rewards, work, and money transfers.
- **Leveling System** — Gain XP and track your server level.
- **Giveaways** — Host giveaways with button-based participation.
- **Utility Commands** — Ping, bot information, and help commands.
- **Command Reloading** — Reload and register commands using a slash command.
- **Custom Commands** — Add commands by creating individual JavaScript files.
- **JSON Storage** — Store supported bot data locally without requiring a separate database server.

## Tech Stack

- Node.js
- Discord.js v14
- JavaScript
- JSON-based local storage

## Requirements

Before installing the bot, make sure you have:

- [Node.js](https://nodejs.org/) installed.
- A Discord account.
- A Discord application and bot created in the [Discord Developer Portal](https://discord.com/developers/applications).
- The required bot permissions and intents enabled.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with your GitHub username and repository name.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root using `.env.example` as a reference.

Example:

```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_application_client_id
GUILD_ID=your_test_server_id
```

Use only the variables required by your project's implementation. `GUILD_ID` is optional if the bot supports global command registration without it.

**Never share your bot token or commit your `.env` file to GitHub.**

### 4. Configure Discord Developer Portal

Open your application in the Discord Developer Portal.

Under **Bot**, enable the privileged intents required by your enabled features, such as:

- Server Members Intent
- Message Content Intent, if required by your AutoMod implementation

Invite the bot to your server with the appropriate permissions for its enabled features.

### 5. Start the Bot

```bash
npm start
```

If the project includes a development script, you can use:

```bash
npm run dev
```

Check `package.json` for the scripts supported by your version.

## Commands

The following table describes the intended command set. Exact command names, options, permissions, and availability depend on the implementation in your installed version.

| Category | Commands / Features |
|---|---|
| General | `/help`, `/ping`, `/botinfo` |
| Moderation | `/ban`, `/kick`, `/timeout`, `/purge` |
| Administration | `/reloadcommands`, `/setlog`, `/setwelcome`, `/automod` |
| Economy | `/balance`, `/daily`, `/work`, `/pay` |
| Leveling | `/level` |
| Giveaways | `/giveaway` |
| Tickets | Ticket creation and management buttons |
| Welcome | Configurable welcome messages |
| Logging | Message deletion and member departure events |

Use `/help` in Discord to see the commands available to you.

## Adding Custom Commands

One of the main advantages of ICCNEX All-in-One is its modular command system.

You can extend the bot by adding new command files instead of rewriting the entire application.

### Example: Create a Hello Command

Create a file in the appropriate commands directory, for example:

`src/commands/fun/hello.js`

Add the following code:

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    category: 'Fun',

    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Say hello!'),

    async execute(interaction, client) {
        await interaction.reply({
            embeds: [
                {
                    color: 0x5865F2,
                    title: 'Hello!',
                    description: `Hello, ${interaction.user.username}!`,
                    footer: {
                        text: 'ICCNEX All-in-One'
                    },
                    timestamp: new Date().toISOString()
                }
            ]
        });
    }
};
```

### Register the Command

1. Save the file in the directory scanned by the command loader.
2. Make sure the command follows the project's expected export format.
3. Run `/reloadcommands` if that command is implemented and available to you, or restart the bot.
4. Check Discord to confirm that the command has registered successfully.

**Important:** The example assumes the bot's command loader scans nested directories and expects the `data` and `execute` properties shown above. Adjust the file location or structure if your implementation differs.

## Embed Style

The bot is designed to use Discord embeds for a consistent interface.

Embeds can contain:

- Titles and descriptions
- Fields and structured information
- Colors for success, warning, and error messages
- Timestamps and footers
- User and server information

Discord enforces limits on embed content and message payloads. Keep responses within Discord's API limits.

## Data Storage

The bot uses local JSON storage for supported features.

Depending on the implementation, its data files may contain:

- Economy balances
- User XP and levels
- Server configuration
- Ticket information
- Giveaway information

Keep the data directory backed up, especially before updating the bot.

For larger deployments or high-traffic servers, consider using SQLite or another database with appropriate concurrency handling.

## Security Recommendations

- Never publish your Discord bot token.
- Keep secrets in environment variables.
- Restrict administrative commands to authorized users.
- Validate command inputs and permissions.
- Avoid exposing private ticket channels to unauthorized roles.
- Back up persistent data before updating.
- Keep Node.js and dependencies updated.
- Review permissions before inviting the bot to a server.

## Troubleshooting

### Slash Commands Are Not Appearing

- Verify the application client ID.
- Check that the bot was invited with the `applications.commands` scope.
- Confirm that command registration completed without errors.
- Check whether commands are registered globally or to a specific guild.
- Allow time for global command updates to propagate.

### The Bot Does Not Start

Run:

```bash
npm install
npm start
```

Check the terminal output and verify that your `.env` file contains the required configuration.

### Commands Fail

- Check the bot's console for errors.
- Verify that the bot has the required permissions.
- Confirm that command options and user inputs are valid.
- Ensure that the command's dependencies are installed.

### Welcome Messages or AutoMod Do Not Work

Check the required gateway intents, event handlers, server permissions, and feature configuration.

## Project Structure

The exact structure may vary by release. A modular project may look like this:

```text
ICCNEX-All-in-One/
├── src/
│   ├── commands/
│   │   ├── general/
│   │   ├── moderation/
│   │   ├── economy/
│   │   └── fun/
│   ├── events/
│   ├── handlers/
│   └── utils/
├── data/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

Use the actual directories in your repository as the source of truth.

## Contributing

Contributions, bug reports, feature requests, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test your changes.
5. Submit a pull request describing the improvements.

Keep new commands modular and follow the project's existing conventions.

## License

No license is specified by this README.

Before publishing the repository, add a `LICENSE` file describing how others may use, modify, and distribute your code.

## Credits

**Developed for ICCNEX**

Built to provide a flexible foundation for an all-in-one Discord bot that can grow with your server.

---

**ICCNEX All-in-One Discord Bot**  
*One bot. Multiple features. Your own commands.*