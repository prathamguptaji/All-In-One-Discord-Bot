require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials, REST, Routes, EmbedBuilder } = require('discord.js');
const { getDb } = require('./lib/store');
if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID) { console.error('Missing DISCORD_TOKEN or CLIENT_ID. Copy .env.example to .env and fill them in.'); process.exit(1); }
getDb();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], partials: [Partials.Channel, Partials.Message, Partials.User] });
client.commands = new Collection();
function walk(dir, fn) { if (!fs.existsSync(dir)) return; for (const e of fs.readdirSync(dir,{withFileTypes:true})) { const p=path.join(dir,e.name); if(e.isDirectory()) walk(p,fn); else if(e.isFile()&&e.name.endsWith('.js')) fn(p); } }
function loadCommands() { client.commands.clear(); walk(path.join(__dirname,'commands'), full => { try { delete require.cache[require.resolve(full)]; const c=require(full); if(c.data?.name&&typeof c.execute==='function') client.commands.set(c.data.name,c); else console.warn(`Skipped invalid command: ${full}`); } catch(e){ console.error(`Command load failed (${full})`,e); } }); }
function loadEvents() { walk(path.join(__dirname,'events'), full => { try { delete require.cache[require.resolve(full)]; const e=require(full); if(!e.name||typeof e.execute!=='function') return; const fn=(...args)=>e.execute(client,...args); e.once?client.once(e.name,fn):client.on(e.name,fn); } catch(err){console.error(`Event load failed (${full})`,err);} }); }
async function registerCommands() { const rest=new REST({version:'10'}).setToken(process.env.DISCORD_TOKEN); const route=process.env.GUILD_ID?Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID):Routes.applicationCommands(process.env.CLIENT_ID); await rest.put(route,{body:[...client.commands.values()].map(c=>c.data.toJSON())}); console.log(`Registered ${client.commands.size} slash commands ${process.env.GUILD_ID?'to test guild':'globally'}.`); }
client.reloadCommands = async () => { loadCommands(); await registerCommands(); return client.commands.size; };
client.on('interactionCreate', async i => {
  // Consistent embed styling for all plain-text interaction replies. Existing embeds are preserved.
  const embedify = (payload) => {
    if (typeof payload === 'string') return { embeds: [new EmbedBuilder().setColor(0x5865F2).setDescription(payload)] };
    if (payload && typeof payload === 'object' && payload.content && !payload.embeds) {
      const { content, ...rest } = payload;
      return { ...rest, embeds: [new EmbedBuilder().setColor(/cannot|can't|not |failed|error|wrong|only the|not enough|already/i.test(content) ? 0xED4245 : 0x5865F2).setDescription(String(content).slice(0, 4000))] };
    }
    return payload;
  };
  for (const method of ['reply', 'editReply', 'followUp']) { const original = i[method]?.bind(i); if (original) i[method] = (payload, ...args) => original(embedify(payload), ...args); }
  if (i.isChatInputCommand()) { const c=client.commands.get(i.commandName); if(!c) return i.reply({content:'Command is not loaded. Try again shortly.',ephemeral:true}).catch(()=>{}); try { await c.execute(i,client); } catch(e){ console.error(`/${i.commandName} failed`,e); const p={content:'Something went wrong. Check the bot console for details.',ephemeral:true}; if(i.deferred||i.replied) await i.followUp(p).catch(()=>{}); else await i.reply(p).catch(()=>{}); } }
  if (i.isButton()) { for (const handler of client.buttonHandlers || []) { try { if(await handler(i,client)) break; } catch(e){console.error('Button handler failed',e); if(!i.replied&&!i.deferred) await i.reply({content:'This button could not be processed.',ephemeral:true}).catch(()=>{}); } } }
});
loadCommands(); loadEvents();
client.once('ready', c=>console.log(`Online as ${c.user.tag} | ${client.commands.size} commands | ${c.guilds.cache.size} servers`));
(async()=>{try{await registerCommands(); await client.login(process.env.DISCORD_TOKEN);}catch(e){console.error('Startup failed:',e);process.exit(1);}})();
