const { Events, EmbedBuilder } = require('discord.js');
const { guild } = require('../lib/store');
module.exports = {
  name: Events.GuildMemberAdd,
  async execute(client, member) {
    const settings = guild(member.guild.id);
    const channel = settings.welcomeChannelId && member.guild.channels.cache.get(settings.welcomeChannelId);
    if (!channel?.isTextBased()) return;
    const message = settings.welcomeMessage || 'Welcome {user} to **{server}**!';
    const text = message.replaceAll('{user}', `${member}`).replaceAll('{server}', member.guild.name).replaceAll('{count}', String(member.guild.memberCount));
    await channel.send({ embeds: [new EmbedBuilder().setColor(0x57F287).setTitle('Welcome!').setDescription(text).setThumbnail(member.user.displayAvatarURL()).setFooter({ text: member.guild.name }).setTimestamp()] }).catch(() => {});
  }
};
