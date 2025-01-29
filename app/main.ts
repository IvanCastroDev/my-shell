import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readUserInput = async () => {
  return new Promise<void>((resolve) => {
    rl.question("$ ", (answer) => {
      console.log(`${answer}: command not found`);
      resolve();
    });
  })
}

while (true) {
  await readUserInput();
}
