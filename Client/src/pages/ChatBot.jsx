import React from "react";

const StartChatbot = () => {
  const handleStart = () => {
    window.location.href = "http://localhost:3001/bot"; // Redirect to chatbot
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handleStart}
        className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Start Chatbot
      </button>
    </div>
  );
};

export default StartChatbot;
