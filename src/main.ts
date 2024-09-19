#!/usr/bin/env node

import { Command } from 'commander';
import { uploadFile } from './file_upload/file_upload';

const program = new Command();

program
  .option('-t, --token <string>', 'Authentication token')
  .option('-f, --folder <string>', 'Folder containing PDF files', './upload_files')
  .option('-u, --url <string>', 'Base URL of the system', 'https://api.staging.base.cropwise.com/v2/legal-docs');

program.parse(process.argv);

const options = program.opts();

uploadFile(options.url, options.token, options.folder);
