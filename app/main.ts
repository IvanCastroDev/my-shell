import { rl } from "./constants";
import commands from "./commands";
import { commandExists, execInternalCommand } from "./helpers";
import { singleQuoteRegex } from "./constants";

// Main loop
const main = () => {
  return new Promise<void>((resolve) => {
    rl.question("$ ", async (answer) => {
      const [command, ...args] = answer.split(" ");

      for (let arg of args) {
        args[args.indexOf(arg)] = arg.replace(/'/g, '');
      };
  
      if (commands[command]) {
        commands[command](args);
        resolve();
        return;
      };

      let foundPath = commandExists(command);
  
      if (foundPath) {
        console.log((await execInternalCommand(`"${command}" ${args.join(' ')}`)).replace(/\n$/, ''));
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
