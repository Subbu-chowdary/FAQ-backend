const { translate } = require("@vitalets/google-translate-api");

/**
 * Translate text using google-translate-api
 * @param {string} text - The text to translate
 * @param {string} targetLang - The target language code (e.g., 'hi', 'bn', etc.)
 * @returns {Promise<string>} - The translated text
 */
const translateText = async (text, targetLang) => {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Fallback to original text if translation fails
  }
};

module.exports = translateText;
