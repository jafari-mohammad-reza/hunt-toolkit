#!/usr/bin/env node

import {Command} from "commander";
import {sourceMap} from "./sourcemap";
import ora from 'ora'

const program = new Command();
program
    .name('tolkit')
    .description('My list of assets while hunting')
    .version('1.0.0');

program.command('source-map')
    .description('download and unbundled js files from a link')
    .argument('<input>', 'the files contain map files link')
    .argument('<output>', 'the directory to merge source files into')
    .addHelpCommand(true , `
    download and unbundled js files from a link.
    example:  source-map -i links.txt -o project_codes
    `)
    .action(async (input: string, output: string) => {
        const spinner = ora({text: "downloading source codes..."}).start();
        spinner.color = 'green';
        sourceMap(input, output).then(() => spinner.stop()).catch(err => {
            console.error("Error:", err);
            spinner.fail('An error occurred!');
        });
    });


program.parse();
