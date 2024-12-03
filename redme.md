# Legal Docs Uploader for Cropwise

This project uploads legal documents (PDF files) to the Cropwise system via its API.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/)
- A valid authentication token from the Cropwise API

## Default Directories

The script uses the following default directories:

- `upload_files/`: Place your PDF files here to be uploaded.
- `processed_files/`: After a successful upload, files are moved here.

These directories are included in the repository using a `.gitkeep` file, while their contents are ignored by Git. This ensures the folders always exist in your project, but uploaded/processed files are not tracked by version control.

### How it works with Git

To keep these folders in the repository but ignore their contents, add the following to your `.gitignore`:

```
upload_files/*
!upload_files/.gitkeep
processed_files/*
!processed_files/.gitkeep
```

And create an empty `.gitkeep` file in each directory:

```bash
touch upload_files/.gitkeep
mkdir -p processed_files && touch processed_files/.gitkeep
```

## Installation

Clone the repository and install dependencies:

```bash
npm ci
```

## Usage

Run the script with the following command, replacing `<token>` with your authentication token, `<url>` with the API endpoint, and `<folder>` with the folder containing your PDF files:

```bash
npx run start -t "<token>" -u "<url>" -f "<folder>"
```

- `-t`, `--token` (required): Your Cropwise API authentication token.
- `-u`, `--url` (optional): The base URL of the legal-docs API. Default: `https://api.staging.base.cropwise.com/v2/legal-docs`
- `-f`, `--folder` (optional): Folder containing PDF files to upload. Default: `./upload_files`

### Example

```bash
npx run start -t "eyJhbGciOiJIUzI1NiIsInR5cCI6..." -u "https://api.staging.base.cropwise.com/v2/legal-docs" -f "./my_pdfs"
```

All PDF files in `./my_pdfs` will be uploaded. After a successful upload, each file is moved to the `./processed_files` folder.

## How to get the token

You must obtain the authentication token using the Cropwise API. Please refer to the official Cropwise documentation for instructions on how to generate your token.

---

If you have questions or want to contribute, feel free to open an issue or pull request.
