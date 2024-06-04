import path from "node:path";
import {getGoPath} from "./path_utils.mjs";
import chalk from 'chalk';
import {errorChalk} from "./text.mjs";
import { existsSync} from "node:fs";
import {spawn} from "node:child_process";
const validMapPattern = /\.js\.map$/i;
export async function sourceMap(input, output) {
    const validLinksList = inputChecker(input)
    const outputPath = outputChecker(output);
    await downloadSources(validLinksList)
}
async function downloadSources(validLinksList) {
    const goPath = await getGoPath() 
    const sourcemapperPath = path.join(goPath, 'sourcemapper')
    for(const link in validLinksList) {
        const p = link.split(".js")[0]
        fs.mkdirSync(p)
        spawn(sourcemapperPath, [`-url ${link}` , `-output ${p}`]);
    }
}
function inputChecker(input) {
    const validLinks = []
    if(!fs.existsSync(input)){
        console.error(errorChalk('can not find input file'))
    }
    if(!['txt'].includes(input.split(".")[input.split(".").length - 1])){
        console.error(errorChalk('invalid file type txt is supported for now'))
    }
    const content = fs.readFileSync(input , {encoding:'utf-8'}).toString()
    for (const link of content.split('\n')) {
        const trimmedLink = link.trim();
        if (!validMapPattern.test(trimmedLink)) {
            console.log(chalk.red(`\n Invalid map source: ${trimmedLink} \n`));
        }else{
            validLinks.push(trimmedLink)
        }
    }
    return validLinks
}

function outputChecker(output) {
    let outputPath = path.join(__dirname , '..' , output)
    if(existsSync(outputPath)){
        // outputPath = `${outputPath}${Math.floor((Math.random() * 1000 - 1) + 1)}`
    }
    // fs.mkdirSync(outputPath)
    return outputPath
}

// TODO: add ability and flag to use fom to seartch for all js files in dom and download them all
