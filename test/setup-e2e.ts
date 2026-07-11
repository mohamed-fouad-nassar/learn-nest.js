import { join } from 'path';
import { rm } from 'fs/promises';

// beforeEach runs before each it block not in the first of each command 'npm run test:e2e' run while beforeAll runs only once
global.beforeAll(async () => {
  try {
    await rm(join(__dirname, '..', 'db.test.sqlite'));
  } catch (err) {
    console.log(err);
  }
});
