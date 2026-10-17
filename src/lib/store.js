const fs = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, '../../data/db.json');
const defaults = { guilds: {}, users: {}, tickets: {}, giveaways: {}, customCommands: {} };
let db;
function ensure() {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(defaults, null, 2));
  try { db = { ...defaults, ...JSON.parse(fs.readFileSync(file, 'utf8')) }; }
  catch { const backup = file + '.corrupt-' + Date.now(); try { fs.copyFileSync(file, backup); } catch {} db = structuredClone(defaults); save(); }
  for (const key of Object.keys(defaults)) if (!db[key] || typeof db[key] !== 'object') db[key] = {};
}
function save() { const tmp = file + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(db, null, 2)); fs.renameSync(tmp, file); }
function getDb() { if (!db) ensure(); return db; }
function guild(id) { const d=getDb(); d.guilds[id] ||= {}; return d.guilds[id]; }
function user(id) { const d=getDb(); d.users[id] ||= { balance: 0, bank: 0, xp: 0, level: 0, lastDaily: 0, lastWork: 0 }; return d.users[id]; }
module.exports = { getDb, save, guild, user };
