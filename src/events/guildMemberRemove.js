const {Events}=require('discord.js');const {log}=require('../lib/utils');
module.exports={name:Events.GuildMemberRemove,async execute(client,m){await log(m.guild,`${m.user.tag} left the server.`);}};
