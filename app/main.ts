import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("$ ", (answer) => {
  console.log(`invalid_command: command not found`);
  rl.close();
});