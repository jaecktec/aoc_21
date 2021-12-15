import { padArray } from '@aoc_21/09/src/solution';

const parseInput = (input: string): number[][] => {
  return input.split('\n').map((i) => [...i].map(it => parseInt(it)));
};

type Position = {
  readonly x: number
  readonly y: number
};
type Path = {
  cost: number
  path: Position[]
};


type GridPosition = {
  costToMoveHere: number
  distance: number
};
const posToStr = ({ x, y }: Position): string => `${x}_${y}`;
const strToPos = (string: string): Position => {
  const [x, y] = string.split('_').map(Number);
  return { x, y };
};


type Grid = Map<string, GridPosition>

function extracted(parsedInput: number[][]) {
  const padded = padArray(parsedInput, Infinity);
  const startX = 1;
  const startY = 1;
  const endX = padded.length - 2;
  const endY = padded.length - 2;

  const printGrid = (grid: Grid) => {
    const outArr = new Array(padded.length).fill(0).map(() => new Array(padded[0].length));
    for (let y = 0; y < padded.length; y++) {
      for (let x = 0; x < padded[y].length; x++) {
        const key = posToStr({ x, y });
        const { distance } = grid.get(key)!;
        outArr[y][x] = distance === Infinity ? '.' : '' + distance;
      }
    }
    console.table(outArr);
  };

  const grid: Grid = new Map<string, GridPosition>();
  const nonInfinitePositions = new Map<string, GridPosition>();

  for (let y = 0; y < padded.length; y++) {
    for (let x = 0; x < padded[y].length; x++) {
      grid.set(posToStr({ x, y }), {
        costToMoveHere: padded[y][x],
        distance: Infinity,
      });
    }
  }

  const visitedNodes = new Set<string>();

  let currentPosition: Position = { x: startX, y: startY };

  const moveTo = (pos: Position, currentCost: number) => {
    const key = posToStr(pos);
    // don't go back to a place where we were
    if (visitedNodes.has(key)) return;
    const gridPosition = grid.get(key)!;

    if (gridPosition.distance > currentCost + gridPosition.costToMoveHere) {
      gridPosition.distance = currentCost + gridPosition.costToMoveHere;
    } else {
      // in case it is cheaper if we reach it from a different grid position
    }

    // printGrid(grid);

    if (gridPosition.distance < Infinity) {
      nonInfinitePositions.set(key, gridPosition);
    }
  };

  grid.get(posToStr(currentPosition))!.distance = 0;

  const getCheapest = (): Position => {
    let cheapestPos = '';
    let minDistance = Infinity;
    for (const [key, val] of nonInfinitePositions.entries()) {
      if (minDistance > val.distance) {
        cheapestPos = key;
        minDistance = val.distance;
      }
    }
    return strToPos(cheapestPos);
  };

  while (currentPosition.x !== endX || currentPosition.y !== endY) {
    const currentPosAsString = posToStr(currentPosition);
    const currentCost = grid.get(currentPosAsString)!.distance;
    nonInfinitePositions.delete(currentPosAsString);
    visitedNodes.add(currentPosAsString);

    moveTo({ x: currentPosition.x + 1, y: currentPosition.y }, currentCost);
    moveTo({ x: currentPosition.x - 1, y: currentPosition.y }, currentCost);
    moveTo({ x: currentPosition.x, y: currentPosition.y + 1 }, currentCost);
    moveTo({ x: currentPosition.x, y: currentPosition.y - 1 }, currentCost);
    currentPosition = getCheapest();
  }


  return grid.get(posToStr(currentPosition))!.distance;
}

export const solve1 = (input: string): number => {

  const parsedInput = parseInput(input);
  return extracted(parsedInput);
};

export const solve2 = (input: string): number => {
  const parsedInput = parseInput(input);

  const increaseArrayBy = (arr: number[], val: number) => {
    return arr.map(it => (it + val) > 9 ? (it + val) - 9 : it + val)
  }
  const multipliedInput = new Array(parsedInput.length * 5)
    .fill(0).map((_, idx) => {
      const lineAdder = Math.floor(idx / parsedInput.length);
      const line = parsedInput[idx % parsedInput.length];
      return increaseArrayBy(line, lineAdder)
        .concat(increaseArrayBy(line, 1 + lineAdder))
        .concat(increaseArrayBy(line, 2 + lineAdder))
        .concat(increaseArrayBy(line, 3 + lineAdder))
        .concat(increaseArrayBy(line, 4 + lineAdder));
    });

  return extracted(multipliedInput);
};