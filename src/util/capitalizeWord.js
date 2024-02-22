/**
 * @param {word} string
 * @returns capitalized a word
 */
export default function capitalizeWord(word) {
  return word[0].toUpperCase() + word.slice(1);
}
