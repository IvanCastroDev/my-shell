import { rl } from "./constants";
import commands from "./commands";
import { commandExists, exectInternalCommand } from "./helpers";

// Main loop
const main = () => {
  return new Promise<void>((resolve) => {
    rl.question("$ ", (answer) => {
      const [command, ...args] = answer.split(" ");
  
      if (commands[command]) {
        commands[command](args);
        resolve()
        return;
      };

      let foundPath = commandExists(command);
  
      if (foundPath) {
        exectInternalCommand(`"${command}" ${args.join(' ')}`);
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
