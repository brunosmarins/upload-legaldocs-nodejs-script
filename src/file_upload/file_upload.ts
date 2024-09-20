import path from 'path';
import fs from 'fs';
import { readFileToBase64 } from './file_reader';
import { createLegalDoc, uploadLegalDocFile } from '../client/api_client';

export const uploadFile = async (
  url: string, 
  token: string, 
  folder: string, 
  processedFolder: string = './processed_files'
): Promise<void> => {
  const HEADERS = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // Ensure the processed folder exists
  if (!fs.existsSync(processedFolder)) {
    fs.mkdirSync(processedFolder, { recursive: true });
  }

  // List all files in the specified folder
  const files = fs.readdirSync(folder).filter(file => file.endsWith('.pdf'));

  for (const file of files) {
    const filePath = path.join(folder, file);
    // Path to move the processed file
    const processedFilePath = path.join(processedFolder, file); 

    try {
      const base64File = readFileToBase64(filePath);      
      const legalDocId = await createLegalDoc(url, HEADERS, file);

      if (legalDocId) {
        await uploadLegalDocFile(url, HEADERS, legalDocId, base64File);
        console.log(`Uploaded PDF for document ID: ${legalDocId}`);
        
        fs.renameSync(filePath, processedFilePath);
        console.log(`Moved ${file} to ${processedFolder}`);
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }

};
