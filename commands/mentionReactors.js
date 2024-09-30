const { SlashCommandBuilder } = require('@discordjs/builders');
const { mentionAllReactorsByLink } = require('../functions/mention_func'); // 別ファイルから関数をインポート

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mention_all_reactors')
        .setDescription('指定したメッセージにリアクションを付けた全メンバーに、メンションを付けてメッセージを送信します。')
        .addStringOption(option =>
            option.setName('メッセージリンク')
                .setDescription('メッセージのリンクを指定')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('メッセージ')
                .setDescription('メンション先に送るメッセージ')
                .setRequired(true)),
    async execute(interaction) {
        const messageLink = interaction.options.getString('message_link');
        const messageContent = interaction.options.getString('message_content');

        // 別ファイルの関数を呼び出す
        await mentionAllReactorsByLink(interaction, messageLink, messageContent);
    }
};
