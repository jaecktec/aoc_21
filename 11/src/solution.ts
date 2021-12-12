const parseInput = (input: string): number[][] => {
  return input.split('\n').map((i) => [...i]).map(i => i.map(n => parseInt(n)));
};

export const padArray = (input: number[][], padding: number): number[][] => {
  const result = new Array(input.length + 2);
  result[0] = new Array(input[0].length + 2).fill(padding);
  result[input.length + 1] = new Array(input[0].length + 2).fill(padding);
  for (let i = 0; i < input.length; i++) {
    result[i + 1] = [padding, ...input[i], padding];
  }
  return result;
};

const increase = (input: number[][]) => {
  // increase energy level by 1
  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      input[x][y] += 1;
    }
  }
};

const countFlashes = (input: number[][], flashes: string[]): number => {
  const hasFlashed = (x: number, y: number) => flashes.includes(`${x}-${y}`);
  const recordFlash = (x: number, y: number) => {
    flashes.push(`${x}-${y}`);
    for (let x_1 = -1; x_1 < 2; x_1++) {
      for (let y_1 = -1; y_1 < 2; y_1++) {
        if (hasFlashed(x + x_1, y + y_1)) continue;
        input[x + x_1][y + y_1] += 1;
      }
    }
    input[x][y] = 0;
  };
  // find energy over 9 && `${x}-${y}` not in flashes
  for (let x = 1; x < input.length - 1; x++) {
    for (let y = 1; y < input.length - 1; y++) {
      if (hasFlashed(x, y)) continue;
      if (input[x][y] < 10) continue;
      recordFlash(x, y);
      return 1 + countFlashes(input, flashes);
    }
  }
  return 0;
};

export const solve1 = (rawInput: string): number => {
  const energyLevels = padArray(parseInput(rawInput), -Infinity);

  // console.table(energyLevels.slice(1, energyLevels.length -1).map(it => it.slice(1, energyLevels[0].length -1)));
  let result = 0;
  for (let step = 1; step <= 100; step++) {
    increase(energyLevels);
    result += countFlashes(energyLevels, []);
    // if ([1, 2, 3, 4, 5, 6, 7, 8, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].includes(step)) {
    //   console.log(`step: ${step}`);
    //   console.table(energyLevels.slice(1, energyLevels.length -1).map(it => it.slice(1, energyLevels[0].length -1)));
    // }
  }
  return result;
};

export const solve2 = (rawInput: string): number => {
  const parsed = parseInput(rawInput);
  const energyLevels = padArray(parsed, -Infinity);
  const amountOfOctopuses = parsed.length * parsed[0].length

  for (let step = 1; step <= Infinity; step++) {
    increase(energyLevels);
    const flashes: string[] = [];
    countFlashes(energyLevels, flashes);
    if(amountOfOctopuses === flashes.length){
      return step;
    }
  }
  return 0;
};