const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
function isMod(interaction) { return interaction.memberPermissions?.has(PermissionFlagsBits.ModerateMembers) || interaction.memberPermissions?.has(PermissionFlagsBits.Administrator); }
function errorEmbed(text) { return new EmbedBuilder().setColor(0xED4245).setDescription(`❌ ${text}`); }
function successEmbed(text) { return new EmbedBuilder().setColor(0x57F287).setDescription(`✅ ${text}`); }
function getLogChannel(guildId) { const { guild } = require('./store'); return guild(guildId).logChannelId; }
async function log(guild, text) { try { const id=getLogChannel(guild.id); const ch=id && guild.channels.cache.get(id); if (ch?.isTextBased()) await ch.send({ embeds:[new EmbedBuilder().setColor(0x5865F2).setDescription(text).setTimestamp()] }); } catch {} }
module.exports = { isMod, errorEmbed, successEmbed, log };
