import { exec } from "child_process";
import { exit } from "process";
import { createInterface } from "readline";

// Types
type CommandFunction = (args: string[]) => void;

// Functions for the shell commands
const echo = (args: string[]) => {
  console.log(args.join(' '));
}

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
}

// Global variables
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const commands: { [key: string]: CommandFunction } = {
  'exit': (args: string[]) => {},
  'echo': echo,
  'type': typeFunction
}

// Helpers
const commandExists = (command: string): string | void => {
  let separator = process.platform === 'win32' ? ';' : ':';
  let PATH = process.env.PATH || '/usr/bin:/usr/local/bin';
  let paths = PATH.split(separator) ?? [];

  return paths.find((path: string) => {
    return require('fs').existsSync(`${path}/${command}`);
  });
}

const exectInternalCommand = (command: string) => {
  exec(command, (err, stdout, stderr) => {
    console.clear();
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
}

// Main loop
const main = async () => {
  return new Promise<void>((resolve, reject) => {
    rl.question("$ ", (answer) => {
      const command = answer.split(" ")[0];
      const args = answer.split(" ").length > 1 ? answer.split(" ").slice(1, answer.length) : [];

      if (command === 'exit') {
        rl.close();
        reject(args.length > 0 ? parseInt(args.join(' ')) : 0);
        return;
      };

      const foundPath = commandExists(command);

      if (foundPath) {
        exectInternalCommand(`"${command}" ${args.join(' ')}`);
        resolve();
        return;
      }

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
    await main();
  } catch (code: any) {
    throw exit(code);
  }
}
