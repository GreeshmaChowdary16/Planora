const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/message', auth, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    // If API Key is missing, fall back to mock (for safety during initial setup)
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('YOUR_GEMINI')) {
      console.warn("Gemini API Key missing, using mock response.");
      return useMockResponse(message, res);
    }

    const prompt = `
      You are Planora, an expert AI Project Planning Assistant. 
      The user is asking about a project: "${message}"
      
      Generate a structured JSON response with the following format:
      {
        "text": "A friendly conversational response introducing the plan.",
        "result": {
          "title": "Project Name",
          "stack": ["Tech 1", "Tech 2"],
          "roadmap": [
            {"step": 1, "title": "Phase 1", "desc": "Description"},
            {"step": 2, "title": "Phase 2", "desc": "Description"}
          ],
          "components": ["Hardware/Software Component 1", "Component 2"],
          "procedure": ["Step 1 explanation", "Step 2 explanation"]
        }
      }
      
      Requirements:
      - If it's a hardware project, include specific components and assembly steps.
      - If it's a software project, focus on tech stack and development roadmap.
      - Keep the "text" part encouraging and helpful.
      - ONLY return the JSON object, no markdown formatting.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Parse the JSON from Gemini
      const cleanJson = text.replace(/```json|```/g, "").trim();
      const jsonData = JSON.parse(cleanJson);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON:", text);
      res.json({ 
        text: text, // Fallback to raw text if JSON parsing fails
        result: null 
      });
    }

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: 'Server error during AI processing' });
  }
});

// Helper function for mock responses (same as before)
async function useMockResponse(message, res) {
  const msgLower = message.toLowerCase();
  let responseText = "That sounds like a great project idea! (Mock Response)";
  let resultData = {
    title: "Project Template",
    stack: ["React", "Node.js"],
    roadmap: [{ step: 1, title: "Setup", desc: "Initialize project" }]
  };
  
  if (msgLower.includes('hardware')) {
    resultData.title = "Mock Hardware Project";
    resultData.components = ["Arduino", "Sensors"];
  }
  
  res.json({ text: responseText, result: resultData });
}

module.exports = router;
