const dotenv = require('dotenv');

dotenv.config();

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key']; // Ambil API Key dari header

  // Validasi API Key
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
  }

  next(); // Lanjut ke endpoint jika API Key valid
};

module.exports = apiKeyMiddleware;