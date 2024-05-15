const { firstWords, secondWords } = require("./strings/words.js");

function kaniUranai() {
    let result;
    if (Math.random() < 1 / 20) {
        result = "エビ";
    } else {
        const firstWord = firstWords[Math.floor(Math.random() * firstWords.length)];
        const secondWord =
            secondWords[Math.floor(Math.random() * secondWords.length)];

        result = `${firstWord}${secondWord}カニ`;
    }
    return `あなたは   **${result}**   です`;
}

module.exports = {
    kaniUranai
}