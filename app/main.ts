import { rl } from "./constants";
import commands from "./commands";
import { commandExists, execInternalCommand } from "./helpers";

// Main loop
const main = () => {
  return new Promise<void>((resolve) => {
    rl.question("$ ", async (answer) => {
      const [command, ...args] = answer.split(" ");
  
      if (commands[command]) {
        commands[command](args);
        resolve()
        return;
      };

      let foundPath = commandExists(command);
  
      if (foundPath) {
        let resutl = await execInternalCommand(`"${command}" ${args.join(' ')}`);
        console.log(resutl);
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
