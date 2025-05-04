// import { add, sub } from "../app/math.js";

// function test(name, fn) {
//   try {
//     fn();
//     console.log(`✅ ${name}`);
//   } catch (err) {
//     console.error(`❌ ${name}`);
//     console.error(err);
//     process.exit(1);
//   }
// }

// test("add(1, 2) should return 3", () => {
//   const result = add(1, 2);
//   if (result !== 3) throw new Error(`Expected 3, got ${result}`);
// });

// test("sub(5, 3) should return 2", () => {
//   const result = sub(5, 3);
//   if (result !== 2) throw new Error(`Expected 2, got ${result}`);
// });
import { startServer, stopServer } from "../index.js";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function test(name, fn) {
  try {
    fn()
      .then(() => {
        console.log(`✅ ${name}`);
      })
      .catch((err) => {
        console.error(`❌ ${name}`);
        console.error(err);
        process.exit(1);
      });
  } catch (err) {
    console.error(`❌ ${name}`);
    console.error(err);
    process.exit(1);
  }
}

await startServer();
await delay(100); // optional, just to be sure it's ready

test("GET /add?a=1&b=2 should return 3", async () => {
  const res = await fetch("http://localhost:5000/add?a=1&b=2");
  const json = await res.json();
  if (json.result !== 3) {
    throw new Error(`Expected 3, got ${json.result}`);
  }
});

test("GET /sub?a=5&b=2 should return 3", async () => {
  const res = await fetch("http://localhost:5000/sub?a=5&b=2");
  const json = await res.json();
  if (json.result !== 3) {
    throw new Error(`Expected 3, got ${json.result}`);
  }
});

setTimeout(async () => {
  await stopServer();
}, 500);
