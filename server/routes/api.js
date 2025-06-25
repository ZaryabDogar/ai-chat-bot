const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Generate AI response using Google Gemini
router.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('Gemini API key not configured');
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiResponse = response.data.candidates[0].content.parts[0].text;
        res.json({ text: aiResponse });

    } catch (error) {
        console.error('Error generating AI response:', error);
        res.status(500).json({
            error: 'Failed to generate AI response',
            details: error.response?.data || error.message,
        });
    }
});

// Text-to-speech endpoint using Aigurulab API
router.post('/text-to-speech', async (req, res) => {
    try {
        const { text } = req.body;

        if (!process.env.AIGURULAB_APIKEY) {
            throw new Error('Aigurulab API key not configured');
        }

        const response = await axios.post(
            'https://aigurulab.tech/api/text-to-speech',
            {
                input: text,
                voice: "am_adam", // Default voice
            },
            {
                headers: {
                    'x-api-key': process.env.AIGURULAB_APIKEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.data?.audio) {
            throw new Error("Audio generation failed - no audio URL returned");
        }

        // Fetch the audio file from the returned URL
        const audioResponse = await axios.get(response.data.audio, {
            responseType: 'arraybuffer'
        });

        const audioBuffer = Buffer.from(audioResponse.data, 'binary');
        res.set('Content-Type', 'audio/mpeg');
        res.set('Content-Length', audioBuffer.length);
        res.send(audioBuffer);
        // res.send(response.data); // Send the audio data directly

    } catch (error) {
        console.error('Error generating speech:', error);
        res.status(500).json({
            error: 'Failed to generate speech',
            details: error.response?.data || error.message
        });
    }
});

// Health check endpoint
router.post('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = router;