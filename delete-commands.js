require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const rest = new REST().setToken(TOKEN);

// ...

// for guild-based commands
// rest.delete(Routes.applicationGuildCommand(CLIENT_ID, GUILD_ID, ''))
// 	.then(() => console.log('Successfully deleted guild command'))
// 	.catch(console.error);

// for global commands
// rest.delete(Routes.applicationCommand(CLIENT_ID, ''))
// 	.then(() => console.log('Successfully deleted application command'))
// 	.catch(console.error);