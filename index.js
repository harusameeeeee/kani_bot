const config = require('./config.json');
const { kaniUranai } = require('./functions');
const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    console.log(`${client.user.tag} でログインしています。`);
});

client.on("messageCreate", async msg => {
    if (msg.author.id == client.user.id) {
        return
    }

    const messageText = msg.content;
    const reactionKaniWords = ["かに", "カニ", "ｶﾆ", "kani"];
    if (reactionKaniWords.some((keyWord) => messageText.includes(keyWord))) {
        // カニの絵文字でリアクションをつける
        msg
            .react("🦀")
            .then(() => console.log("リアクションがつけられました"))
            .catch(console.error)
    }

    const reactionKamoWords = ["かも", "カモ", "ｶﾓ", "kamo"];
    if (reactionKamoWords.some((keyWord) => messageText.includes(keyWord))) {
        // カニの絵文字でリアクションをつける
        msg
            .react("🦆")
            .then(() => console.log("リアクションがつけられました"))
            .catch(console.error)
    }

    if (msg.content.toLowerCase().includes("カニ占い")) {
        msg.reply(kaniUranai())
        return
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(config.token);
