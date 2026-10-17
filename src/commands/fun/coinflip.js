const {SlashCommandBuilder}=require('discord.js');
module.exports={category:'Fun',data:new SlashCommandBuilder().setName('coinflip').setDescription('Flip a coin'),async execute(i){await i.reply(`🪙 **${Math.random()<0.5?'Heads':'Tails'}!**`);}};
