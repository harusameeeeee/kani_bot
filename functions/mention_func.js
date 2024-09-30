async function mentionAllReactorsByLink(interaction, messageLink, messageContent) {
    try {
        // メッセージリンクを分解して、guild_id, channel_id, message_id を取得
        const regex = /https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/;
        const matches = messageLink.match(regex);

        if (!matches) {
            await interaction.reply('無効なメッセージリンクです。');
            return;
        }

        const guildId = matches[1];
        const channelId = matches[2];
        const messageId = matches[3];

        // チャンネルを取得してメッセージを取得
        const channel = await interaction.client.channels.fetch(channelId);
        const targetMessage = await channel.messages.fetch(messageId);

        // すべてのリアクションを取得
        const reactions = targetMessage.reactions.cache;

        // リアクションが存在しない場合
        if (reactions.size === 0) {
            await interaction.reply('このメッセージにリアクションはありません。');
            return;
        }

        let allUsers = new Set();  // 重複を避けるためにSetを使う

        // すべてのリアクションをループ
        for (const reaction of reactions.values()) {
            const users = await reaction.users.fetch();  // 各リアクションのユーザーを取得
            users.forEach(user => allUsers.add(user));    // ユーザーをSetに追加
        }

        // メンションを作成
        const mentions = Array.from(allUsers).map(user => user.toString()).join(' ');

        if (mentions) {
            // リアクションをつけたメンバーにメンションをつけて、メッセージを送信
            await interaction.reply(`${mentions}\n ${messageContent}`);
        } else {
            await interaction.reply('リアクションをつけたユーザーはいません。');
        }
    } catch (error) {
        console.error(error);
        await interaction.reply('エラーが発生しました。リンクが正しいか確認してください。');
    }
}

async function mentionAllThreadMembers(interaction, messageContent) {
    try {
        // 現在のチャンネルがスレッドかどうかを確認
        if (!interaction.channel.isThread()) {
            await interaction.reply('このコマンドはスレッド内でのみ使用できます。');
            return; // スレッドでない場合は処理を終了
        }
        
        // 現在のスレッドを取得
        const thread = interaction.channel;

        // スレッド参加者を取得
        const members = thread.members;

        // メンションを作成
        const mentions = members.map(member => member.user.toString()).join(' ');

        if (mentions) {
            // 参加者にメンションをつけて、メッセージを送信
            await interaction.reply(`${mentions}\n ${messageContent}`);
        } else {
            await interaction.reply('このスレッドに参加しているメンバーはいません。');
        }
    } catch (error) {
        console.error(error);
        await interaction.reply('エラーが発生しました。スレッドが正しく取得できませんでした。');
    }
}

module.exports = {
    mentionAllReactorsByLink,
    mentionAllThreadMembers
}