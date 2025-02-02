const FAQ = require("../models/faqModel");
const redisClient = require("../config/redis");
const translateText = require("../utils/translate");

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
    await redisClient.setex(cacheKey, 3600, JSON.stringify(translatedFAQs));

    res.json(translatedFAQs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getFAQs };
