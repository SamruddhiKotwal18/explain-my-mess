const axios = require('axios');
const FormData = require('form-data');

async function testApi() {
    try {
        const form = new FormData();
        form.append('text', 'Hello, this is a test message to veriy the backend.');

        console.log('Sending request to http://localhost:3000/api/explain...');

        const response = await axios.post('http://localhost:3000/api/explain', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        console.log('Response status:', response.status);
        console.log('Response data:', JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('Test failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testApi();
