import fs from 'fs';

export const readFileToBase64 = (filePath: string): string => {
  const buffer = fs.readFileSync(filePath);
  return buffer.toString('base64');
};
