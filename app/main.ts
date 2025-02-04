import { rl } from "./constants";
import commands from "./commands";
import { commandExists, execInternalCommand } from "./helpers";
import { singleQuoteRegex } from "./constants";

// Main loop
const main = () => {
  return new Promise<void>((resolve) => {
    rl.question("$ ", async (answer) => {
      const [command, ...args] = [...answer.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)].map(m => m[1] || m[2] || m[3]);
  
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
