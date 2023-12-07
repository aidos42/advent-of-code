import input from '../input.js';

const inputData = input('./Day-2/input.txt');

const sumIds = (data, red, green, blue) => data
  .map((line) => {
    const [, id] = line.match(/Game (\d+)/);
    const normalizedLine = line.replace(/Game (\d+):/, '');
    const splitedLines = normalizedLine.split(';');

    const result = {
        id: Number(id),
        splitedLines,
    }

    return result;
  })
  .map(({ splitedLines, id }) => {
    const matchs = splitedLines.map((line) => [...line.matchAll(/(\d+)\s+(green|red|blue)/g)]);
    const items = matchs.flat().map(([, number, color]) => {
      const result = {};
      result[color] = Number(number);

      return result;
    });

    return { id, items }
  })
  .filter(({ items }) => {
    const biggestColor = {};

    items.forEach((item) => {
        for (const color in item) {
            const value = item[color];
            if (!biggestColor[color]) {
                biggestColor[color] = value;
            } else if(biggestColor[color] < value) {
              biggestColor[color] = value;
            }
        }
    });

    return !(biggestColor.red > red || biggestColor.green > green || biggestColor.blue > blue);
  })
  .reduce((acc, { id }) => acc + id, 0);

const resultPartOne = sumIds(inputData, 12, 13, 14);
console.log(resultPartOne);
