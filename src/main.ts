#!/usr/bin/env node

import { Command } from 'commander';
import { uploadFile } from './client/api_client';

const program = new Command();

program
  .option('-t, --token <string>', 'Authentication token')
  .option('-f, --folder <string>', 'Folder containing PDF files', './upload_files')
  .option('-u, --url <string>', 'Base URL of the system', 'https://api.staging.base.cropwise.com/v2/legal-docs');

program.parse(process.argv);

const options = program.opts();

uploadFile(options.url, options.folder, options.token);
