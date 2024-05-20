const seedrandom = require('seedrandom');
const { firstWords, secondWords } = require("./strings/words.js");

function kaniUranai() {
    let result;
    if (Math.random() < 1 / 20) {
        result = "エビ";
    } else {
        // シード付き乱数生成器の初期化
        const rng = seedrandom();

        const firstWord = firstWords[Math.floor(rng() * firstWords.length)];
        const secondWord = secondWords[Math.floor(rng() * secondWords.length)];

        result = `${firstWord}${secondWord}カニ`;
    }
    return `あなたは   **${result}**   です`;
}

module.exports = {
    kaniUranai
}