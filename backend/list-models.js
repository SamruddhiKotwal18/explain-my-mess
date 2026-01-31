const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

async function listModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("No API KEY");
        return;
    }

    try {
        console.log("Fetching models...");
        const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);

        console.log("Available Models:");
        response.data.models.forEach(m => {
            console.log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`);
        });

    } catch (error) {
        if (error.response) {
            console.error("Error listing models:", error.response.status, error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }
}

listModels();
