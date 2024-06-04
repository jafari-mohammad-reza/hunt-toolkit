import path from "node:path";
import {getGoPath} from "./path_utils.mjs";
import chalk from 'chalk';
import {errorChalk} from "./text.mjs";
import { existsSync, mkdirSync, readFileSync} from "node:fs";
import {spawn} from "node:child_process";
import { installSourceMapper } from "./pre_installation.mjs";
const __dirname = import.meta.dirname;

const validMapPattern = /\.js\.map$/i;
export async function sourceMap(input, output) {
    await installSourceMapper()
    const validLinksList = inputChecker(input)
    const outputPath = outputChecker(output);
    await downloadSources(validLinksList , outputPath)
}
async function downloadSources(validLinksList , outputPath) {
    const goPath = await getGoPath() 
    const sourcemapperPath = path.join(goPath, 'sourcemapper')
    console.log('validLinksList :>> ', validLinksList);
    for(const link of validLinksList) {
        console.log('link :>> ', link);
        const jsFile = link.split(".js")[0]
        console.log('jsFile :>> ', jsFile);
        const jsFileSavePath =path.join(outputPath , jsFile).split(":/")[1].replace(/\//g, "_")
        console.log("jsFileSavePath" , jsFileSavePath)
        mkdirSync(jsFileSavePath)
        spawn(sourcemapperPath, [`-url ${link.trim()}` , `-output ${jsFileSavePath.trim()}`]);
    }
}
function inputChecker(input) {
    const validLinks = []
    if(!existsSync(input)){
        console.error(errorChalk('can not find input file'))
    }
    if(!['txt'].includes(input.split(".")[input.split(".").length - 1])){
        console.error(errorChalk('invalid file type txt is supported for now'))
    }
    const content = readFileSync(input , {encoding:'utf-8'}).toString()
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
        outputPath = `${outputPath}${Math.floor((Math.random() * 1000 - 1) + 1)}`
    }
    mkdirSync(outputPath)
    return outputPath
}

// TODO: add ability and flag to use fom to seartch for all js files in dom and download them all
