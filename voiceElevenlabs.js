const voice = require('elevenlabs-node');
const audioPath = require('./audioPath.js');
require('dotenv').config();

const apiKey = process.env.ELEVEN_API_KEY;
const voiceID = process.env.ELEVEN_VOICE_ID;

// Converts text to speech with ElevenLabs, saving a complete mp3 to disk.
// Returns the saved file path (relative to the project root) for playback.
async function vocaliser(text, respondingTo) {
    const filename = audioPath(respondingTo, 'mp3');

    try {
        await voice.textToSpeech(apiKey, voiceID, filename, text).then(res => {
            console.log(`Success, Audio saved as: ${filename}`);
        });

        return filename;
    } catch (error) {
        console.error(error);
    }
}

module.exports = vocaliser;
