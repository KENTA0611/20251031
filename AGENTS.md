# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the entry point. It wires the free-draw canvas, the おえかき/ぬりえ mode toggle, color controls, and the guardian menu trigger.
- `styles.css` keeps the layout toddler-friendly (large targets, responsive spacing). Tweak mode button styling and SVG layout here.
- `script.js` houses interaction logic: mode switching, canvas drawing, SVG fill handling, fade animation, and audio playback. Group future logic into small helper functions inside this file.
- `assets/sounds/pop.wav` stores the gentle tap feedback sound. Replace it only with short mono clips to avoid latency.
- `README.md` documents setup and deployment. `要件定義書.md` records functional requirements—update both when behavior changes.

## Build, Test, and Development Commands
- `python -m http.server 8000` — serve the site locally at `http://localhost:8000`.
- `npx serve .` — alternative static server with sensible MIME types.
- When adding automation, place helper scripts under `tools/` (create the folder first) and describe their use here.

## Coding Style & Naming Conventions
- Indent HTML/CSS/JS with two spaces; avoid tabs.
- Prefer camelCase in JavaScript (`currentMode`), kebab-case in CSS (`.coloring-wrapper`), and meaningful names for SVG IDs.
- Keep the project dependency-free (vanilla JS/CSS). New assets belong under `assets/<type>/`; add `.gitkeep` if a directory must remain tracked while empty.
- Comment only where intent is non-obvious (e.g., long-press guardian gestures).

## Testing Guidelines
- No automated tests yet—run manual smoke checks on one mobile touch device and one desktop browser.
- Verify: mode switching (おえかき⇔ぬりえ), single-touch drawing, color changes, guardian menu長押し (~2 s), fade toggle, sound toggle, and SVG fill reset after「全消し」.
- If you add structured testing, create `tests/README.md` and note scenarios plus expected outcomes.

## Commit & Pull Request Guidelines
- Use present-tense commit summaries; Japanese messages are welcome (例: `ぬりえモードを追加`).
- Keep commits focused—feature work separate from formatting. Include generated assets only when necessary.
- PRs should state purpose, key changes, manual test evidence, and visuals (screenshots or short recordings) for UI updates.
- Link related issues or requirement sections so reviewers can confirm scope quickly.

## Accessibility & Child Safety Notes
- Maintain ≥3.5rem tap targets on mobile and ensure buttons have clear contrast.
- Default sound levels should remain soft; call out any new audio assets for volume review.
- Recheck behaviour with OS accessibility aids (screen zoom, guided access, orientation lock) whenever layout or controls change.
