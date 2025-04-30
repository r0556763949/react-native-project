// curl --request GET \
//      --url 'https://api.render.com/v1/services?includePreviews=true&limit=20' \
//      --header 'accept: application/json' \
//      --header 'authorization: Bearer rnd_qEinOMerl1HCYVBJP8XK2fGf3ODs'
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// API Key שלך
const API_KEY = 'rnd_qEinOMerl1HCYVBJP8XK2fGf3ODs';

// Endpoint GET
app.get('/apps', async (req, res) => {
    try {
        const response = await axios.get('https://api.render.com/v1/services?includePreviews=true&limit=20', {
            headers: {
                'accept': 'application/json',
                'authorization': `Bearer ${API_KEY}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving apps');
    }
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
