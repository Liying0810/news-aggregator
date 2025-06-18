const express = require("express");
const Article = require("../models/Article");
const router = express.Router();

// Save article to favorites
router.post("/save", async (req, res) => {
  const { title, description, url, publishedAt } = req.body;
  try {
    const newArticle = new Article({ title, description, url, publishedAt });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: "Error saving article", error });
  }
});

module.exports = router;