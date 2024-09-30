const seedrandom = require('seedrandom');
const { firstWords, secondWords } = require("./strings/words.js");

function kaniUranai() {
    const rng1 = seedrandom(); // シードを指定しない場合、ランダムな値が生成されます
    const rng2 = seedrandom(); // シードを指定しない場合、ランダムな値が生成されます
    let result;
    
    if (rng1() < 1 / 50) {
        result = "アルティメットハイパーシャイニングミラクルゴッドカニ";
    } else if (rng1() < 1 / 20) { // rng() ではなく rng1() を使用
        result = "エビ";
    } else {
        // 配列が空でないか確認
        if (firstWords.length === 0 || secondWords.length === 0) {
            throw new Error("firstWords または secondWords が空です");
        }

        const shuffledFirstWords = shuffleArray([...firstWords], rng1);
        const shuffledSecondWords = shuffleArray([...secondWords], rng2);

        const firstWord = shuffledFirstWords[Math.floor(rng1() * firstWords.length)];
        const secondWord = shuffledSecondWords[Math.floor(rng2() * secondWords.length)];

        result = `${firstWord}${secondWord}カニ`;
    }
    return `あなたは   **${result}**   です`;
}

function shuffleArray(array, rng) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1)); // Math.random() から rng() に変更
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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
            await interaction.reply(`${mentions} ${messageContent}`);
        } else {
            await interaction.reply('リアクションをつけたユーザーはいません。');
        }
    } catch (error) {
        console.error(error);
        await interaction.reply('エラーが発生しました。リンクが正しいか確認してください。');
    }
}

module.exports = {
    kaniUranai,
    mentionAllReactorsByLink
}