# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the entry point. It wires the touch canvas UI, color controls, and hidden guardian menu.
- `styles.css` defines the tactile-friendly layout; adjust spacing and colors here.
- `script.js` contains all interaction logic (touch handling, fade animation, audio playback). Keep additional behavior modular within this file.
- `assets/sounds/pop.wav` is the bundled feedback sound; replace it with short mono clips only.
- `README.md` covers setup and Pages deployment, while `要件定義書.md` records product requirements. Update both when behavior changes.

## Build, Test, and Development Commands
- `python -m http.server 8000` — serve the project locally at `http://localhost:8000` for manual testing.
- `npx serve .` — alternative static server with automatic content-type headers.
- When scripting new tooling, place helper scripts under `tools/` (create if needed) and document usage in this file.

## Coding Style & Naming Conventions
- Use two-space indentation for HTML, CSS, and JavaScript.
- Favor descriptive camelCase for JavaScript variables/functions and kebab-case for CSS classes (e.g., `.canvas-wrapper`).
- Keep dependencies zero; vanilla JS only. For new assets, store under `assets/<type>/` and include a `.gitkeep` if the folder should remain empty.
- Add concise comments only for non-obvious logic (e.g., guardian menu gestures).

## Testing Guidelines
- No automated tests yet; perform manual smoke checks on at least one mobile and one desktop browser.
- Verify: single-touch drawing, color switching, guardian menu long-press (≈2 s), fade toggle, sound toggle, and overall responsiveness.
- Document any new manual test cases in `tests/README.md` (create if introducing structured testing).

## Commit & Pull Request Guidelines
- Prefer present-tense summaries, optionally in Japanese to match existing history (e.g., `効果音を内包する`).
- Group related file changes per commit; avoid mixing feature work with formatting-only edits.
- Pull requests should include: purpose, key changes, manual test results, and screenshots or screen recordings if UI is affected.
- Link relevant issues or requirement sections so reviewers can trace intent quickly.

## Accessibility & Child Safety Notes
- Ensure interactive targets remain ≥3.5rem on mobile to accommodate toddler touch accuracy.
- Keep audio levels low by default and provide toggles for guardians; flag any new media assets for volume review.
- Re-test with OS accessibility features (screen zoom, guided access) whenever layout changes.***

英語で考えて日本語で詳細を教えるようにして
