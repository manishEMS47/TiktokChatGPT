const fs = require('fs');
const axios = require('axios');
const audioPath = require('./audioPath.js');
require('dotenv').config();

const apiKey = process.env.SIXTYDB_API_KEY;
const voiceID = process.env.SIXTYDB_VOICE_ID;
const outputFormat = process.env.SIXTYDB_OUTPUT_FORMAT || 'mp3';

const ENDPOINT = 'https://api.60db.ai/tts-synthesize';

// Converts text to speech with 60db, saving a complete audio file to disk.
// Mirrors the ElevenLabs vocaliser interface: returns the saved file path
// (relative to the project root) so app.js can play it unchanged.
async function vocaliser(text, respondingTo) {
    const filename = audioPath(respondingTo, outputFormat);

    // 60db caps a single request at 5000 characters.
    const body = {
        text: text.slice(0, 5000),
        voice_id: voiceID,
        output_format: outputFormat,
    };

    // Optional voice tuning, only sent when configured (otherwise 60db defaults apply).
    if (process.env.SIXTYDB_SPEED) body.speed = Number(process.env.SIXTYDB_SPEED);
    if (process.env.SIXTYDB_STABILITY) body.stability = Number(process.env.SIXTYDB_STABILITY);
    if (process.env.SIXTYDB_SIMILARITY) body.similarity = Number(process.env.SIXTYDB_SIMILARITY);

    try {
        const { data } = await axios.post(ENDPOINT, body, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        if (!data || !data.success || !data.audio_base64) {
            const reason = data && data.message ? data.message : 'no audio returned';
            throw new Error(`60db TTS failed: ${reason}`);
        }

        // 60db returns base64-encoded audio rather than raw bytes, so decode before saving.
        fs.writeFileSync(filename, Buffer.from(data.audio_base64, 'base64'));
        console.log(`Success, Audio saved as: ${filename}`);

        return filename;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
}

module.exports = vocaliser;
