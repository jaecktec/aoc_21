const parseInput = (input: string): ReadonlyArray<number[]> => {
  return input.split('\n').map((i) => {
    return ([...i].map(char => parseInt(char)));
  });
};

// https://stackoverflow.com/questions/10258828/how-to-convert-binary-string-to-decimal
const bin2dec = (binStr: number[]): number => {
  const lastIndex = binStr.length - 1;
  return Number(Array.from(binStr).reduceRight((total, currValue, index) => (
    (currValue === 1) ? total + (BigInt(2) ** BigInt(lastIndex - index)) : total
  ), BigInt(0)));
};


const countOccurrences = (input: ReadonlyArray<number[]>) => {
  const msgLength = input[0].length
  const occurrences = new Array<number>(msgLength).fill(0);
  for (const line of input) {
    for (let idx = 0; idx < line.length; idx++) {
      if (line[idx] > 0) occurrences[idx] += 1;
    }
  }
  return occurrences;
};

const computeMaskForOnes = (input: ReadonlyArray<number[]>): number[] => {
  const occurrences = countOccurrences(input);
  return occurrences.map(occ => occ >= input.length - occ ? 1 : 0);
};

const computeMaskForZeros = (input: ReadonlyArray<number[]>): number[] => {
  const occurrences = countOccurrences(input);
  return occurrences.map(occ => occ >= input.length - occ ? 0 : 1);
};


export const solve1 = (input: string): number => {
  const parsedInput = parseInput(input);

  const occurrences = new Array<number>(parsedInput[0].length).fill(0);
  for (const line of parsedInput) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] > 0) occurrences[i] += 1;
    }
  }
  const gamma = bin2dec(computeMaskForOnes(parsedInput));
  const epsilon = bin2dec(computeMaskForZeros(parsedInput));

  return gamma * epsilon;
};

export const solve2 = (input: string): number => {
  const parsedInput = parseInput(input);
  const msgLength = parsedInput[0].length;


  let numbers = new Array(msgLength).fill(0).map((_, idx) => idx);
  const o2GeneratorRating = bin2dec(numbers.reduce((relevantInput, i) => {
    const mask = computeMaskForOnes(relevantInput);
    if (relevantInput.length <= 1) return relevantInput;
    return relevantInput.filter(it => it[i] === mask[i]);
  }, parsedInput)[0]);
  const co2ScrubberRating = bin2dec(numbers.reduce((input, i) => {
    const mask = computeMaskForZeros(input);
    if (input.length <= 1) return input;
    return input.filter(it => it[i] === mask[i]);
  }, parsedInput)[0]);
  return o2GeneratorRating * co2ScrubberRating;
};