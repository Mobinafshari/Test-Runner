import http from "http";
import { add, sub } from "./app/math.js";
import { parse } from "url";

const server = http.createServer((req, res) => {
  const { pathname, query } = parse(req.url, true);
  const a = Number(query.a);
  const b = Number(query.b);

  res.setHeader("Content-Type", "application/json");

  if (pathname === "/add") {
    res.end(JSON.stringify({ result: add(a, b) }));
  } else if (pathname === "/sub") {
    res.end(JSON.stringify({ result: sub(a, b) }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

const PORT = 5000;

export function startServer() {
  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
      resolve();
    });
  });
}

export function stopServer() {
  return new Promise((resolve) => {
    server.close(() => resolve());
  });
}
