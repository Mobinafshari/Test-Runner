import { add, sub } from "../app/math.js";

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (err) {
    console.error(`❌ ${name}`);
    console.error(err);
    process.exit(1);
  }
}

test("add(1, 2) should return 3", () => {
  const result = add(1, 2);
  if (result !== 3) throw new Error(`Expected 3, got ${result}`);
});

test("sub(5, 3) should return 2", () => {
  const result = sub(5, 3);
  if (result !== 2) throw new Error(`Expected 2, got ${result}`);
});
