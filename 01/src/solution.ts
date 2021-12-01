const parseInput = (input: string): number[] => {
  return input.split('\n').map((i) => parseInt(i));
};

export const solve1 = (input: string): number => {
  const parsedInput = parseInput(input);
  let result = 0;
  for (let idx = 1; idx < parsedInput.length; idx++) {
    if (parsedInput[idx] > parsedInput[idx - 1]) {
      result += 1;
    }
  }
  return result;
};

export const solve2 = (input: string): number => {
  const parsedInput = parseInput(input);
  let result = 0;
  for (let idx = 3; idx < parsedInput.length; idx += 1) {
    const prevWindow = parsedInput[idx-3] + parsedInput[idx-2] + parsedInput[idx-1]
    const currWindow = parsedInput[idx-2] + parsedInput[idx-1] + parsedInput[idx]
    if (currWindow > prevWindow) {
      result += 1;
    }
  }
  return result;
};