const parseInput = (input: string): number[] => {
  return input.split(',').map((i) => parseInt(i));
};

const simulate = (input: number[], days: number = 80): number => {
  const fishCounts = new Array(9).fill(0);
  for (let i = 0; i < input.length; i++) {
    fishCounts[input[i]] += 1;
  }
  for (let day = 0; day < days; day++) {

    // store born fish
    const bornOnThisDay = fishCounts[0];
    // decrease all values
    for (let i = 1; i < fishCounts.length; i++) {
      fishCounts[i - 1] = fishCounts[i];
    }
    // add new borns by 8
    fishCounts[8] = bornOnThisDay;
    // increase 6 by 1
    fishCounts[6] += bornOnThisDay;
  }
  return fishCounts.reduce((p, v) => p + v, 0);
};

export const solve1 = (input: string): number => {
  const parsedInput = parseInput(input);
  return simulate(parsedInput, 80);
};

export const solve2 = (input: string): number => {
  const parsedInput = parseInput(input);
  return simulate(parsedInput, 256);
};