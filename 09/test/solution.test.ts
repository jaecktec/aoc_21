import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { padArray, solve1, solve2, trace } from '../src/solution';

test('ninePadArray - should add 9 padding around array', () => {

  const input = [
    [1, 2, 3],
    [4, 5, 6],
    [8, 9, 9],
  ];

  const expectedOutput = [
    [9, 9, 9, 9, 9],
    [9, 1, 2, 3, 9],
    [9, 4, 5, 6, 9],
    [9, 8, 9, 9, 9],
    [9, 9, 9, 9, 9],
  ];

  assert.equal(expectedOutput, padArray(input));

});

const paddedInput = [
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 2, 1, 9, 9, 9, 4, 3, 2, 1, 0, 9],
  [9, 3, 9, 8, 7, 8, 9, 4, 9, 2, 1, 9],
  [9, 9, 8, 5, 6, 7, 8, 9, 8, 9, 2, 9],
  [9, 8, 7, 6, 7, 8, 9, 6, 7, 8, 9, 9],
  [9, 9, 8, 9, 9, 9, 6, 5, 6, 7, 8, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
];

test('trace with start point top-left [1,2] returns 3', async () => {
  const result = trace(1, 2, paddedInput);
  assert.equal(result, 3);
});
test('trace with start point top-right [1,10] returns 9', async () => {
  const result = trace(1, 10, paddedInput);
  assert.equal(result, 9);
});
test('trace with start point middle [3,3] returns 14', async () => {
  const result = trace(3, 3, paddedInput);
  assert.equal(result, 14);
});
test('trace with start point bottom-right [5,7] returns 9', async () => {
  const result = trace(5, 7, paddedInput);
  assert.equal(result, 9);
});

test('part 1 - computes sample', async () => {
  const sampleInput = await readFile(resolve(__dirname, '../resources', 'sample.txt'), 'utf8');
  const result = solve1(sampleInput);

  assert.equal(result, 15);
});

test('part 2 - computes sample', async () => {
  const sampleInput = await readFile(resolve(__dirname, '../resources', 'sample.txt'), 'utf8');
  const result = solve2(sampleInput);

  assert.equal(result, 1134);
});


test.run();
