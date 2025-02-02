const { execSync } = await import('child_process');

export const commandExists = (command: string): string | void => {
    let separator = process.platform === 'win32' ? ';' : ':';
    let PATH = process.env.PATH || '';
    let paths = PATH.split(separator) ?? [];
  
    return paths.find((path: string) => {
      return require('fs').existsSync(`${path}/${command}`);
    });
  }
  
export const execInternalCommand = async (command: string) => {
    return execSync(command, { encoding: 'utf8' });
}