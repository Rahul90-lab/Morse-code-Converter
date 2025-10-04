# MorseLab

MorseLab is a small, responsive static site that converts between text and Morse code (both directions). It auto-detects whether the input is Morse or plain text, supports copying output, playing Morse audio, and has a clean mobile-first UI.

Files

- `index.html` — main page
- `styles.css` — styling
- `script.js` — conversion logic + audio playback

Quick start

1. Open the site locally by double-clicking `index.html` or serving it with a simple static server:

```bash
# using Python 3 (recommended)
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

2. Type or paste text or Morse into the Input box. You can force encode/decode using the mode selector or use Auto-detect.

