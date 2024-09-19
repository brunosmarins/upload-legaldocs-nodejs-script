import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { getFileInfoFromName } from '../file_upload/file_info';
import { readFileToBase64 } from '../file_upload/file_reader';

// Function to create a legal document record
export const createLegalDoc = async (url: string, headers: any, fileName: string): Promise<string | undefined> => {
  const { type, location, language } = getFileInfoFromName(fileName);
  const startDate = new Date();  
  const endDate = new Date();
  endDate.setFullYear(startDate.getFullYear() + 1);

  try {
    const createLegalDocUrl = url;
    const response = await axios.post(
      createLegalDocUrl,
      {
        title: fileName,
        description: 'Legal Document',
        type,
        location,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        language
      },
      { headers }
    );

    console.log(`Document created with success id: ${response.data.id}`);    

    return response.data.id;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error creating document for file ${fileName}:`, error.message);        
    } else {
      console.error(`Unknown error creating document for file ${fileName}:`, error);
    }
  }
};

// Function to upload the PDF file content to the created document
export const uploadLegalDocFile = async (url: string, headers: any, legalDocId: string, base64File: string): Promise<void> => {
  try {
    const uploadUrl = `${url}/${legalDocId}/document`;
    
    await axios.post(
      uploadUrl,
      {
        file: base64File,
      },
      { headers }
    );

    console.log(`Upload of the file to document ${legalDocId} was successful`);

  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error uploading file to document ${legalDocId}:`, error.message);
    } else {
      console.error(`Unknown error uploading file to document ${legalDocId}:`, error);
    }
  }
};

// Main function to process and upload PDF files
export const uploadFile = async (url: string, folder: string, token: string): Promise<void> => {
  const HEADERS = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // List all PDF files in the specified folder
  const files = fs.readdirSync(folder).filter(file => file.endsWith('.pdf'));

  for (const file of files) {
    const filePath = path.join(folder, file);
    const base64File = readFileToBase64(filePath);

    const legalDocId = await createLegalDoc(url, HEADERS, file);

    if (legalDocId) {
      await uploadLegalDocFile(url, HEADERS, legalDocId, base64File);
    }
  }
};
