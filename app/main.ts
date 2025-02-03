import { rl } from "./constants";
import commands from "./commands";
import { commandExists, execInternalCommand } from "./helpers";
import { execSync } from "child_process";

// Main loop
const main = () => {
  return new Promise<void>((resolve) => {
    rl.question("$ ", async (answer) => {
      const [command, ...args] = answer.split(" ");
  
      if (commands[command]) {
        commands[command](args);
        resolve();
        return;
      };

      let foundPath = commandExists(command);
  
      if (foundPath) {
        const result = await execSync(command).subarray(0, -1);
        console.log(result.toString());
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
