const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ]
});

const CHANNEL_ID = 'YOUR_CHANNEL_ID';
const ROLE_ID = 'YOUR_ROLE_ID';

client.once('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const addedRole = newMember.roles.cache.find(role => !oldMember.roles.cache.has(role.id));
  if (addedRole && addedRole.id === ROLE_ID) {
    const channel = newMember.guild.channels.cache.get(CHANNEL_ID);
    if (channel) {
      channel.send(`¡Bienvenido/a ${newMember}! Te hemos asignado el rol ${addedRole.name}.`);
    }
  }
});

client.login(token);
