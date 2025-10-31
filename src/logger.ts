import chalk from "chalk";
import { format } from "date-fns";

export const log = {
  info: (msg: string) =>
    console.log(chalk.blue(`[ℹ️ ${format(new Date(), "HH:mm:ss")}] ${msg}`)),

  success: (msg: string) =>
    console.log(chalk.green(`[✅ ${format(new Date(), "HH:mm:ss")}] ${msg}`)),

  warn: (msg: string) =>
    console.log(chalk.yellow(`[⚠️ ${format(new Date(), "HH:mm:ss")}] ${msg}`)),

  error: (msg: string) =>
    console.log(chalk.red(`[❌ ${format(new Date(), "HH:mm:ss")}] ${msg}`)),
};
