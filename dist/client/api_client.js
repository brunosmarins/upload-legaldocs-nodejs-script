"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.uploadLegalDocFile = exports.createLegalDoc = void 0;
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const file_info_1 = require("../file_upload/file_info");
const file_reader_1 = require("../file_upload/file_reader");
// Function to create a legal document record
const createLegalDoc = (url, headers, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, location, language } = (0, file_info_1.getFileInfoFromName)(fileName);
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + 1);
    try {
        const createLegalDocUrl = url;
        const response = yield axios_1.default.post(createLegalDocUrl, {
            title: fileName,
            description: 'Legal Document',
            type,
            location,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            language
        }, { headers });
        console.log(`Document created with success id: ${response.data.id}`);
        return response.data.id;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error creating document for file ${fileName}:`, error.message);
            console.error(error);
        }
        else {
            console.error(`Unknown error creating document for file ${fileName}:`, error);
        }
    }
});
exports.createLegalDoc = createLegalDoc;
// Function to upload the PDF file content to the created document
const uploadLegalDocFile = (url, headers, legalDocId, base64File) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadUrl = `${url}/${legalDocId}/document`;
        console.log(`upload file url: ${uploadUrl}`);
        console.log(`base 64 file: ${base64File}`);
        yield axios_1.default.post(uploadUrl, {
            file: base64File,
        }, { headers });
        console.log(`Upload of the file to document ${legalDocId} was successful`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error uploading file to document ${legalDocId}:`, error.message);
        }
        else {
            console.error(`Unknown error uploading file to document ${legalDocId}:`, error);
        }
    }
});
exports.uploadLegalDocFile = uploadLegalDocFile;
// Main function to process and upload PDF files
const uploadFile = (url, folder, token) => __awaiter(void 0, void 0, void 0, function* () {
    const HEADERS = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    // List all PDF files in the specified folder
    const files = fs_1.default.readdirSync(folder).filter(file => file.endsWith('.docx'));
    for (const file of files) {
        const filePath = path_1.default.join(folder, file);
        const base64File = (0, file_reader_1.readFileToBase64)(filePath);
        const legalDocId = yield (0, exports.createLegalDoc)(url, HEADERS, file);
        if (legalDocId) {
            yield (0, exports.uploadLegalDocFile)(url, HEADERS, legalDocId, base64File);
        }
    }
});
exports.uploadFile = uploadFile;
