const { SlashCommandBuilder } = require('@discordjs/builders');
const { mentionAllReactorsByLink } = require('../functions'); // 別ファイルから関数をインポート

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mention_all_reactors')
        .setDescription('リアクションを付けた全メンバーにメンションを付けてメッセージを送信します。')
        .addStringOption(option =>
            option.setName('message_link')
                .setDescription('メッセージリンク')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message_content')
                .setDescription('メンション先に送るメッセージ')
                .setRequired(true)),
    async execute(interaction) {
        const messageLink = interaction.options.getString('message_link');
        const messageContent = interaction.options.getString('message_content');

        // 別ファイルの関数を呼び出す
        await mentionAllReactorsByLink(interaction, messageLink, messageContent);
    }
};
