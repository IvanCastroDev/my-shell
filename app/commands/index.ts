import { typeCommand } from "../types";
import { commandExists } from "../helpers";
import { chdir, cwd, exit } from "process";

const echo = (args: string) => {
  console.log(args.replace(/"|'/g, ''));
};

const typeFunction = (args: string) => {
  let arg = args.split(' ')[0];

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

const pwd = (args: string) => {
  console.log(cwd());
};

const changeDirectory = async (args: string) => {
  const argsList = args.split(' ');
  if (argsList[0].includes('~')) {
    argsList[0] = argsList[0].replace('~', process.env.HOME ?? '');
  };

  try {
    chdir(argsList[0]);
  } catch (err: any) {
    console.log(`cd: ${argsList[0]}: ${err.message}`);
  };
};

const listSubdirectories = async (args: string[]) => {

};

const commands: { [key: string]: typeCommand } = {
  exit: (args: string) => exit(0),
  echo: echo,
  type: typeFunction,
  pwd: pwd,
  cd: changeDirectory
};

export default commands;