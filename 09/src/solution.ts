const parseInput = (input: string): number[][] => {
  return input.split('\n').map((i) => [...i]).map(i => i.map(n => parseInt(n)));
};

export const padArray = (input: number[][], padding: number = 9): number[][] => {
  const result = new Array(input.length + 2);
  result[0] = new Array(input[0].length + 2).fill(padding);
  result[input.length + 1] = new Array(input[0].length + 2).fill(padding);
  for (let i = 0; i < input.length; i++) {
    result[i + 1] = [padding, ...input[i], padding];
  }
  return result;
};

export const solve1 = (input: string): number => {
  const parsedInput = parseInput(input);
  const paddedInput = padArray(parsedInput);

  const lowPoints: number[] = [];


  for (let x = 1; x < paddedInput.length - 1; x++) {
    for (let y = 1; y < paddedInput[x].length - 1; y++) {
      const value = paddedInput[x][y];
      const scanMatrix = paddedInput.slice(x - 1, x + 2).map(s => s.slice(y - 1, y + 2));
      const relevantValues = [
        scanMatrix[0][1],
        scanMatrix[1][0],
        scanMatrix[2][1],
        scanMatrix[1][2],
      ];
      const minValue = Math.min(...relevantValues);
      if (value < minValue) {
        lowPoints.push(value + 1);
      }
    }
  }


  return lowPoints.reduce((a, b) => a + b, 0);
};

function findLowPoints(paddedInput: number[][]) {
  const lowPoints = [];

  for (let x = 1; x < paddedInput.length - 1; x++) {
    for (let y = 1; y < paddedInput[x].length - 1; y++) {
      const value = paddedInput[x][y];
      const scanMatrix = paddedInput.slice(x - 1, x + 2).map(s => s.slice(y - 1, y + 2));
      const relevantValues = [
        scanMatrix[0][1],
        scanMatrix[1][0],
        scanMatrix[2][1],
        scanMatrix[1][2],
      ];
      const minValue = Math.min(...relevantValues);
      if (value < minValue) {
        lowPoints.push([x, y]);
      }
    }
  }
  return lowPoints;
}

export function trace(x: number, y: number, map: number[][]): number {
  const currentVal = map[x][y];
  if (currentVal === 9) {
    return 0;
  }

  map[x][y] = 9; // ensure we dont go backwards
  let size = 1;

  size += trace(x - 1, y, map);
  size += trace(x + 1, y, map);
  size += trace(x, y + 1, map);
  size += trace(x, y - 1, map);

  return size;
}

export const solve2 = (input: string): number => {
  const parsedInput = parseInput(input);
  const paddedInput = padArray(parsedInput);
  const startPoints = findLowPoints(paddedInput);

  const basins = startPoints.map(([x, y]) => trace(x, y, paddedInput));
  basins.sort((a, b) => b - a);

  return basins[0] * basins[1] * basins[2];
};