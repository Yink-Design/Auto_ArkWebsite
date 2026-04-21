# AGENTS.md

This file governs agent work inside `Homepage`.

## Source Of Truth
- Use `Ark.pen` for:
  - section heights
  - object positions
  - spacing and gutters
  - text block placement
  - line breaks and hierarchy
  - z-order and overlap
- Use `../FigmaRef` for:
  - animation pacing
  - reveal style
  - entry and scroll motion patterns
  - responsive layout ideas when Ark does not specify behavior clearly
- If Ark and FigmaRef conflict:
  - static composition follows Ark
  - motion must adapt to Ark, never the other way around

## Preferred Edit Targets
- First choice:
  - `src/components/home/ArkPrototypeHome.astro`
  - `src/styles/global.css` for shared variables or page-wide Ark styles
- Only add new helpers or scripts when they reduce repetition or improve verification.

## Verification Contract
- Minimum breakpoints to verify: `360`, `430`, `768`, `1024`, `1280`, `1440`, `1720`
- Minimum screenshot types:
  - top/hero composition
  - full page
- After a visible homepage change:
  - run `npm run check`
  - run `npm run capture:ark`
  - run `npm run compare:ark` if mapped references exist
- Before a milestone or handoff:
  - run `npm run build`

## Capture And Compare Expectations
- Save generated captures under `screenshots/ark-automation/current`.
- Save comparison outputs under `screenshots/ark-automation/reports`.
- A comparison run must report:
  - which breakpoint and view was checked
  - whether it passed, failed, or was skipped
  - dimension mismatch if present
  - a compact diff metric if comparison was possible

## Stop Conditions
- Stop only when:
  - user intent is missing
  - references contradict each other in a way that changes implementation
  - the environment is broken
  - a hard rate limit stops execution
- Before stopping, update `../PLAN.md` with current status and exact next step.
