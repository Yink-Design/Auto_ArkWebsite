# Ark Homepage Delivery Plan

## Goal
- Rebuild `Homepage` so the home page matches `Homepage/Ark.pen` as closely as possible.
- Use `FigmaRef` for animation timing and auto-layout strategy only when it does not break Ark static composition.
- Keep the local VS Code workflow moving through a repeatable loop: inspect, implement, check, capture, compare, record, continue.

## Rules Of Progress
- Work in order. Do not skip ahead unless the current stage is blocked by a real dependency.
- Solve one concrete visual or responsive issue per loop.
- After each visible change, run `npm run check`, capture affected screenshots, then update this file.
- Do not stop at analysis. Stop only for missing product intent, conflicting references, broken environment, or rate limits.
- Before any handoff, record `Completed`, `Next`, `Blocked`, and the latest verification commands.

## Stages
| Stage | Status | Done When |
| --- | --- | --- |
| 1. Reference parse | Completed | Ark regions, breakpoints, and screenshot references are documented and mapped to implementation areas. |
| 2. Structure rebuild | Pending | The homepage sections use stable semantic structure that mirrors Ark sections and supports responsive tuning. |
| 3. Hero calibration | Pending | Brand mark, blue media shape, mini lockup, and top spacing visually match Ark on desktop and mobile. |
| 4. Info calibration | Pending | Nav, divider, title block, side note, and scroll cue align with Ark across target breakpoints. |
| 5. Feature panel calibration | Pending | The black media panel matches Ark sizing, label placement, and heading position. |
| 6. Footer and discover calibration | Pending | Footer copy, band, discover prompt, wordmark, and links match Ark hierarchy and spacing. |
| 7. Multi-breakpoint repair | Pending | `360/430/768/1024/1280/1440/1720` all avoid drift, overlap, clipping, or horizontal scroll. |
| 8. Animation backfill | Pending | Motion references FigmaRef without altering Ark’s resting layout and respects reduced motion. |
| 9. Final acceptance | Pending | Check/build pass and capture/compare artifacts are up to date for key desktop and mobile references. |

## Current Execution Loop
1. Read the active unfinished stage and pick one concrete defect.
2. Inspect `Homepage/Ark.pen`, the current Astro implementation, and available reference screenshots.
3. Implement the smallest code change that fixes that defect cleanly.
4. Run `npm run check`.
5. Run `npm run capture:ark`.
6. Run `npm run compare:ark`.
7. Record outcome below and continue with the next unfinished defect.

## Reference Map
- Static source of truth: `Homepage/Ark.pen`
- Motion and auto-layout inspiration: `FigmaRef/src/app/App.tsx`
- Existing desktop top reference: `Homepage/screenshots/web-ref-top.png`
- Existing mobile top reference: `Homepage/screenshots/web-ref-430.png`
- Existing desktop full-page reference: `Homepage/screenshots/ark-home-full-v11.png`
- Existing tablet reference: `Homepage/screenshots/ark-home-1024-v8.png`

## Status Log
### 2026-04-21
- Completed:
  - Added project-level planning and agent instructions.
  - Added local capture, compare, and verify scripts for the Ark homepage workflow.
  - Added repeatable npm commands for screenshot-based verification.
  - Stabilized `verify:ark` with a free preview port and explicit preview process cleanup.
  - Added comparison reporting that handles same-width reference images with different heights by comparing the shared top region.
- Next:
  - Start visual calibration with the Hero stage using the new compare report as the baseline.
  - Add or refresh more mapped reference screenshots if broader automated comparison is needed.
- Blocked:
  - Current Ark implementation still diverges heavily from mapped references at `430`, `1024`, and `1280`.
- Verification:
  - `npm run check`
  - `npm run build`
  - `npm run capture:ark`
  - `npm run compare:ark`
  - `npm run verify:ark`

## Handoff Template
- Completed:
- Remaining:
- Next:
- Blocked:
- Latest compare report:
- Commands run:

## Resume Prompt
`继续按 PLAN.md 和 AGENTS.md 执行，不要停在分析；先读未完成项，再实现、检查、截图、更新进度，直到遇到真正阻塞或额度上限。`
