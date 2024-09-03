const seedrandom = require('seedrandom');
const { firstWords, secondWords } = require("./strings/words.js");

function kaniUranai() {
    const rng = seedrandom(); // シードを指定しない場合、ランダムな値が生成されます
    let result;
    if (rng() < 1 / 50) {
        result = "アルティメットハイパーシャイニングミラクルゴッドカニ";
    } else if (rng() < 1 / 20) {
        result = "エビ";
    } else {
        const shuffledFirstWords = shuffleArray([...firstWords]);
        const shuffledSecondWords = shuffleArray([...secondWords]);

        const firstWord = shuffledFirstWords[Math.round(rng() * firstWords.length)];
        const secondWord = shuffledSecondWords[Math.round(rng() * secondWords.length)];

        result = `${firstWord}${secondWord}カニ`;
    }
    return `あなたは   **${result}**   です`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

module.exports = {
    kaniUranai
}