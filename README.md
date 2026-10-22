# Itzik Bitran portfolio

Personal portfolio website of Itzik Bitran, Head of Design: a home page and four case studies (Franklin, ThetaRay, Dreamplace app, Sixgill). Plain HTML, CSS and JavaScript, no build step, hosted on GitHub Pages.

## Preview locally

```bash
python3 .claude/serve.py
```

Then open http://localhost:8000. This server tells the browser not to cache, so edits always show on reload.

## What's where

- `index.html`: home page (hero with the screenshot collage, Works, About).
- `projects/<slug>/index.html`: the four case studies, in the short story format. `long.html` files are earlier long versions, kept locally and not published.
- `assets/css/site.css`, `assets/js/site.js`: shared styles and behaviour for every page.
- `assets/img/`: images per project, `home/` for the home page and project cards, `about/` for the About section.
- `assets/share/`: link-preview images (1200 × 630) for LinkedIn, WhatsApp and Slack.
- `assets/icons/`, `favicon.ico`: the ZIK tab and app icons.
- `404.html`: the page shown for addresses that don't exist.
- `styleguide/`: the live design-system page (hidden from search engines).
- `docs/design-system.md`: the design rules. `CLAUDE.md`: instructions for Claude Code.

## Not published

Large originals (`assets/img/**/originals/`), images no page uses (`assets/img/_unused/`), the short-format draft (`assets/short format/`) and the long case-study versions are listed in `.gitignore`.
