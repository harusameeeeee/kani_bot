const { SlashCommandBuilder } = require('@discordjs/builders');
const { kaniUranai } = require('../functions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kani_uranai')
        .setDescription('カニ占いをします'),
    async execute(interaction) {
        await interaction.reply(`${interaction.user} ${kaniUranai()}`);
    },
};