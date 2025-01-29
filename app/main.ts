import { exit } from "process";
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const exitFunction = (reject: (reason?: any) => void, code: string) => {
  rl.close();
  reject(code)
};

const commands = {
  'exit': exitFunction,
}

const readUserInput = async () => {
  return new Promise<void>((resolve, reject) => {
    rl.question("$ ", (answer) => {
      const args = answer.split(" ");
      answer = args[0];

      if (answer === "exit") {
        commands[answer](reject, args[1]);
      }else {
        console.log(`${answer}: command not found`);
        resolve();
      }
    });
  })
}

while (true) {
  try {
    await readUserInput();
  } catch (reason) {
    throw exit(0)
  }
}
