const parseInput = (input: string): string[] => {
  return input.split('\n');
};
const pairs = new Map(Object.entries({ '(': ')', '[': ']', '{': '}', '<': '>' }));
const points = new Map(Object.entries({ ')': 3, ']': 57, '}': 1197, '>': 25137 }));
const missingPoints = new Map(Object.entries({ ')': 1, ']': 2, '}': 3, '>': 4 }));

export const solve1 = (input: string): number => {
  const lines = parseInput(input);
  let result = 0;
  for (const line of lines) {
    const expectedClosingChar = [];
    for (const char of [...line]) {
      if (pairs.get(char)) {
        expectedClosingChar.push(pairs.get(char));
      } else {
        const expectedChar = expectedClosingChar.pop();
        if (expectedChar !== char) {
          // console.log(`${line} - Expected "${expectedChar}", but found ${char} instead`);
          result += points.get(char!)!;
          break;
        }
      }
    }
  }

  return result;
};

export const solve2 = (input: string): number => {
  console.log('');
  const lines = parseInput(input);
  let scores = [];
  for (const line of lines) {
    let score = 0;
    const expectedClosingChar = [];
    for (const char of [...line]) {
      if (pairs.get(char)) {
        expectedClosingChar.push(pairs.get(char));
      } else {
        const expectedChar = expectedClosingChar.pop();
        if (expectedChar !== char) {
          // console.log(`${line} - Expected "${expectedChar}", but found ${char} instead`);
          expectedClosingChar.length = 0; // ignore wrong
          break;
        }
      }
    }
    if(expectedClosingChar.length){ // only compute for incomplete
      const missing = expectedClosingChar.reverse() as string[];
      // console.log(`${line} - Complete by adding ${missing.join('')}`);
      for(const missingChar of missing){
        score = (score * 5) + missingPoints.get(missingChar)!
      }
      scores.push(score);
    }
  }

  scores.sort((a,b) => b-a);

  return scores[Math.floor(scores.length / 2)];
};