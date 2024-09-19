#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const api_client_1 = require("./client/api_client");
const program = new commander_1.Command();
program
    .option('-t, --token <string>', 'Authentication token')
    .option('-f, --folder <string>', 'Folder containing PDF files', './upload_files')
    .option('-u, --url <string>', 'Base URL of the system', 'https://api.staging.base.cropwise.com/v2/legal-docs');
program.parse(process.argv);
const options = program.opts();
(0, api_client_1.uploadFile)(options.url, options.folder, options.token);
