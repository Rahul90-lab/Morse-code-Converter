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

Commands to push to GitHub

If you don't already have a repository on GitHub, create one (e.g. `MorseLab`). Then run the following from this project folder:

```bash
git init
git add .
git commit -m "Initial commit: MorseLab static site"
# replace URL with your repo URL
git remote add origin https://github.com/<your-username>/MorseLab.git
git branch -M main
git push -u origin main
```

Hosting via GitHub Pages

You can host the site for free with GitHub Pages. In your repository settings, enable Pages and select the `main` branch and `/ (root)` folder as the source. The site will be available at `https://<your-username>.github.io/MorseLab/` after a few minutes.

Notes & Next steps

- The converter supports letters, numbers, and common punctuation. Unknown characters are ignored in encoding/decoding.
- I can add a CI deploy workflow (GitHub Actions) to auto-deploy to `gh-pages`, or add a build step if you want bundling.

Enjoy — tell me if you want a custom theme, favicon, or a GitHub Actions workflow to auto-deploy.