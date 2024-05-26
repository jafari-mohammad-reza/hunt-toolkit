import chalk from "chalk";

export const errorChalk = (message:string) => chalk.bold(chalk.red(`${message}`))