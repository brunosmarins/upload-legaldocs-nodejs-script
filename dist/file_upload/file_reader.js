"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileToBase64 = void 0;
const fs_1 = __importDefault(require("fs"));
const readFileToBase64 = (filePath) => {
    const buffer = fs_1.default.readFileSync(filePath);
    return buffer.toString('base64');
};
exports.readFileToBase64 = readFileToBase64;
