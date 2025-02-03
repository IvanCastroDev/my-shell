import { createInterface } from "readline";

export const OS = process.platform;

export const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});