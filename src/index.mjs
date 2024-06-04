import {Command} from "commander";
import ora from "ora-classic";
import { sourceMap } from "./sourcemap.mjs";
const cmd = new Command();

cmd.name("huntools")
    .description('My list of assets while hunting')
    .version('1.0.0');

cmd.command('source-map')
    .description('download and unbundled js files from a link')
    .argument('<input>', 'the files contain map files link')
    .argument('<output>', 'the directory to merge source files into')
    .addHelpCommand(true, `
    download and unbundled js files from a link.
    example:  source-map -i links.txt -o project_codes
    `)
    .action(async (input, output) => {
        const spinner = ora({ text: "downloading source codes..." }).start();
        spinner.color = 'green';
        sourceMap(input , output).then(() => {
            spinner.stop()
        })
    });

cmd.parse(process.argv);
