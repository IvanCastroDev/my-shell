import { typeCommand } from "../types";
import { commandExists } from "../helpers";
import { chdir, cwd, exit } from "process";
import { OS } from "../constants";

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
  console.log(cwd());
};

const changeDirectory = async (args: string[]) => {
  if (args[0].includes('~')) {
    args[0] = args[0].replace('~', process.env.USERPROFILE ?? '');
  };

  try {
    chdir(args[0]);
  } catch (err: any) {
    console.log(`cd: ${args[0]}: ${err.message}`);
  };
};

const listSubdirectories = async (args: string[]) => {

};

const commands: { [key: string]: typeCommand } = {
  exit: (args: string[]) => exit(0),
  echo: echo,
  type: typeFunction,
  pwd: pwd,
  cd: changeDirectory
};

export default commands;