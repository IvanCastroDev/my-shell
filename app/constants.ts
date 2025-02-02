import { createInterface } from "readline";
import { directory } from "./classes";

export const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

export const Directory = new directory();