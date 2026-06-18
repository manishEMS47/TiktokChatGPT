// Builds the per-response audio file path shared by every TTS provider,
// e.g. audio/<user>--2026-06-18.mp3
// Date is shifted +3h to localise to UTC+3 (matches the convention in logger.js).
function audioPath(respondingTo, ext = 'mp3') {
  const date = new Date(new Date().getTime() + (3 * 60 * 60 * 1000))
    .toISOString()
    .slice(0, 10);

  return `audio/${respondingTo}--${date}.${ext}`;
}

module.exports = audioPath;
