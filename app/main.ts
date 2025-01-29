import { exit } from "process";
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readUserInput = async () => {
  return new Promise<void>((resolve, reject) => {
    rl.question("$ ", (answer) => {
      const commands = answer.split(" ");
      
      if (commands[0] === "exit") {
        rl.close();
        reject(commands[1]);
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
