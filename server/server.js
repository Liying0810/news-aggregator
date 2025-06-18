const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import Routes
const articleRoutes = require("./routes/articleRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Route to fetch news articles from NewsAPI
app.get("/api/news", async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        apiKey: process.env.NEWS_API_KEY,
        country: 'us' // Or any other country
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
});

// Use the article routes for data persistence (CRUD operations)
app.use("/api/articles", articleRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

