const parseInput = (input: string): {
  y1: number,
  x1: number,
  y2: number,
  x2: number,
}[] => {
  return input.split('\n').map((line) => {
    const [set1, set2] = line.split(' -> ');
    const [x1, y1] = set1.split(',').map(nr => parseInt(nr));
    const [x2, y2] = set2.split(',').map(nr => parseInt(nr));
    return {
      y1, x1, y2, x2,
    };
  });
};

function displaySolution(parsedInput: { y1: number; x1: number; y2: number; x2: number }[], grid: Map<any, any>) {
  const maxX = Math.max(...parsedInput.flatMap(({ x1, x2 }) => [x1, x2])) + 1;
  const maxY = Math.max(...parsedInput.flatMap(({ y1, y2 }) => [y1, y2])) + 1;

  const display = new Array(maxY).fill('.').map(() => new Array(maxX).fill('.'));
  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      display[y][x] = grid.get(`${x}-${y}`) || '.';
    }
  }
  console.log('\n');
  console.table(display);
}

const solve = (input: string, skipDiagonals: boolean, displayOutput: boolean) => {
  const parsedInput = parseInput(input);
  const grid = new Map();

  for (const { x1, y1, y2, x2 } of parsedInput) {
    // skip diagonals
    if (skipDiagonals && (x1 !== x2 && y1 !== y2)) continue;
    const dx = x2 - x1;
    const dy = y2 - y1;

    for (let i = 0; i <= Math.max(Math.abs(dx), Math.abs(dy)); i++) {
      const px = (dx === 0 ? 0 : i * (dx > 0 ? 1 : -1)) + x1;
      const py = (dy === 0 ? 0 : i * (dy > 0 ? 1 : -1)) + y1;
      const key = `${px}-${py}`;
      const currItem = grid.get(key) || 0;
      grid.set(key, currItem + 1);
    }

  }

  if(displayOutput){
    displaySolution(parsedInput, grid);
  }

  return [...grid.values()].filter(val => val > 1).length;
};

export const solve1 = (input: string, displayOutput: boolean = false): number => {
  return solve(input, true, displayOutput);
};

export const solve2 = (input: string, displayOutput: boolean = false): number => {
  return solve(input, false, displayOutput);
};