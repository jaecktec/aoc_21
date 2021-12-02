const parseInput = (input: string): ReadonlyArray<{
  direction: 'forward' | 'down' | 'up'
  amount: number,
}> => {
  return input.split('\n').map((i) => {
    const strings = i.split(' ');
    if (!['forward', 'down', 'up'].includes(strings[0])) throw new Error(`unknown direction ${strings[0]}`);
    if (isNaN(parseInt(strings[1]))) throw new Error(`input is not parsable ${strings[1]}`);
    return ({
      direction: strings[0] as any,
      amount: parseInt(strings[1]),
    });
  });
};

export const solve1 = (input: string): number => {
  const parsedInput = parseInput(input);
  let horizontal = 0;
  let depth = 0;
  for (const { direction, amount } of parsedInput) {
    switch (direction) {
      case 'forward': horizontal += amount; break;
      case 'down': depth += amount; break
      case 'up': depth -= amount; break
    }
  }
  return horizontal * depth;
};

export const solve2 = (input: string): number => {
  const parsedInput = parseInput(input);
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  for (const { direction, amount } of parsedInput) {
    switch (direction) {
      case 'forward': horizontal += amount; depth += aim * amount; break;
      case 'down': aim += amount; break
      case 'up': aim -= amount; break
    }
  }
  return horizontal * depth;
};