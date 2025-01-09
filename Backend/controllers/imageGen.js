const axios = require('axios');

async function generateAIImage(prompt) {
  try {
    const response = await axios.post('https://api.openai', {
      prompt: prompt,
      n: 1,
      size: '1024x1024'
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    return response.data.data[0].url;
  } catch (err) {
    throw new Error('AI image generation failed');
  }
}
