const { execSync } = await import('child_process');

export const commandExists = (command: string): string | void => {
    let separator = process.platform === 'win32' ? ';' : ':';
    let PATH = process.env.PATH || '';
    let paths = PATH.split(separator) ?? [];
  
    return paths.find((path: string) => {
      return require('fs').existsSync(`${path}/${command}`);
    });
  }
  
export const exectInternalCommand = async (command: string) => {
    const result = execSync(command).subarray(0, -1);

    console.log(result.toString());
}