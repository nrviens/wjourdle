import wordBank from '../wordle-bank.txt';
import answers from '../answers.txt';

export const boardDefault = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

export const letterPositions = Array.from(Array(5).keys())

export const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
export const keys2 = ['A','S','D','F','G','H','J','K','L'];
export const keys3 = ['Z','X','C','V','B','N','M'];

export const generateWordSet = async () => {
  let todaysWord = '';
  await fetch(answers)
  .then((response) => response.text())
  .then((result) => {
    const wordArr = result.split('\n');
    const dayValue = window.localStorage.getItem("wjourdle_day");
    if(dayValue) {
      todaysWord = wordArr[parseInt(dayValue, 10) % wordArr.length];
    } else {
      todaysWord = wordArr[0];
    }
  });

  let wordSet: Set<string> = new Set();
  await fetch(wordBank)
  .then((response) => response.text())
  .then((result) => {
    const wordArr = result.split('\n');
    wordSet = new Set(wordArr);
  });

  return {wordSet, todaysWord};
}