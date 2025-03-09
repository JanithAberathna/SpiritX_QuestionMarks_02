const { uploadToGemini, waitForFilesActive } = require("../utils/googleAI");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const SAMPLE_FILE_PATH = "sample_data.csv";
const SAMPLE_FILE_MIME = "text/csv";

const chatSessions = {};

// Initialize Chat Session
const initChat = async (req, res) => {
  const { initialPrompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(400).json({ error: "API key is required" });

  try {
    if (!fs.existsSync(SAMPLE_FILE_PATH)) {
      return res.status(404).json({ error: `File ${SAMPLE_FILE_PATH} not found` });
    }

    const sessionId = Date.now().toString();
    const file = await uploadToGemini(SAMPLE_FILE_PATH, SAMPLE_FILE_MIME, apiKey);
    const files = await waitForFilesActive([file], apiKey);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
      history: [
        {
          role: "user",
          parts: [
            { fileData: { mimeType: files[0].mimeType, fileUri: files[0].uri } },
            { text: initialPrompt || "give all players name" },
          ],
        },
      ],
    });

    chatSessions[sessionId] = { session: chatSession, files: files, apiKey: apiKey };

    const result = await chatSession.sendMessage(initialPrompt || "give all players name");

    res.json({ sessionId, response: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send Message to Chat Session
const sendMessage = async (req, res) => {
  const { sessionId, message } = req.body;

  if (!sessionId || !chatSessions[sessionId]) {
    return res.status(404).json({ error: "Chat session not found. Please start a new session." });
  }

  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    const chatSession = chatSessions[sessionId].session;
    const result = await chatSession.sendMessage(message);

    res.json({ response: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { initChat, sendMessage };
