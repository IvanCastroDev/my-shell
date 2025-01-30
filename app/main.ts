import { exit } from "process";
import { createInterface } from "readline";

// Types
type CommandFunction = (args: string[]) => void;

// Global variables
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Functions for the shell commands
const echo = (args: string[]) => {
  console.log(args.join(' '));
}

const typeFunction = (args: string[]) => {
  const PATH = process.env.PATH ? process.env.PATH : '';
  let paths = PATH.split(':') ?? [];
  let arg = args.join('');

  if (commands[arg] !== undefined) {
    console.log(`${args} is a shell builtin`);
    return;
  } else if (paths.map((path: string) => path.split('/').map((bin: string) => bin === arg).includes(true)).includes(true)) {
    let commandPath = '';

    paths.forEach((path: string) => {
      if (path.split('/').includes(arg)) {
        commandPath = path;
      }
    });

    console.log(`${arg} is ${commandPath}`);
    return;
  } else {
    console.log(`${arg} not found`);
    return;
  }
}

const commands: { [key: string]: CommandFunction } = {
  'exit': (args: string[]) => {},
  'echo': echo,
  'type': typeFunction
}

const readUserInput = async () => {
  return new Promise<void>((resolve, reject) => {
    rl.question("$ ", (answer) => {
      const command = answer.split(" ")[0];
      const args = answer.split(" ").length > 1 ? answer.split(" ").slice(1, answer.length) : [];

      if (command === 'exit') {
        rl.close();
        reject(args.length > 0 ? parseInt(args.join(' ')) : 0);
        return;
      };

      if (!commands[command]) {
        console.log(`${command}: command not found`);
        resolve();
        return;
      };

      commands[command](args);

      resolve();
    });
  })
}

while (true) {
  try {
    await readUserInput();
  } catch (code: any) {
    throw exit(code);
  }
}
