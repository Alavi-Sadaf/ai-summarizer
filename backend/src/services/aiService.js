const axios = require('axios');

/**
 * Service to interact with OpenRouter AI
 */
const summarizeNote = async (content) => {
    const apiKey = (process.env.OPENROUTER_API_KEY || '').trim();
    const model = "stepfun/step-3.5-flash:free";

    if (!apiKey || apiKey === 'your_openrouter_api_key_here' || apiKey === '') {
        console.warn('OPENROUTER_API_KEY is not set correctly. Returning placeholder summary.');
        return 'Summary not available: Please provide a valid OpenRouter API Key.';
    }

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: model,
                messages: [
                    {
                        role: "system",
                        content: "You are an AI assistant specialized in summarizing notes. Please provide a concise, clear, and professional summary. IMPORTANT: Do NOT use markdown formatting, bolding, or asterisks (**) in your response. Just provide the plain text summary."
                    },
                    {
                        role: "user",
                        content: `Note Content:\n"${content}"\n\nSummary:`
                    }
                ],
                max_tokens: 500
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': 'http://localhost:3000', // Optional, for OpenRouter rankings
                    'X-Title': 'AI Note Summarizer', // Optional, for OpenRouter rankings
                    'Content-Type': 'application/json'
                }
            }
        );

        const text = response.data.choices[0].message.content;
        return text.replace(/\*\*/g, '').trim();
    } catch (error) {
        console.error('OpenRouter Service Error:', error.response?.data || error.message);
        return 'Failed to generate summary at this time (OpenRouter).';
    }
};

module.exports = {
    summarizeNote,
};
