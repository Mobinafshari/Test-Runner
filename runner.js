import fs from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { tests } from "./index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, "test");

async function loadTestFiles(dir) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    if (file.endsWith(".test.js")) {
      const filePath = path.join(dir, file);
      await import(pathToFileURL(filePath).href);
    }
  }
  executeTests(tests);
}

await loadTestFiles(testDir);
function executeTests(tests) {
  const promises = Array.from(tests).map(
    (test) =>
      new Promise(async (res, rej) => {
        try {
          const result = test.fn();
          if (result instanceof Promise) {
            res(await result);
          } else {
            res(result);
          }
          console.log(`${test.name} Executed Successfully!`);
        } catch (error) {
          rej(error);
          console.error(`❌ ${test.name} Execution Failed:`, error);
        }
      })
  );

  Promise.allSettled(promises).then(() => {
    console.log("✅ All tests finished Successfully! Yaay");
  });
}
