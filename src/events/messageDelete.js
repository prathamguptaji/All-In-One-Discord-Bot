const {Events}=require('discord.js');const {log}=require('../lib/utils');
module.exports={name:Events.MessageDelete,async execute(client,m){if(!m.guild||m.author?.bot)return;await log(m.guild,`Message deleted in ${m.channel} by ${m.author?.tag||'unknown user'}.
${(m.content||'[no cached text]').slice(0,1200)}`);}};
