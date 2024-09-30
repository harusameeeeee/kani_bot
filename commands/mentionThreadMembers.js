const { SlashCommandBuilder } = require('@discordjs/builders');
const { mentionAllThreadMembers } = require('../functions/mention_func'); // 別ファイルから関数をインポート

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mention_all_thread_members')
        .setDescription('現在のスレッド参加者全員にメンションを付けてメッセージを送信します。')
        .addStringOption(option =>
            option.setName('メッセージ')
                .setDescription('メンション先に送るメッセージ')
                .setRequired(true)),
    async execute(interaction) {
        const messageContent = interaction.options.getString('message_content');

        // 別ファイルの関数を呼び出す
        await mentionAllThreadMembers(interaction, messageContent);
    }
};
