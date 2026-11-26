# Portfolio

Personal portfolio website in English (`/en/`) and German (`/de/`), built with [Astro](https://astro.build) as a static site and hosted free on GitHub Pages.

No analytics, cookies, trackers, CDNs or external fonts, so no cookie banner is needed.

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

- **Projects:** 3–5 entries in `projects`. Keep `slug` identical in both files. `images` is a list (the first one is shown on the card, all of them on the detail page; an empty list gives a card without an image). Set `detailPage` to `true` to create `/en/projects/<slug>/`. `publication` is `{ "text", "url" }` or `null`. `smallProjects` are listed under the cards without images or detail pages.
- **Hero:** `focus` is the highlighted box under the bio (each item links to a project's detail page by `slug`), `openTo` is the line under the CV buttons. `highlights` are the key-figure tiles under the hero; use only figures that are on your CV.
- **How I work:** `approach.steps` are the three numbered tiles after the projects.
- **Experience / education:** `end: null` shows "present" / "heute". Newest first. Education `notes` is a list of short lines.
- **Contact:** set `github` to `null` to hide it.
- **Legal notice / Impressum:** `legal` holds your name and email. Do not add a home address or phone number here.
- Section order and layout live in `src/pages/[lang]/index.astro`; colours (one accent, light and dark) at the top of `src/styles/global.css`.

## Replace images and CVs

Files in `public/` are served as-is from the site root.

- **Headshot:** `public/images/headshot.jpg` (portrait photos are cropped to a circle, focused near the top). Set its `alt` text in both JSON files.
- **Project images:** put them in `public/images/` and list them in each project's `images` with `src` and `alt`.
- **CVs:** overwrite `public/cv/Akshay_Ujjani_Narasimhaiah_CV.pdf` and `public/cv/Akshay_Ujjani_Narasimhaiah_Lebenslauf.pdf` with your real PDFs (keep the file names, or change `cv` in the JSON files).
- Images can have any aspect ratio; cards show them uncropped in a 16:9 box.

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
