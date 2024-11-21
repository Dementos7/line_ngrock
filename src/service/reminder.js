
const axios = require('axios');
const OpenAI = require('openai');  // to use openAI import
const dotenv = require('dotenv');
dotenv.config();

// Set up OpenAI API configuration
const openai_key = process.env.openai_api_key;
const serpapi_key = process.env.serpapi_api_key;

const openai = new OpenAI({
    apiKey : openai_key
});


// Step 1: Web search function using SerpApi
const webSearch = async (query) => {
  const params = {
    engine: 'google',
    q: query,
    api_key: serpapi_key
  };

  try {
    const response = await axios.get('https://serpapi.com/search', { params });
    
    // Check if organic_results exist
    if (response.data && response.data.organic_results) {
      return response.data.organic_results;
    } else {
      console.error('No organic results found in the response.');
      return [];
    }
    
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}

// Step 2: Process search results with DeepAI
const generateSummaryFromSearch = async (query) => {
  const searchResults = await webSearch(query);

  // Extract text content from the top search results
  const content = searchResults.slice(0, 5).map(result => result.snippet).join('\n');
  console.log("Search Content:", content);

  try {
    // Pass content to OpenAI for processing
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an assistant and give me information for question using the information I give you' },
        { role: 'user', content: `Summarize the following information about '${query}': ${content}` }
      ],
      max_tokens: 150
    });

    return response.choices[0].message.content
  } catch (error) {
    console.error('Error generating summary:', error);
    return 'Unable to generate summary.';
  }
}

// Example usage
const reminder = async (message) => {
  const responsText = await generateSummaryFromSearch(message);
  console.log("response reminder", responsText);
  return responsText;
};

module.exports = reminder;