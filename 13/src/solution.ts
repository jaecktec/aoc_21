type Axis = 'x' | 'y'

type Input = {
  dots: { x: number, y: number }[],
  folds: { axis: Axis, value: number }[]
}

const parseInput = (input: string): Input => {
  const lines = input.split('\n');
  const dots = lines
    .filter(it => it.includes(','))
    .map(it => it.split(','))
    .map(([x, y]) => ({
      x: parseInt(x),
      y: parseInt(y),
    }));

  const folds = lines
    .filter(it => it.startsWith('fold along '))
    .map(it => it.replace('fold along ', ''))
    .map(it => it.split('='))
    .map(([axis, value]) => {
      if (!['x', 'y'].includes(axis)) throw new Error(`unknown axis ${axis}`);
      return ({
        axis: axis as Axis, value: parseInt(value),
      });
    });


  return {
    folds,
    dots,
  };
};

export const solve1 = (input: string): number => {
  const parsedInput = parseInput(input);
  const paperMaxX = Math.max(...parsedInput.dots.map(({ x }) => x));
  const paperMaxY = Math.max(...parsedInput.dots.map(({ y }) => y));
  const paper = new Array(paperMaxY + 1).fill(0).map(() => new Array(paperMaxX + 1).fill(false));
  for (const { x, y } of parsedInput.dots) {
    paper[y][x] = true;
  }
  console.log(paper.map(it => it.map(s => s ? '#' : '.').join('')).join('\n'));
  console.log('\n');

  for (const { axis, value } of parsedInput.folds) {
    if (axis === 'y') {
      for (let fromY = value + 1; fromY < paper.length; fromY++) {
        const toY = value - (fromY - value);
        for (let x = 0; x < paper[0].length; x++) {
          paper[toY][x] = paper[toY][x] || paper[fromY][x];
        }
      }
      paper.length = value;
    }else{
      for (let fromX = value + 1; fromX < paper[0].length; fromX++) {
        const toX = value - (fromX - value);
        for (let y = 0; y < paper.length; y++) {
          paper[y][toX] = paper[y][toX] || paper[y][fromX];
        }
      }
      for (let y = 0; y < paper.length; y++) {
        paper[y].length = value;
      }
    }
    break; // for pt1
  }

  const flatMap: number[] = paper.flatMap(it => it.map(it2 => it2 ? 1 : 0));
  return flatMap.reduce((a, b) => a + b, 0);
};

export const solve2 = (input: string): number => {
  // lazy copy past of solution 1 without the break plus a log statement
  const parsedInput = parseInput(input);
  let result = 0;
  const paperMaxX = Math.max(...parsedInput.dots.map(({ x }) => x));
  const paperMaxY = Math.max(...parsedInput.dots.map(({ y }) => y));
  const paper = new Array(paperMaxY + 1).fill(0).map(() => new Array(paperMaxX + 1).fill(false));
  for (const { x, y } of parsedInput.dots) {
    paper[y][x] = true;
  }
  console.log(paper.map(it => it.map(s => s ? '#' : '.').join('')).join('\n'));
  console.log('\n');

  for (const { axis, value } of parsedInput.folds) {
    if (axis === 'y') {
      for (let fromY = value + 1; fromY < paper.length; fromY++) {
        const toY = value - (fromY - value);
        for (let x = 0; x < paper[0].length; x++) {
          paper[toY][x] = paper[toY][x] || paper[fromY][x];
        }
      }
      paper.length = value;
    }else{
      for (let fromX = value + 1; fromX < paper[0].length; fromX++) {
        const toX = value - (fromX - value);
        for (let y = 0; y < paper.length; y++) {
          paper[y][toX] = paper[y][toX] || paper[y][fromX];
        }
      }
      for (let y = 0; y < paper.length; y++) {
        paper[y].length = value;
      }
    }
  }
  console.log(paper.map(it => it.map(s => s ? '#' : ' ').join('')).join('\n'));
  return result;
};