type Input1 = {
  [from: string]: string[]
}

const isSmallCave = (input: string): boolean => {
  return input.toLowerCase() === input;
};

const parseInput = (input: string): Input1 => {
  return input.split('\n').reduce((res, l) => {
    const [a, b] = l.split('-');
    if (!res[a]) res[a] = [];
    res[a].push(b);
    if (!res[b]) res[b] = [];
    res[b].push(a);

    return res;
  }, {} as Input1);
};

export const solve1 = (rawInput: string): number => {
  const graph = parseInput(rawInput);

  const travel = (currentPath: string): string[] => {
    const visited = currentPath.split(',');
    const currentCave = visited[visited.length - 1];
    if (currentCave === 'end') return [currentPath];
    const connectingCaves = graph[currentCave];
    const possibleNext = connectingCaves.filter(it => !(isSmallCave(it) && visited.includes(it)));
    return possibleNext.flatMap(next => travel([...visited, next].join(',')));
  };

  return travel('start').length;
};

export const solve2 = (input: string): number => {
  const graph = parseInput(input);

  const smallCavesMostTwice = (currentPath: string[], connectingCaves: string[]): string[] => {
    const visitsToSmallCaves = currentPath.filter(isSmallCave).reduce((prev, curr) => {
      if (!prev[curr]) prev[curr] = 0;
      prev[curr] += 1;
      return prev;
    }, {} as { [k: string]: number });
    const smallCaveVisitedTwice = Object.values(visitsToSmallCaves).filter((v) => v > 1).length > 1;
    const possibilities = connectingCaves
      .filter(it => it !== 'start') // do not return to start
      .filter(it => !(isSmallCave(it) && smallCaveVisitedTwice))
      .filter(it => !(isSmallCave(it) && currentPath.filter(v => v === it).length > 1));
    return possibilities;
  };

  const travel = (currentPath: string, nextPossibilityDetector: (visited: string[], connectingCaves: string[]) => string[]): string[] => {
    const visited = currentPath.split(',');
    const currentCave = visited[visited.length - 1];
    if (currentCave === 'end') return [currentPath];
    const connectingCaves = graph[currentCave];
    const possibleNext = nextPossibilityDetector(visited, connectingCaves);
    return possibleNext.flatMap(next => travel([...visited, next].join(','), nextPossibilityDetector));
  };
  const paths = travel('start', smallCavesMostTwice);
  // console.table(paths);
  return paths.length;
};