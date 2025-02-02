const redis = require("../config/redis");

const CACHE_EXPIRY = 86400; // 24 hours

const getCache = async (key) => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Redis GET error:", err);
    return null;
  }
};

const setCache = async (key, value) => {
  try {
    await redis.set(key, JSON.stringify(value), "EX", CACHE_EXPIRY);
  } catch (err) {
    console.error("Redis SET error:", err);
  }
};

module.exports = { getCache, setCache };
