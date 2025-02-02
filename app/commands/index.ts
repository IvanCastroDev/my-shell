import { typeCommand } from "../types";
import { commandExists } from "../helpers";

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
    return;
  }

  console.log(`${arg} not found`);
};

const pwd = (args: string[]) => {
  console.log(process.cwd());
};

const commands: { [key: string]: typeCommand } = {
    exit: (args: string[]) => process.exit(0),
    echo: echo,
    type: typeFunction,
    pwd: pwd
};

export default commands;