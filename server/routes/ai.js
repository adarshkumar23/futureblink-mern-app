const express = require("express");
const router = express.Router();
const axios = require("axios");
const Prompt = require("../models/Prompt");

// POST /api/ask-ai
router.post("/ask-ai", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-3n-e4b-it:free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    res.json({ response: aiResponse });

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST /api/save
router.post("/save", async (req, res) => {
  const { prompt, response } = req.body;

  try {
    const saved = await Prompt.create({ prompt, response });
    res.json({ success: true, data: saved });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to save" });
  }
});
router.get("/history", async (req, res) => {
  try {
    const history = await Prompt.find().sort({ createdAt: -1 }).limit(20);
    res.json({ history });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;