import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { solve1, solve2 } from '../src/solution';

test('part 1 - computes sample', async () => {
  const sampleInput = await readFile(resolve(__dirname, '../resources', 'sample.txt'), 'utf8');
  const result = solve1(sampleInput);

  assert.equal(result, 26397);
});

test('part 2 - computes sample', async () => {
  const sampleInput = await readFile(resolve(__dirname, '../resources', 'sample.txt'), 'utf8');
  const result = solve2(sampleInput);

  assert.equal(result, 288957);
});


test.run();
