# Show & Tell Shop (Savana-style search demo)

**One-click Deploy (after you make a GitHub repo from these files):**  
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=REPLACE_WITH_YOUR_GITHUB_REPO_URL&project-name=show-and-tell-shop&repository-name=show-and-tell-shop)

> Tip: Push to GitHub first, then click the button above. Vercel will detect **Vite**, build, and give you a public URL.

## Instant demo (no install)
- Go to https://stackblitz.com → **Create Project → Upload Project** → select this zip.
- It will run in the browser. Click **Share** to get a link.

## Local run
```bash
npm install
npm run dev
```

## Features
- Search, facets (brand), price filter, sort, in-stock toggle
- URL sync (share a search by copying the URL)
- Editable site name (header input)
- **Add Product** (no backend): upload an image (local-only) or paste an image URL; saved to your browser (localStorage)

## Add your own name & logo
- Edit the site name directly in the header input; it also syncs to the URL (`?brand=YourName`)
- Replace `public/logo.svg` with any SVG/PNG (keep the filename or update `<img src="/logo.svg" />` in `src/App.jsx`)

## Deploy to Vercel
1. Create a GitHub repo and push these files.
2. Hit the **Deploy** button at the top, replace the `repository-url` with your repo URL.
3. Accept defaults (Framework: Vite, Build: `npm run build`, Output: `dist`).
4. Your live URL will be ready to share.

---

Made for quick “show-and-tell” demos. No database required.
