const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');


require("dotenv").config();
// const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const port = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Import Routes
const chatRoutes = require("./routes/chatbot");

// Use Routes
app.use("/chat", chatRoutes);
const playerRoutes = require('./routes/PlayerRoutes.js')
app.use('/',playerRoutes);
// Serve Home Page
app.get("/bot", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ensure MONGO_URI is available
if (!process.env.MONGO_URI) {
  console.error('MongoDB URI is missing. Please check your .env file.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1); 
});

// Routes
app.use('/', require('./routes/authRoute'));
app.use('/api', require('./routes/protectedRoutes.js')); // Added .js extension
app.use('/chatbot',require("./routes/chatbot.js"))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

// Start server
// const port = process.env.PORT || 8000;
// app.listen(port, () => console.log(`Server is running on port ${port}`));


// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});