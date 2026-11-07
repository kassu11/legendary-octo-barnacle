export const fuse = search => {
  if (!search) return null;

  search = search.replace(/\s+/g, " ").toLowerCase();
  const words = {};
  search.split(" ").forEach(word => {
    if (word.length > 3) word = word.split("").map(c => RegExp.escape(c || " ")).join(".?"); // Support typos
    else word = RegExp.escape(word || " "); // Normal match the word as it is
    words[word] = (words[word] + 1) || 1;
  });

  const wordsToMatch = Object.entries(words).map(([word, count]) => {
    if (count === 1) return `(?=.*${word})`;
    return `(?=(?:.*${word}){${count}})`;
  }).join("");

  return new RegExp(`^${wordsToMatch}.*$`, "i");

}
