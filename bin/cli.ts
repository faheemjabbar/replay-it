#!/usr/bin/env node
import { Command } from "commander";
import { loadRequests } from "../src/storage.js";
import { replayRequests } from "../src/replayer.js"; // if you have replay logic exported

const program = new Command();

program
  .name("replayit")
  .description("Record and replay HTTP requests")
  .version("1.0.1");

// ✅ Replay command
program
  .command("replay <file>")
  .requiredOption("--to <url>", "Target base URL")
  .option("--delay <ms>", "Delay between requests (ms)", "0")
  .option("--verbose", "Show detailed output")
  .action(async (file, options) => {
    try {
      await replayRequests(file, options);
    } catch (err: any) {
      console.error("Replay failed:", err.message);
      process.exit(1);
    }
  });

// ✅ List command
program
  .command("list <file>")
  .description("List recorded requests")
  .action(async (file) => {
    try {
      const requests = await loadRequests(file);
      requests.forEach((req: any, i: number) => {
        console.log(
          `${i + 1}. ${req.method} ${req.url} (${req.timestamp})`
        );
      });
    } catch (err: any) {
      console.error("Cannot load file:", err.message);
    }
  });

program.parse(process.argv);
