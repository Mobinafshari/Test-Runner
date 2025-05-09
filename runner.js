import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, "tests");

async function loadTestFiles(dir) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    if (file.endsWith(".test.js")) {
      const filePath = path.join(dir, file);
      await import(filePath);
    }
  }
}

await loadTestFiles(testDir);
