import {Test , expect , beforeEach , afterEach} from '../index.js'
let counter = 0;

beforeEach(async() => {
   counter = 0;
  await console.log("🧹 beforeEach: reset counter to 0");
});

afterEach(() => {
  console.log("✅ afterEach: test finished, counter is", counter);
});

Test("adds 1 to counter", () => {
  counter += 1;
  expect(counter).toBe(1);
});

Test("adds 5 to counter", () => {
  counter += 5;
  expect(counter).toBe(5);
});
