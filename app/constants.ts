import { createInterface } from "readline";

export const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});