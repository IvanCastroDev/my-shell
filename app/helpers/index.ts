import { execSync } from 'child_process';
import { OS } from '../constants';

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