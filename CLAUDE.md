# Itzik Bitran portfolio site

Static website (plain HTML, CSS and JS, no build step) for Itzik Bitran, Head of Design. Hosted on GitHub Pages.

## Structure

- `index.html`: home page, built from the Figma frame (hero, collage, Works cards, About, Contact).
- `styleguide/index.html`: live style guide rendered from `site.css`.
- `projects/<slug>/index.html`: one folder per case study, in the short story format (four pages: franklin, thetaray, dreamworks, sixgill). `projects/franklin/long.html` and `projects/thetaray/long.html` are the earlier long versions, kept in case Itzik wants to go back.
- `assets/short format/`: the draft from the Claude chat the story pages were adapted from. Reference only, git-ignored, not published.
- `assets/css/site.css`: the shared styles and design tokens for every page. Never put page-specific `<style>` blocks in pages; add classes here.
- `assets/js/site.js`: shared behaviour (sticky bar, hero dissolve, wave gradient, compare slider, lightbox). Each block exits if its element is missing.
- `assets/img/<slug>/`: web-ready images per project (Itzik's large originals go in `assets/img/<slug>/originals/`, which git ignores); `assets/img/home/`: home collage pieces and the project card photos (`card-<slug>.webp`), used on the home page and in Related work. `assets/img/projects/` is no longer used.
- `docs/design-system.md`: the full design rules. Read it before any visual change.
- `404.html` (links start from `/`), `robots.txt`, `favicon.ico` + `assets/icons/` (ZIK icon), `assets/share/` (1200×630 link-preview images). Every page carries icon and Open Graph tags; once the final domain is known, `og:image` must become a full https address for LinkedIn and WhatsApp previews.

Links are relative (`../../assets/...` from a project page) so the site works on GitHub Pages and when opened locally.

## Design system

The source of truth is the Bitran Portfolio design system (Claude artifact: https://claude.ai/artifact/69Bo1Wu7V9hQ36DZDDuGe1) mirrored in `docs/design-system.md` and `assets/css/site.css`. Rules that are easy to break:

- White page background. Sections are set apart only by full-width `band gray` or `band blue` bands. No textures, no dotted backgrounds.
- One blue `--accent` (#2F4FF0). The only exception is the home About band: dark background with lime (`--lime`) highlights, from Itzik's Figma. Sora for headlines and numbers, Geist for text, Geist Mono for small uppercase labels. No serif, no italic accent words in headlines.
- Swiss grid: numbered index rail (`.grid > aside.idx + .body`), rules instead of boxed cards.
- Images: real screenshots and photos (Itzik's own generated scenes with real screens composited in are fine), 3px corners (8px for persona portraits, 10px for home cards), no borders, no shadows, no gray mats, no captions under images. The home collage is the one exception for borders and shadows.
- Every page uses the same sticky site bar: ZIK wordmark, Works | About, solid white once scrolled.
- Every case study opens with a question headline in accent and four fact pills: Role, Industry, Product, Service (values only).
- Motion respects `prefers-reduced-motion`.
- Light only: the site never switches to dark colors, even when the visitor's system is in dark mode (every page has `<meta name="color-scheme" content="light">`).

## Projects

Four case studies, in this order: Franklin, ThetaRay, Dreamplace app (DreamWorks, slug `dreamworks`), Sixgill.

## Writing rules

- No em dashes anywhere. Use commas, colons, parentheses or a new sentence.
- Itzik's title is always "Head of Design", never "Design Lead".
- First person, plain, short sentences. No hype, no emoji.
- Never invent metrics or claims. Ask Itzik when a fact is missing.
- Credit accurately (e.g. the Franklin mascot: a professional illustrator drew the original character, Itzik art-directed it and designed the variations).

## When making changes

- When Itzik approves a new visual pattern, add it to `site.css` and to `docs/design-system.md`, then apply it to every existing page so pages stay aligned.
- Preview locally with `python3 .claude/serve.py` (a no-cache server, so edits always show on reload) and open http://localhost:8000.
- Check desktop and phone width (400px) before committing.
- When you replace an image file but keep its name, add or bump `?v=N` on every `src` that uses it, so browsers that saved the old file load the new one.
