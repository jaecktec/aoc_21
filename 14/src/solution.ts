type Input = {
  polymerTemplate: string
  pairInsertions: Map<string, string>
}

const parseInput = (input: string): Input => {
  const lines = input.split('\n');
  const polymerTemplate = lines[0];
  lines.shift();
  lines.shift();
  const pairInsertion = lines.reduce((prev, curr) => {
    const [key, value] = curr.split(' -> ');
    prev.set(key, value);
    return prev;
  }, new Map<string, string>());

  return {
    polymerTemplate,
    pairInsertions: pairInsertion,
  };
};

declare global {
  interface Map<K, V> {
    getOrDefault(key: K, def: V): V;
  }
}

Map.prototype.getOrDefault = function (key, def) {
  return this.get(key) || def;
};

export const solve1 = (input: string, iterations: number = 10): number => {
  const { pairInsertions, polymerTemplate } = parseInput(input);
  let pairs = new Map<string, number>();
  // prepare pairs
  for (let i = 0; i < polymerTemplate.length - 1; i++) {
    const pair = polymerTemplate.substr(i, 2);
    const numPairs = pairs.getOrDefault(pair, 0);
    pairs.set(pair, numPairs + 1);
  }
  for (let i = 0; i < iterations; i++) {
    const newInsertions = new Map<string, number>();
    for (const pair of pairs.keys()) {
      const insert = pairInsertions.get(pair);
      if (!insert) continue;
      const leftNewPair = pair.charAt(0) + insert;

      const rightNewPair = insert + pair.charAt(1);
      const currentCount = pairs.get(pair)!;
      newInsertions.set(leftNewPair, newInsertions.getOrDefault(leftNewPair, 0) + currentCount);
      newInsertions.set(rightNewPair, newInsertions.getOrDefault(rightNewPair, 0) + currentCount);
      pairs.delete(pair);
    }
    for (const [key, increase] of newInsertions) {
      pairs.set(key, (pairs.get(key) || 0) + increase);
    }
  }

  const elementCounts = new Map<string, number>();
  for (const [key, count] of pairs) {
    elementCounts.set(key.charAt(0), elementCounts.getOrDefault(key.charAt(0), 0) + count);
    elementCounts.set(key.charAt(1), elementCounts.getOrDefault(key.charAt(1), 0) + count);
  }
  for (const [key, count] of elementCounts) {
    elementCounts.set(key, (count + count % 2) / 2);
  }

  const minValue = Math.min(...elementCounts.values());
  const maxValue = Math.max(...elementCounts.values());

  return maxValue - minValue;
};

export const solve2 = (input: string): number => {
  return solve1(input, 40);
};