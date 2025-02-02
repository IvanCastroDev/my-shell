import { typeCommand } from "../types";
import { commandExists } from "../helpers";
import { Directory } from "../constants";

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
  console.log(Directory.getDirectory());
};

const changeDirectory = (args: string[]) => {
    const newDir = args[0];
};

const commands: { [key: string]: typeCommand } = {
    exit: (args: string[]) => process.exit(0),
    echo: echo,
    type: typeFunction,
    pwd: pwd,
    cd: changeDirectory
};

export default commands;