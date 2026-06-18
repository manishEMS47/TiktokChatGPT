require('dotenv').config();

// Dispatcher: selects the active TTS provider via the TTS_PROVIDER env var.
// Every provider module exports the same vocaliser(text, respondingTo) -> filePath
// interface, so app.js stays provider-agnostic.
//   elevenlabs (default) -> voiceElevenlabs.js
//   60db                 -> voice60db.js
const provider = (process.env.TTS_PROVIDER || 'elevenlabs').toLowerCase();

const providers = {
    elevenlabs: './voiceElevenlabs.js',
    '60db': './voice60db.js',
    sixtydb: './voice60db.js',
};

const modulePath = providers[provider];

if (!modulePath) {
    throw new Error(
        `Unknown TTS_PROVIDER "${provider}". Use one of: ${Object.keys(providers).join(', ')}`
    );
}

console.log(`TTS provider: ${provider}`);

module.exports = require(modulePath);
