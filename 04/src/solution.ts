type Set = number[][]

type Parsed = {
  readonly drawing: number[],
  readonly sets: Set[],
  readonly dimension: number,
};

// https://stackoverflow.com/a/16227294/1921982
function intersect(a: number[], b: number[]): number[] {
  let t;
  if (b.length > a.length) {
    t = b;
    b = a;
    a = t;
  } // indexOf to loop over shorter
  return a.filter(function (e) {
    return b.indexOf(e) > -1;
  });
}

const unique = <T>(value: T, index: number, self: T[]) => self.indexOf(value) === index;

const parseInput = (input: string): Parsed => {
  const lines = input.split('\n');
  const drawing = lines[0].split(',').map(nr => parseInt(nr));
  const dimension = lines[2].split(/\s+/).length;

  const result: Parsed = {
    drawing,
    dimension,
    sets: [],
  };

  let set: Set = new Array(dimension).fill(new Array(dimension));
  for (let i = 2; i < lines.length; i += dimension) {
    for (let y = 0; y < dimension; y++) {
      set[y] = lines[i + y].trim().split(/\s+/).map(nr => parseInt(nr));
    }
    result.sets.push(set);
    set = new Array(dimension).fill(new Array(dimension));
    i += 1;
  }
  return result;
};

function findWinningSet(parsedInput: Parsed): {
  setNr: number,
  drawings: number[],
} {
  for (let i = 0; i < parsedInput.drawing.length; i++) {
    const drawings = parsedInput.drawing.slice(0, i);


    for (let setNr = 0; setNr < parsedInput.sets.length; setNr++) {
      const set = parsedInput.sets[setNr];
      // find match in rows
      for (let row = 0; row < parsedInput.dimension; row++) {
        if (intersect(set[row], drawings).length === parsedInput.dimension) {
          return { setNr, drawings };
        }
      }
      for (let col = 0; col < parsedInput.dimension; col++) {
        if (intersect(set.map(s => s[col]), drawings).length === parsedInput.dimension) {
          return { setNr, drawings };
        }
      }
    }
  }
  throw new Error('no set found');
}

export const solve1 = (input: string): number => {
  const parsedInput = parseInput(input);
  let result = 0;

  let { drawings, setNr } = findWinningSet(parsedInput);

  const sumOfUnmarked = parsedInput.sets[setNr].flatMap(s => s)
    .filter(it => !drawings.includes(it))
    .filter(unique)
    .reduce((prev, curr) => prev + curr, 0);

  // return 0
  return sumOfUnmarked * drawings[drawings.length - 1];

};

export const solve2 = (input: string): number => {
  const parsedInput = parseInput(input);
  let result = 0;

  let lastWonSet = undefined;
  let lastDrawings: number[] = [];
  let remainingSets = [...parsedInput.sets];
  let i = 10000;
  while (i-- > 0) {
    try {
      let { drawings, setNr } = findWinningSet({
        ...parsedInput,
        sets: remainingSets,
      });
      lastWonSet = remainingSets[setNr];
      lastDrawings = drawings;
      remainingSets.splice(setNr, 1);
    } catch (e) {
      break
    }

  }

  const sumOfUnmarked = lastWonSet!.flatMap(s => s)
    .filter(it => !lastDrawings.includes(it))
    .filter(unique)
    .reduce((prev, curr) => prev + curr, 0);

  // return 0
  return sumOfUnmarked * lastDrawings[lastDrawings.length - 1];
};