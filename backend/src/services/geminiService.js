const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the client once at the top level
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'no-key-yet');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Service to interact with Google Gemini AI
 */
const summarizeNote = async (content) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        console.warn('GEMINI_API_KEY is not set or is using the placeholder. Returning placeholder summary.');
        return 'Summary not available: Please provide a valid Gemini API Key.';
    }

    try {
        const prompt = `
      You are an AI assistant specialized in summarizing notes. 
      Please provide a concise, clear, and professional summary of the following note content.
      Focus on the key points and main ideas. 
      
      Note Content:
      "${content}"
      
      Summary:
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text.trim();
    } catch (error) {
        console.error('Gemini Service Error:', error.message);
        // Instead of throwing, we return a fallback message so the note can still be saved
        return 'Failed to generate summary at this time.';
    }
};

module.exports = {
    summarizeNote,
};
