import { execSync } from 'child_process';
import { OS } from '../constants';

export const formatCommand = (answer: string): string[] => {
  const [command, ...args] = [...answer.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)].map(m => m[1] || m[2] || m[3]);

  return [command, ...args];
};

export const commandExists = (command: string): string | void => {
    let separator = OS === 'win32' ? ';' : ':';
    let PATH = process.env.PATH || '';
    let paths = PATH.split(separator) ?? [];
  
    return paths.find((path: string) => {
      return require('fs').existsSync(`${path}/${command}`);
    });
  }
  
export const execInternalCommand = async (command: string) => {
    return execSync(command, { encoding: 'utf-8' });
}