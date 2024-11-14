
// const axios = require('axios');
// const OpenAI = require('openai');  // to use openAI import

// // Set up OpenAI API configuration
// const openai = new OpenAI({
//     apiKey : process.env.openai_api_key
// });


// // Step 1: Web search function using SerpApi
// async function webSearch(query) {
//   const params = {
//     engine: 'google',
//     q: query,
//     api_key: process.env.serpapi_api_key
//   };

//   try {
//     const response = await axios.get('https://serpapi.com/search', { params });
    
//     // Check if organic_results exist
//     if (response.data && response.data.organic_results) {
//       return response.data.organic_results;
//     } else {
//       console.error('No organic results found in the response.');
//       return [];
//     }
    
//   } catch (error) {
//     console.error('Error fetching search results:', error);
//     return [];
//   }
// }

// // Step 2: Process search results with DeepAI
// async function generateSummaryFromSearch(query) {
//   const searchResults = await webSearch(query);

//   // Extract text content from the top search results
//   const content = searchResults.slice(0, 5).map(result => result.snippet).join('\n');
//   console.log("Search Content:", content);

//   try {
//     // Pass content to OpenAI for processing
//     const response = await openai.chat.completions.create({
//       model: 'gpt-4',
//       messages: [
//         { role: 'system', content: 'You are an assistant that summarizes information.' },
//         { role: 'user', content: `Summarize the following information about '${query}': ${content}` }
//       ],
//       max_tokens: 150
//     });

//     return response.choices[0].message.content
//   } catch (error) {
//     console.error('Error generating summary:', error);
//     return 'Unable to generate summary.';
//   }
// }

// // Example usage
// const reminder = (req , res) => {
//   generateSummaryFromSearch(req.query.promptContent)
//   .then(summary => res.status(200).json({
//     status : "success",
//     message : summary
//   }))
//   .catch(error => res.status(error.status).json({
//     status : "failure",
//     message : "An error occurred while processing the request"
//   }));
// }

// module.exports = { reminder };