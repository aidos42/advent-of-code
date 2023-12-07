import input from '../input.js';

const calculateSumOfCalibrationValues = (data) => data
  .map((word) => word.match(/^\d+|\d+\b|\d+(?=\w)/g))
  .map((numbers) =>  {
    if (!numbers) {
      return 0;
    }

    return Number(numbers[0].charAt(0) + numbers[numbers.length - 1].slice(-1))
  })
  .reduce((acc, value) => acc + value);

const inputData = input('./Day-1/input.txt');
const resultPartOne = calculateSumOfCalibrationValues(inputData);

console.log(resultPartOne);

const wordToDigit = new Map([
  ['one', '1'],
  ['two', '2'],
  ['three', '3'],
  ['four', '4'],
  ['five', '5'],
  ['six', '6'],
  ['seven', '7'],
  ['eight', '8'],
  ['nine', '9'],
]);

const normalizeCalibrationValues = (data) => data
  .map((word) => [...word.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)]
    .map((match) => match[1]))
  .map((array) => array.map((value) => wordToDigit.get(value) || value))
  .map((value) => value.join(''));

const normalizedData = normalizeCalibrationValues(inputData);
const resultPartTwo = calculateSumOfCalibrationValues(normalizedData);

console.log(resultPartTwo);
