import { execSync } from "child_process";
import { exit } from "process";
import { createInterface } from "readline";

// Types
type CommandFunction = (args: string[]) => void;

// Functions for the shell commands
const echo = (args: string[]) => {
  console.log(args.join(' '));
};

const typeFunction = (args: string[]) => {
  let arg = args[0];

  if (commands[arg] !== undefined) {
    console.log(`${args} is a shell builtin`);
    return;
  }

  const foundPath = commandExists(arg);
  
  if (foundPath) {
    console.log(`${arg} is ${foundPath}/${arg}`);
  } else {
    console.log(`${arg} not found`);
  }
};

// Global variables
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const commands: { [key: string]: CommandFunction } = {
  exit: (args: string[]) => exit(0),
  echo: echo,
  type: typeFunction
};

// Helpers
const commandExists = (command: string): string | void => {
  let separator = process.platform === 'win32' ? ';' : ':';
  let PATH = process.env.PATH || '';
  let paths = PATH.split(separator) ?? [];

  return paths.find((path: string) => {
    return require('fs').existsSync(`${path}/${command}`);
  });
}

const exectInternalCommand = (command: string) => {
  const result = execSync(command).subarray(0, -1);

  console.log(result.toString());
}

// Main loop
const main = () => {
  return new Promise<void>((resolve) => {
    rl.question("$ ", (answer) => {
      const [command, ...args] = answer.split(" ");
  
      if (commands[command]) {
        commands[command](args);
        resolve()
        return;
      };

      let foundPath = commandExists(command);
  
      if (foundPath) {
        exectInternalCommand(`"${command}" ${args.join(' ')}`);
        resolve()
        return;
      };

      console.log(`${command}: command not found`);
  
      resolve();
    });
  });
};


while (true) {
  await main();
}
