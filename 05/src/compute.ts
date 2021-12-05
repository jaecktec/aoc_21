import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { solve1, solve2 } from './solution';

(async () => {
  const input = await readFile(resolve(__dirname, '../resources', 'input.txt'), 'utf8');
  const result1 = solve1(input);
  const result2 = solve2(input);
  console.table([
    { part: 'one', result: result1 },
    { part: 'two', result: result2 },
  ]);
})().catch(console.error);