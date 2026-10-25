Bitran Portfolio is the system behind Itzik Bitran's case-study pages. Every case study (Franklin, ThetaRay, Sixgill, DreamWorks and whatever comes next) is built from these tokens and components so the pages read as one portfolio. The Franklin case study is the reference page: when in doubt, match it.

## Voice and content

- Write in first person, plainly, the way a Head of Design talks to a hiring manager. Short sentences. No hype words, no exclamation marks, no emoji.
- Never use em dashes. Use commas, colons, parentheses or a new sentence.
- The title is always **Head of Design**, never "Design Lead".
- Lead every case study with a question or a claim the work answers ("Would you trust an algorithm with a diagnosis?"), not the product name.
- Put explanations in the paragraph above an image group. **No captions under images.**
- Results stay honest: real numbers where they exist (4,000+ organizations, 95 countries), otherwise a concrete mechanism ("free users asked their labs to buy the full platform"), never an invented metric.
- Credit accurately: say what Itzik did, what freelancers or illustrators did, and who directed whom.

## Short case study (story format, current)

The live case studies use a shorter, image-led format, styled in the `Short case study` block of `site.css`:

1. Shared site bar.
2. Case hero, compact (`.hero.compact`): question headline in accent at up to 70px (desktop line breaks with `<br class="lb-d">`, hidden on phones, where the hero is left-aligned), the four fact pills, optional `.live-link`.
3. Hero image (`.hero-photo`, or `.hero-photo.bleed` for a wide composition).
4. One narrow text column (`.s-col`, 640px): a Summary box (`.s-summary`, band-blue tint) and a one-sentence hook (`.s-hook`, Sora Light with the key phrase in accent).
5. Numbered chapters (`.s-ch`), each opened by a short accent bar (`.s-divider`) and followed by wide images (`.s-media` at 1180px, in `.duo`, `.trio`, `.stack`, `.phones`, `.crop`, `.narrow`, `.people`). Dark product UIs sit on a full-width dark band (`.s-dark`, `--band-dark`) so they don't float on white.
6. "What it led to" chapter with result rows (`.nums` / `.num`), then one "What I learned" line (`.learned`).
7. Gray band with the pager and Related work, then the contact band.

## Page structure (long format, kept in long.html)

Every case study uses the same skeleton, top to bottom:

1. **Site bar**: the shared header (ZIK wordmark, Works | About). The live-product link sits under the hero lede as a `.live-link`.
2. **Case hero**: headline in `accent`, four project-fact pills (Role, Industry, Product, Service, values only), lede, then the hero image. A wide hero composition uses `.hero-photo.bleed`: it runs to the window edges, centered on its main screen, so the window crops the sides instead of leaving a white gap, up to 1818px wide. A wider Figma frame (5440 instead of 3349, side screens shown complete) adds `.xl`: it holds up to 2953px and beyond that ends naturally at the side tablets, so frames this wide are the preferred format (phones get a tighter crop through `<picture>`, also edge to edge).
3. **01 My role**: section headline, fact list (Role, Scope, Timeline) beside a 2×2 story grid (Background, Problem, Approach, Result).
4. **02 The users**: persona cards.
5. **03 The challenge**: challenge and solution columns, then a before/after compare slider.
6. **04 Design tensions**, **05 Logic mapping**, **06 The interface** (chapters with screenshots), **07 Outcome**.
7. **Related work** cards, then the contact line.

Numbered sections are a real sequence; renumber when a section is removed. Sections that a project does not need are dropped, never padded.

## Visual foundations

**Color.** The page is plain white (`bg`). Nothing textured or dotted sits behind the page. Set a section apart with a full-width band: `band-gray` for quieter sections, `band-blue` for the ones to notice. One brand blue, `accent`, carries the headline, section numbers, story labels, quotes and every hover. `accent2` (green) means solution or positive; `accent-warm` means challenge or outcome labels. `benign`, `vus` and `path` belong only to Franklin's classification bar.

**Type.** Sora (`--font-display`) for every headline and number, Geist (`--font-body`) for text, Geist Mono (`--font-mono`) for small uppercase labels. One family per role, no serif, no italic accent words inside headlines. Tracking scales with size: about -0.028em at 104px, -0.022em at 64px, -0.012 to -0.02em for titles, normal for body text, +0.08em for uppercase labels. Kerning and ligatures stay on.

**Layout.** A Swiss-style grid: a numbered index rail (`rail-width`, 200px) left of the content, each section opened by a 1.5px `rule`, rows divided by `hair` lines instead of boxed cards. Content width `frame-max`, copy `measure-copy`. Bands pad `space-section` (96px), `space-section-sm` on phones. Under `bp-tablet` the rail stacks above the content; under `bp-phone` everything is one column.

**Images.** Real product screenshots and photos only, or scenes Itzik generated himself with his real screenshots composited in (approved 2026-10-20 for the home project cards). `radius-image` (3px) on every screenshot, tile and card; `radius-portrait` (8px) on persona portraits. No strokes, no drop shadows, no gray mats behind screenshots. One exception: the before/after compare slider gets a light hairline frame with a very soft shadow, because its white Before image would otherwise merge with the page. Never use a generated product screen with garbled text: composite a real screenshot in, or leave the image out.

**Motion.** Quiet and earned. The hero headline, pills and lede dissolve (fade, blur, drift up) as you scroll. Persona photos zoom slightly with an `accent` line growing under them, and the name gets a faint pink and cyan split. Project cards zoom 3% on hover. The compare slider sweeps once when it first appears. Everything respects `prefers-reduced-motion`.

**Contrast.** `ink` and `ink-soft` pass everywhere. `ink-faint` (3.2:1 on white) and `accent-warm` (4.0:1 on the bands) fall short of 4.5:1 at small sizes in the light theme; they are kept exact from the live page and used only for short labels. Use `ink-soft` for anything a reader must read. Focus rings are a solid 2px `accent` outline, 3px offset.

## Site bar (every page)

ZIK wordmark on the left in Unbounded 24px (`--f-logo`, loaded only for the letters Z, I, K), `Works | About` on the right in Sora 16px, ink, accent on hover. Sticky. Transparent over the hero, solid `--bar-bg` once the page scrolls. On project pages the links point to `../../#works` and `../../#about`. The first section on a page gets `.under-bar` so its background runs behind the bar.

## Home page

Built from the Figma frame "Works" (Portfolio-project, node 125-1215). Top to bottom:

1. **Home hero** (`.home-hero`): white to `--hero-mint` to white gradient. Greeting "Hi! I'm Itzik" in Sora Light 50px, headline in Sora Bold 62px, both ink and centered. Two outline buttons (`.btn`: 1px accent border, 13px radius, 161×38, Geist 18px; filled accent on hover). Say Hello opens LinkedIn in a new tab; Download CV downloads `assets/Itzik-Bitran-CV.pdf`.
2. **Collage** (`.collage > .ci > .cb`): Itzik's real screens, tilted, on a 1681×552 stage placed exactly as in Figma. Each piece has `--x --y` (center), `--w` (width), `--ar` (aspect), `--r` (rotation) and `--d` (parallax depth). With a mouse, pieces drift toward the pointer by depth (the hovered piece does not lift or come forward). Pieces near the left and right screen edges are softly blurred (`.soft-edges`, up to 4px), so the middle reads first. On touch screens they float gently instead. With reduced motion they stay still. On phones the stage zooms into its middle instead of shrinking all pieces. This is the one place screenshots may carry the thin borders and shadows from Figma.
3. **Works** (`#works`): `.section-title` (Sora 600 62px, uppercase, centered), `.section-intro`, then `.work` cards (max 1000px wide, centered): full-width photo, 10px radius, black gradient from 54% down, title Sora Bold 26px, one-line description Sora 16px and tags in Geist Mono 12px (fixed sizes on every screen) with a white outline. Image zooms 3% on hover. On phones the card turns 4:5 and the gradient starts higher.
4. **About** (`#about`, from Figma): `.band.dark` in `--about-bg` (#090708) with white Sora 22px text, a few words highlighted in `--lime` (#B9FF00) with `<em>`, Itzik's portrait (10px radius) on the right, and the two buttons in their `.btn.lime` version. The text is Itzik's own and is used as written. This band is the only place lime and a dark background appear. Background (`.bg-topo`): faint topographic contour lines (`assets/img/about/topo.svg` at 5% opacity, fading out toward the bottom), a lime glow top right and a smaller light-blue glow (#7EA2FF) beside it. "Franklin" is a `.lime-link` (underlined, opens the live product in a new tab). "Pulpit Rock" and "drawing" are `.peek` words: hovering (or tapping on a phone) fans out two or three tilted photo cards above the word, listed in `data-peek` with photos from `assets/img/about/`. On tablets and phones the photo moves below the text. The home page ends here: the About buttons are the contact.

## Project navigation

Every case study ends with a gray band holding the `.pager` (previous and next project, looping in the order Franklin, ThetaRay, Dreamplace app, Sixgill), then Related work cards for the other three projects, then the contact line.

## Project tags

Tags describe what Itzik did and the project type, the same on the home card and in Related work (Related work shows the first two):
Franklin: Health tech, End-to-end UX/UI, Brand + design system. ThetaRay: Fintech · AML, Zero to one, UX/UI + brand. Dreamplace app: Consumer, UI design, 4 connected apps (UI only; someone else led UX). Sixgill: Cybersecurity, Zero to one, Brand + UX/UI.

## Style guide

`/styleguide/` renders the tokens, type styles and components live from `site.css`. Edit `site.css`, reload the page, and you see the change. Keep it updated when a component is added.

## Building a page

Load `tokens.css` and `components/bundle.css`, wrap the page in `.bp-page`, and compose sections from the components here. Class names are prefixed `bp-`. Fonts come from Google Fonts (bundle.css imports Sora, Geist and Geist Mono). Photos and screens for existing projects are in Assets.

## Tokens

The site is light only. The Dark column below is kept for reference; it no longer applies automatically when a visitor's system is in dark mode.


| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#ffffff` | `#121418` | Page background. Plain white in light: the portfolio never uses a texture or tint behind the whole page. |
| `--tile` | `#ffffff` | `#1c1f24` | Raised surfaces that must stay light on a band: mascot tiles, need pills, the flow-diagram panel. |
| `--band-gray` | `#f3f4f6` | `#1a1d21` | Full-width section band for a quieter section (My role, Related work, Chapter 2). |
| `--band-blue` | `#edf2fa` | `#16202c` | Full-width section band for a highlighted section (The users, Chapter 3 mascot). |
| `--ink` | `#121418` | `#f0f1f3` | Primary text and headlines, on bg, tile and both bands (14:1 or more in both themes). |
| `--ink-soft` | `#555b64` | `#b4bac2` | Body copy and descriptions, on bg, tile and both bands (6:1 or more). |
| `--ink-faint` | `#8a9099` | `#7f8690` | Small uppercase meta labels (ROLE, SCOPE, BENIGN…). FLAG: only 3.2:1 on bg and 2.9:1 on bands in light, below 4.5:1 for 11px text. Kept exact from the live page; use ink-soft for anything that must be read. |
| `--rule` | `#121418` | `#f0f1f3` | 1–1.5px structural rules: the line above each numbered section and above story blocks. |
| `--hair` | `rgba(18,20,24,0.12)` | `rgba(240,241,243,0.14)` | Hairline dividers between list rows and fact rows. |
| `--accent` | `#2f4ff0` | `#93a6ff` | The one brand blue (matched to Itzik's swatch). Hero headline, section numbers, story labels, pull quotes, hover states, links. As text on bg and both bands (5.3:1 or more). |
| `--on-accent` | `#ffffff` | `#121418` | Text or icon on an accent fill (compare-slider handle arrows). |
| `--accent2` | `#2f7a55` | `#8fd1a8` | Secondary green: Solution label and rule, tension subtitles, Related-work tags. As text on bg (5.2:1) and bands (4.6:1). |
| `--accent-warm` | `#c2571c` | `#e8a06a` | Warm signal: Challenge label and rule, Outcome labels. FLAG: 4.5:1 on bg but 4.0–4.1:1 on bands in light; keep it on bg or at 24px+. |
| `--benign` | `#3e9a6a` | `#8fd1a8` | ACMG scale, Benign end. Franklin-specific: only in the classification gradient bar. |
| `--vus` | `#a3abb5` | `#7e8792` | ACMG scale, VUS midpoint. Franklin-specific. |
| `--path` | `#c8602a` | `#e8a06a` | ACMG scale, Pathogenic end. Franklin-specific. |
| `--bar-bg` | `#ffffff` | `#121418` | Sticky top bar once scrolled: solid page color, no blur, no border under it. |
| `--hero-mint` | `#e1fef7` | `#0f2a26` | Home hero only: the middle stop of the white, mint, white gradient. |
| `--bar-h` | `80px` | `64px` on phones | Height of the site bar. `.under-bar` pulls a hero up behind it. |
| `--radius-card` | `10px` | same | Home project cards and collage pieces (Figma). Screenshots inside case studies stay at 3px. |
| `--fact-bg` | `rgba(47,79,240,0.08)` | `rgba(147,166,255,0.12)` | Fill of the project-fact pills under a case-study headline. |
| `--top-green` | `rgba(62,154,106,0.16)` | `rgba(62,154,106,0.16)` | Top-left radial glow of the hero (static fallback behind the animated waves). |
| `--top-blue` | `rgba(47,79,240,0.14)` | `rgba(47,79,240,0.14)` | Top-right radial glow of the hero (static fallback behind the animated waves). |

## Type styles

| Style | Size | Line height | Weight | Tracking | Use |
|---|---|---|---|---|---|
| hero (Display) | 104px | 1.04 | 600 | -0.028em | Case-study headline, in accent, centered. CSS clamp(40px, 7.4vw, 104px). |
| outcome (Display) | 84px | 1.02 | 600 | -0.025em | Outcome figures (4,000+, Acquired). clamp(44px, 6vw, 84px), tabular numerals. |
| section (Display) | 64px | 1.08 | 600 | -0.022em | Section headline next to the index rail, ink, max 17ch. clamp(34px, 5vw, 64px). |
| chapter (Display) | 52px | 1.0 | 600 | -0.022em | Chapter title inside The interface. clamp(30px, 4vw, 52px). |
| numeral (Display) | 96px | 0.95 | 300 | -0.03em | Light numerals that open each design tension. clamp(56px, 7vw, 96px). |
| quote (Display) | 36px | 1.25 | 300 | -0.018em | Pull quote, accent, with accent quote marks. clamp(24px, 2.8vw, 36px). |
| card-title (Display) | 36px | 1.0 | 600 | -0.02em | Project name on a Related-work photo card, white on the card gradient. |
| title (Display) | 30px | 1.12 | 600 | -0.018em | Challenge, Solution and tension titles. clamp(22px, 2.4vw, 30px). |
| subhead (Display) | 19px | 1.2 | 600 | -0.012em | Persona names and small headings. |
| lede (Text) | 22px | 1.5 | 400 | 0 | Intro paragraph under the hero, ink, max 36em. clamp(19px, 1.7vw, 22px). |
| copy (Text) | 17px | 1.7 | 400 | 0 | Running body copy, ink-soft, max 38em. Bold phrases switch to ink. |
| body (Text) | 16px | 1.65 | 400 | 0 | Story-grid and challenge paragraphs. |
| small (Text) | 14.5px | 1.55 | 400 | 0 | Persona descriptions, outcome notes. |
| pill (Text) | 14.5px | 1.2 | 500 | 0 | Project-fact pills and need tags (12.5px for need tags). |
| label (Labels) | 12px | 1.4 | 500 | 0.08em | Uppercase. Index-rail labels, top bar links, section eyebrows. |
| label-sm (Labels) | 11px | 1.4 | 500 | 0.08em | Uppercase. Story labels (accent), fact labels (ink-faint), outcome labels (accent-warm). |
