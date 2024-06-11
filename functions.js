const seedrandom = require('seedrandom');
const { firstWords, secondWords } = require("./strings/words.js");

function kaniUranai() {
    // シード付き乱数生成器の初期化
    const rng = seedrandom();
    let result;
    if (rng() < 1 / 20) {
        result = "エビ";
    } else {
        const firstWord = firstWords[Math.floor(rng() * firstWords.length)];
        const secondWord = secondWords[Math.floor(rng() * secondWords.length)];

        result = `${firstWord}${secondWord}カニ`;
    }
    return `あなたは   **${result}**   です`;
}

module.exports = {
    kaniUranai
}