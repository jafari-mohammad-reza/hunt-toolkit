#!/usr/bin/env node

import {Command} from "commander";


const program = new Command();
program
    .name('tolkit')
    .description('My list of assets while hunting')
    .version('1.0.0');



program.parse();
