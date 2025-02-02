const FAQ = require("../models/faqModel");
const redisClient = require("../config/redis");
const translateText = require("../utils/translate");

// GET FAQs
const getFAQs = async (req, res) => {
  const { lang = "en" } = req.query;

  try {
    // Check cache first
    const cacheKey = `faqs_${lang}`;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // Fetch FAQs from DB
    const faqs = await FAQ.find({});
    const translatedFAQs = await Promise.all(
      faqs.map(async (faq) => ({
        _id: faq._id,
        question:
          lang === "en"
            ? faq.question
            : await translateText(faq.question, lang),
        answer:
          lang === "en" ? faq.answer : await translateText(faq.answer, lang),
        originalLanguage: faq.language,
      }))
    );

    // Store in cache for 1 hour
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(translatedFAQs));

    res.json({ success: true, data: translatedFAQs });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST (Create) FAQ
const createFAQ = async (req, res) => {
  const { question, answer, language = "en" } = req.body;

  if (!question || !answer) {
    return res
      .status(400)
      .json({ success: false, error: "Question and Answer are required." });
  }

  try {
    // Check if FAQ already exists
    const existingFAQ = await FAQ.findOne({ question, answer });
    if (existingFAQ) {
      return res.status(200).json({
        success: true,
        message: "FAQ already exists.",
        data: existingFAQ,
      });
    }

    // Create new FAQ
    const newFAQ = new FAQ({ question, answer, language });
    const savedFAQ = await newFAQ.save();

    await redisClient.flushAll(); // Clear cache to update new data

    res.status(201).json({
      success: true,
      message: "FAQ created successfully.",
      data: savedFAQ,
    });
  } catch (error) {
    console.error("Error creating FAQ:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getFAQs, createFAQ };
