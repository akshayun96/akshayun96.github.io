# Portfolio

Personal portfolio website in English (`/en/`) and German (`/de/`), built with [Astro](https://astro.build) as a static site and hosted free on GitHub Pages.

No analytics, cookies, trackers, CDNs or external fonts, so no cookie banner is needed.

All content is currently `[PLACEHOLDER]` / `[PLATZHALTER]` text. Search for `PLACEHOLDER` and `PLATZHALTER` to find everything that still needs replacing.

## Run locally

Needs Node.js 22 or newer.

```powershell
npm install
npm run dev
```

Open http://localhost:4321/ (it redirects to `/en/`). `npm run build` creates the finished site in `dist/`, and `npm run preview` serves that build.

## Edit content

All text lives in two files with the **same structure**:

- `src/data/content.en.json`: English
- `src/data/content.de.json`: German

Change text there, not in the components. `npm run build` first runs `scripts/check-content.mjs`, which stops the build if the two files drift apart (missing keys, different number of projects or jobs, different project slugs).

Notes:

- **Projects:** 3–5 entries in `projects`. Keep `slug` identical in both files. Set `detail` to `null` for no detail page, or to a list of paragraphs to create `/en/projects/<slug>/`.
- **Experience / education:** `end: null` shows "present" / "heute". Newest first.
- **Contact:** set `github` to `null` to hide it.
- **Legal notice / Impressum:** `legal` holds your name and email. Do not add a home address or phone number here.
- Section order and layout live in `src/pages/[lang]/index.astro`; colours (one accent, light and dark) at the top of `src/styles/global.css`.

## Replace images and CVs

Files in `public/` are served as-is from the site root.

- **Headshot:** put a square photo (at least 480×480 px, JPG or WebP) at `public/images/headshot.jpg`, then set `hero.headshot.src` to `/images/headshot.jpg` and write a real `alt` text in both JSON files.
- **Project images:** 16:9 images (e.g. 1280×720) in `public/images/`, then set each project's `image.src` and `image.alt`.
- **CVs:** overwrite `public/cv/CV_EN.pdf` and `public/cv/CV_DE.pdf` with your real PDFs (keep the file names, or change `cv` in the JSON files).
- Delete the `*-placeholder.svg` files once nothing uses them.

## Publish on GitHub Pages

The site is served at `https://akshayun96.github.io/`. For that address the repository **must** be named exactly `akshayun96.github.io`.

1. `astro.config.mjs` already has `site` set to `https://akshayun96.github.io` (change it there if your username changes).
2. On GitHub, create a new repository named `akshayun96.github.io` (Public, no README, no .gitignore, no licence, so it is empty). Note: on a free account, GitHub Pages needs a public repository, so everything in this folder becomes public. Never copy private files (e.g. your job-applications folder) in here.
3. Push this folder:

   ```powershell
   git remote add origin https://github.com/akshayun96/akshayun96.github.io.git
   ```

   ```powershell
   git branch -M main
   ```

   ```powershell
   git push -u origin main
   ```

4. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. Open the **Actions** tab. The "Deploy to GitHub Pages" workflow runs on every push to `main` (re-run it once if the first run started before step 4). After it finishes, the site is live at `https://akshayun96.github.io/`.

Every later `git push` to `main` redeploys the site automatically (`.github/workflows/deploy.yml`, using the official `withastro/action`).
