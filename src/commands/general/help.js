const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  category: 'General',
  data: new SlashCommandBuilder().setName('help').setDescription('Browse available commands'),
  async execute(interaction, client) {
    const groups = new Map();
    for (const cmd of client.commands.values()) {
      const category = cmd.category || 'General';
      if (!groups.has(category)) groups.set(category, []);
      groups.get(category).push(`\`/${cmd.data.name}\` — ${cmd.data.description}`);
    }
    const description = [...groups].map(([name, commands]) => `**${name}**\n${commands.join('\n')}`).join('\n\n').slice(0, 4000);
    const embed = new EmbedBuilder().setColor(0x5865F2).setTitle('Command Directory').setDescription(description || 'No commands loaded.').setFooter({ text: 'Add a command file in src/commands and reload.' });
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
