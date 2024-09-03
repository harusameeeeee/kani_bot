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

module.exports = {
    kaniUranai
}