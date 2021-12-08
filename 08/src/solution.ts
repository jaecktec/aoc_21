import { intersection, without } from 'lodash';
const includesAll = (arr: string[], target: string[]) => target.every(v => arr.includes(v));



type ParsedInput = {
  signals: string[]
  outputs: string[]
};
const parseInput = (input: string): ParsedInput => {
  return input.split('\n').reduce((prev, curr) => {
    const [signal, output] = curr.split(' | ');
    return {
      signals: signal.split(' ').concat(prev.signals),
      outputs: output.split(' ').concat(prev.outputs),
    };
  }, {
    signals: [],
    outputs: [],
  } as ParsedInput);

};


const parseInput2 = (input: string): ParsedInput[] => {
  return input.split('\n').map((curr) => {
    const [signal, output] = curr.split(' | ');
    return {
      signals: signal.split(' '),
      outputs: output.split(' '),
    };
  });
};

export const solve1 = (input: string): number => {
  const {
    outputs,
  } = parseInput(input);

  const foundNumbers = new Array(10).fill(0);
  for (const output of outputs) {
    switch (output.length) {
      case 2:
        foundNumbers[1] += 1;
        break;
      case 4:
        foundNumbers[4] += 1;
        break;
      case 3:
        foundNumbers[7] += 1;
        break;
      case 7:
        foundNumbers[8] += 1;
        break;
      default:
        break;
    }
  }


  return foundNumbers.reduce((a, b) => a + b, 0);
};

export const solve2 = (input: string): number => {
  const lines = parseInput2(input);
  // figure out input
  return lines.map( ({ signals, outputs }) => {
    const mappingTable: string[] = new Array(10).fill('');
    // map known
    for (const signal of [...signals, ...outputs]) {
      switch (signal.length) {
        case 2:
          mappingTable[1] = signal;
          break;
        case 4:
          mappingTable[4] = signal;
          break;
        case 3:
          mappingTable[7] = signal;
          break;
        case 7:
          mappingTable[8] = signal;
          break;
        default:
          break;
      }
    }

    /*

    .___A___.
    |       |
    F       B
    |       |
    .___G___.
    |       |
    E       C
    |       |
    .___D___.
     */

    // known
    // [1] = 2 -   B,C
    // [7] = 3 - A,B,C
    // [4] = 4 -   B,C,    F,G
    // [8] = 8 - A,B,C,D,E,F,G

    // unknown with 5 symbols
    // [2] = 5 - A,B,  D,E  ,G
    // [3] = 5 - A,B,C,D    ,G  => includes segments of 1
    // [5] = 5 - A,  C,D  ,F,G  => includes segments of 4 filtered by segments of 1
    // unknown with 6 symbols
    // [0] = 6 - A,B,C,D,E,F    => does not include one of the diff from 4 and 1
    // [6] = 6 - A  ,C,D,E,F,G  => does not contain one of 1
    // [9] = 6 - A,B,C,D  ,F,G

    const diffOfFourAndOne = without([...mappingTable[4]], ...mappingTable[1]);
    for (const signal of [...signals, ...outputs]) {
      if (signal.length === 5) {
        if (includesAll([...signal], [...mappingTable[1]])) {
          mappingTable[3] = signal;
        }else if(includesAll([...signal], diffOfFourAndOne)){
          mappingTable[5] = signal;
        }else{
          mappingTable[2] = signal;
        }
      }else if(signal.length === 6){
        if(intersection([...signal], [...mappingTable[1]]).length === 1){
          mappingTable[6] = signal;
        }else if(intersection([...signal], diffOfFourAndOne).length === 1){
          mappingTable[0] = signal;
        }else{
          mappingTable[9] = signal;
        }

      }
    }

    // order mapping table
    const sortedMappingTable = mappingTable.map(it => [...it].sort().join(''))

    function parseNumber(input: string): string {
      const sorted = [...input].sort().join('')
      const number = sortedMappingTable.indexOf(sorted);
      if(number < 0) throw new Error('could not find mapping')
      return `${number}`
    }

    return parseInt(outputs.map(it => parseNumber(it)).join(''));
  }).reduce((a,b) => a + b, 0);
};