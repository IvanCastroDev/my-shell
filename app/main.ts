import { exit } from "process";
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const validCommands = {
  "ls": "ls",
};

const readUserInput = async () => {
  return new Promise<void>((resolve, reject) => {
    rl.question("$ ", (answer) => {
      if (answer === "exit") {
        rl.close();
        reject("exit");
      };

      console.log(`${answer}: command not found`);
      reject('exit')
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
