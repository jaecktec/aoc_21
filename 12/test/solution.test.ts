import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { solve1, solve2 } from '../src/solution';
//
// test('part 1 - 1 - computes sample', async () => {
//   const sampleInput = await readFile(resolve(__dirname, '../resources', 'sample.txt'), 'utf8');
//   const result = solve1(sampleInput);
//
//   assert.equal(result, 10);
// });
//
// test('part 1 - 2 - computes sample', async () => {
//   const sampleInput = await readFile(resolve(__dirname, '../resources', 'sample2.txt'), 'utf8');
//   const result = solve1(sampleInput);
//
//   assert.equal(result, 19);
// });

test('part 2 - 1 - computes sample', async () => {
  const sampleInput = await readFile(resolve(__dirname, '../resources', 'sample.txt'), 'utf8');
  const result = solve2(sampleInput);

  assert.equal(result, 36);
});

test('part 2 - 2 - computes sample', async () => {
  const sampleInput = await readFile(resolve(__dirname, '../resources', 'sample2.txt'), 'utf8');
  const result = solve2(sampleInput);

  assert.equal(result, 103);
});


test.run();
