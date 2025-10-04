Contributing

Thanks for your interest in improving MorseLab! It's a small static site — here's how to contribute.

- Fork the repo and open a pull request.
- Keep changes focused and document any new behavior.
- For UI changes, include screenshots.

Local testing

Serve the project directory with any static server (e.g. Python's http.server) and open `index.html` in a browser.

CI / Deploy

This repository includes a GitHub Actions workflow that deploys the site to the `gh-pages` branch automatically when commits are pushed to `main`. Make sure GitHub Pages is configured to serve from `gh-pages` or use the repository settings to point to the `gh-pages` deployment.
