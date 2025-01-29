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

const echo = (message: string) => {
  console.log(message);
}

const commands = {
  'exit': exitFunction,
  'echo': echo
}

const readUserInput = async () => {
  return new Promise<void>((resolve, reject) => {
    rl.question("$ ", (answer) => {
      const command = answer.split(" ")[0];
      const args = answer.split(" ").length > 1 ? answer.split(" ").slice(1, answer.length) : [''];

      switch (command) {
        case 'exit':
          commands[command](reject, args[1]);
          break;
        case 'echo':
          commands[command](args.join(" "));
          break;
        default:
          console.log(`${command}: command not found`);
          break;
      }

      resolve();
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
