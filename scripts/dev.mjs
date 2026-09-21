import { spawn } from "node:child_process";
import path from "node:path";

const incoming = process.argv.slice(2);
const forwarded = [];

for (let index = 0; index < incoming.length; index += 1) {
  const argument = incoming[index];

  if (argument === "--host") {
    forwarded.push("--hostname", incoming[index + 1]);
    index += 1;
    continue;
  }

  if (argument === "--strictPort") {
    continue;
  }

  forwarded.push(argument);
}

const nextBinary = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextBinary, "dev", ...forwarded], {
  stdio: "inherit",
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("exit", (code) => process.exit(code ?? 1));
