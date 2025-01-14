const axios = require('axios');
require('dotenv').config();

async function generateAIImage(prompt) {
  try {
    console.log("fun for img gen calling with this prompt :-", prompt);
    console.log("OPENAI TOKEN ", process.env.OPENAI_API_KEY)

    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: `create image about ${prompt} with size 1024x1024`,
        n: 1,
        size: '1024x1024'
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.data[0].url;
  } catch (err) {
    console.error('Error response:', err.response?.data || err.message);
    throw new Error(`AI image generation failed: ${err.response?.data?.error?.message || err.message}`);
  }
}

module.exports = generateAIImage;