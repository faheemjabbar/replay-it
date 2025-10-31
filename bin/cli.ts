#!/usr/bin/env node
import { Command } from "commander";
import { loadRequests } from "../src/storage.js";
import { replayRequests } from "../src/replayer.js";
import { log } from "../src/logger.js";

const program = new Command();

program
  .name("replayit")
  .description("📼 Record and replay HTTP requests")
  .version("1.0.1");

// ✅ Replay command - dead simple
program
  .command("replay <file> <url>")
  .description("Replay requests from a file to a target URL")
  .action(async (file, url) => {
    try {
      await replayRequests(file, url);
    } catch (err: any) {
      log.error(err.message);
      process.exit(1);
    }
  });

// ✅ List command - see what's recorded
program
  .command("list <file>")
  .description("List all recorded requests")
  .action(async (file) => {
    try {
      const requests = await loadRequests(file);
      if (requests.length === 0) {
        log.warn("No requests found");
        return;
      }
      console.log(`\n📋 Found ${requests.length} requests:\n`);
      requests.forEach((req: any, i: number) => {
        console.log(`  ${i + 1}. ${req.method} ${req.url}`);
        console.log(`     ⏱️  ${req.timestamp}\n`);
      });
    } catch (err: any) {
      log.error(err.message);
    }
  });

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}