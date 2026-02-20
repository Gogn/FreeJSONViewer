# JSON Viewer

A clean, fast, browser-based JSON viewer. Paste your JSON, explore it — no servers, no accounts, no nonsense.

**[Try it live →](https://github.com/Gogn/FreeJSONViewer/)**

---

## What it does

| Feature | Details |
|---|---|
| **Raw Text tab** | Paste or type JSON with syntax error highlighting |
| **Tree Viewer tab** | Explore nested objects and arrays interactively |
| **Format / Minify** | One-click pretty-print or compact your JSON |
| **Search** | Filter keys and values across the whole tree |
| **JSON path** | Click any node to see its full path (e.g. `$.users[0].name`) |
| **Copy path** | Copy the JSON path of any selected node |
| **Expand / Collapse** | Toggle individual nodes or all at once |
| **Dark / Light mode** | Saved automatically |
| **Error modes** | Choose how errors are shown: disabled tab, inline, banner, or both |

Everything runs in your browser. Nothing is sent anywhere.

---

## Getting started

### Use it online

Just open the live URL above. No installation needed.

### Run locally

```bash
# 1. Clone the repo
git clone ...
cd JsonParser

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

---

## Development

```bash
npm run dev           # Start dev server
npm run build         # Production build → dist/
npm run lint          # Run ESLint
npm run format        # Auto-format with Prettier
```

**Stack:** React 18 + TypeScript 5 + Vite 5. No UI libraries. No backend.

---

## Deployment

The app deploys automatically to GitHub Pages on every push to `main` via GitHub Actions. No manual steps needed.

---

## Support

JSON Viewer is free and open-source. If it saves you time, consider supporting its development:

**[Support via PayPal](https://www.paypal.com/donate/?hosted_button_id=6KRWD89H62NMU)**

Any amount is appreciated and helps keep the project active.

---

## License

GNU GPL-3.0
