<p align="center">
  <p align="center">
    <img width="100px" src="./docs/images/tiktok.png" align="center" alt="TikTok" />
    <img width="100px" src="./docs/images/openai.svg" align="center" alt="TikTok" />
  </p>
 <h2 align="center">TiktokChatGPT</h2>
 <p align="center">A conversational bot for tiktok livestreams built on ChatGPT.</p>
</p>
  <p align="center">
    <a>
      <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
    </a>
  </p>

  <p align="center">
    <a href="https://github.com/FelixWaweru/TiktokChatGPT/issues/new/choose">Report Bug</a>
    ·
    <a href="https://github.com/FelixWaweru/TiktokChatGPT/issues/new/choose">Request Feature</a>
  </p>
</p>

<p align="center">Love the project? Please consider <a href="https://ko-fi.com/whyweru">donating</a> to help it improve!</p>

## Getting Started
To run this code you require an API key from OpenAI and **one** text-to-speech (TTS) provider — either **ElevenLabs** or **60db**. The TTS provider is selectable at runtime, so you only need credentials for the one you intend to use.

### OpenAI API Key
- Sign up [here](https://platform.openai.com/signup) for a free account.

### TTS Provider
The bot speaks its responses through a pluggable TTS layer. Pick a provider with the `TTS_PROVIDER` environment variable:

| `TTS_PROVIDER` | Provider | Required keys |
| -------------- | -------- | ------------- |
| `elevenlabs` (default) | [ElevenLabs](https://beta.elevenlabs.io/sign-up) | `ELEVEN_API_KEY`, `ELEVEN_VOICE_ID` |
| `60db` | [60db](https://60db.ai) | `SIXTYDB_API_KEY`, `SIXTYDB_VOICE_ID` |

- **ElevenLabs** — sign up [here](https://beta.elevenlabs.io/sign-up) for a free account.
- **60db** — sign up at [60db.ai](https://60db.ai) for an API key. Your `SIXTYDB_VOICE_ID` is a UUID retrieved from the [`/myvoices`](https://docs.60db.ai/api-reference/voices/get-my-voices) endpoint (leave blank to use 60db's default voice).

### Config
- First, in the `.env.example` file: set `TTS_PROVIDER`, add your OpenAI key, add the keys for your chosen TTS provider, and set the name of the TikTok account that's livestreaming.


- Next, rename the `.env.example` file to `.env`


- Finally, to run the project, run:

```bash
mkdir audio
# then
mkdir logs
# then
npm install
# then
npm start
```

## Setup

```bash    
TiktokChatGPT
├── docs         # Documentation
│   ├── images
│   └── CONTRIBUTING.md
├── audio        # Response audio file store
│   └── example.mp3
├── logs         # Log file store
│   └── access.log
├── app.js              # Tiktok livestream responder
├── gpt.js              # OpenAI prompt and response function
├── voice.js            # TTS dispatcher (selects provider via TTS_PROVIDER)
├── voiceElevenlabs.js  # ElevenLabs vocal response provider
├── voice60db.js        # 60db vocal response provider
├── audioPath.js        # Shared audio file-path builder
├── logger.js           # Logging function
├── .env                # Credentials and environment variables
├── package.json
├── README.md
```

### TTS Provider Architecture
Every provider module exposes the same interface — `vocaliser(text, respondingTo)` returns the path to a saved audio file — so the rest of the app is provider-agnostic.

```
app.js  ──text──►  voice.js (dispatcher)  ──►  voiceElevenlabs.js ──┐
                        │ TTS_PROVIDER                              ├──►  audio/*.mp3  ──►  sound-play
                        └──────────────────►  voice60db.js ────────┘
```

Switch providers at any time by changing `TTS_PROVIDER` in `.env` (`elevenlabs` or `60db`) — no code changes required.

#### Optional 60db voice tuning
When `TTS_PROVIDER=60db`, these optional `.env` variables fine-tune the voice (unset = 60db defaults):

| Variable | Range | Purpose |
| -------- | ----- | ------- |
| `SIXTYDB_OUTPUT_FORMAT` | `mp3`, `wav`, `ogg`, `flac` | Output audio format (default `mp3`) |
| `SIXTYDB_SPEED` | `0.5`–`2.0` | Speech rate |
| `SIXTYDB_STABILITY` | `0`–`100` | Lower = more expressive |
| `SIXTYDB_SIMILARITY` | `0`–`100` | Voice matching strength |

## Contribution
Contributions are welcome. Checkout the [CONTRIBUTING.md](https://github.com/FelixWaweru/TiktokChatGPT/tree/main/docs/CONTRIBUTING.md) to learn more.