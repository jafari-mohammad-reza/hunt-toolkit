import {Command} from "commander";
import ora from "ora-classic";
import { sourceMap } from "./sourcemap.mjs";
const cmd = new Command();

cmd.name("huntools")
    .description('My list of assets while hunting')
    .version('1.0.0');

cmd.command('source-map')
    .description('download and unbundled js files from a input file or website url')
    .option('-i, --input <string>' , 'input file to download files from' , null)
    .option('-u, --url <string>' , 'url to download available js map files from' , null)
    .argument('<output>', 'the directory to merge source files into')
    .addHelpCommand(true, `
    download and unbundled js files from a link.
    example:  source-map  links.txt  project_codes
    example:  source-map  https://test.org/panel  project_codes
    `)
    .action(async (output , options) => {
        if(!options.input && !options.url){
            console.error(`Please provide input file or file url`);
            return;
        }
        const spinner = ora({ text: "downloading source codes..." }).start();
        spinner.color = 'green';
        sourceMap(options.input || options.url , output).then(() => {
            spinner.stop()
        })
    });

cmd.parse(process.argv);
