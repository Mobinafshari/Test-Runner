import { add, sub } from "../app/math.js";
import { performance } from "node:perf_hooks";

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

test("add(1, 2) should return 3", () => {
  const result = add(1, 2);
  if (result !== 3) throw new Error(`Expected 3, got ${result}`);
});

test("sub(5, 3) should return 2", () => {
  const result = sub(5, 3);
  if (result !== 2) throw new Error(`Expected 2, got ${result}`);
});

test("Math sqrt", () => {
  const result = Math.sqrt(4);
  if (result !== 2) throw new Error(`Expected 2, got ${result}`);
});

const start = performance.now();

await Promise.allSettled(
  tests.map(({ name, fn }) =>
    Promise.resolve()
      .then(() => {
        const t0 = performance.now();
        return fn(), performance.now() - t0;
      })
      .then((duration) => {
        console.log(`✅ ${name} (${Math.round(duration)}ms)`);
      })
      .catch((err) => {
        console.error(`❌ ${name}`);
        console.error(err);
        process.exit(1);
      })
  )
);

const end = performance.now();
console.log(`\n🕒 Finished in ${Math.round(end - start)}ms`);
