const parseInput = (input: string): number[] => {
  return input.split(',').map(it => parseInt(it));
};

export const solve1 = (input: string): number => {
  const positions = parseInput(input);
  let min = Infinity;
  for (let target = Math.min(...positions); target < Math.max(...positions); target++) {
    let steps = 0;
    for (const position of positions) {
      const posChange = Math.abs(target - position);
      steps += posChange;
    }
    if(steps < min) min = steps;
  }
  return min;
};

export const solve2 = (input: string): number => {
  const parsedInput = parseInput(input);
  let min = Infinity;
  for (let target = Math.min(...parsedInput); target < Math.max(...parsedInput); target++) {
    let steps = 0;
    for (const position of parsedInput) {
      const posChange = Math.abs(target - position);
      steps += ((posChange + 1) * posChange) / 2;
    }
    if(steps < min) min = steps;
  }
  return min;
};