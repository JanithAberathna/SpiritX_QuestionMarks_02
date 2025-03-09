const express = require("express");
const { initChat, sendMessage } = require("../controllers/chatController");

const router = express.Router();

router.post("/init", initChat);
router.post("/message", sendMessage);

module.exports = router;
