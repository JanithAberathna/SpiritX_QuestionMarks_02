const { GoogleAIFileManager } = require("@google/generative-ai/server");

// Upload File to Gemini
const uploadToGemini = async (path, mimeType, apiKey) => {
  try {
    const fileManager = new GoogleAIFileManager(apiKey);
    const uploadResult = await fileManager.uploadFile(path, { mimeType, displayName: path });
    return uploadResult.file;
  } catch (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

// Wait for File Processing
const waitForFilesActive = async (files, apiKey) => {
  try {
    const fileManager = new GoogleAIFileManager(apiKey);
    for (const name of files.map((file) => file.name)) {
      let file = await fileManager.getFile(name);
      let attempts = 0;
      while (file.state === "PROCESSING" && attempts < 12) {
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        file = await fileManager.getFile(name);
        attempts++;
      }
      if (file.state !== "ACTIVE") {
        throw Error(`File ${file.name} failed to process (status: ${file.state})`);
      }
    }
    return files;
  } catch (error) {
    throw new Error(`Failed to process files: ${error.message}`);
  }
};

module.exports = { uploadToGemini, waitForFilesActive };
