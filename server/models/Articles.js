const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  publishedAt: Date,
});

module.exports = mongoose.model("Article", articleSchema);
