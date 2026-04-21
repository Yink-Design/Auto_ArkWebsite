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

## Branch Discipline
- Final reviewable commits for homepage work must land on `Codex`.
- `work` may be used only as a temporary execution branch, never as the final review branch.
- If commits are created on `work`, sync/cherry-pick/merge the reviewable result to `Codex` before ending the task.
- Keep the final fixed review-shot files committed on `Codex` as the source for web review.

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
- Before a milestone or handoff, refresh and commit the fixed GitHub review set:
  - `review-shots/latest/430-top.png`
  - `review-shots/latest/1024-top.png`
  - `review-shots/latest/1280-top.png`
  - `review-shots/latest/1280-full.png`

## Capture And Compare Expectations
- Save generated captures under `screenshots/ark-automation/current`.
- Save comparison outputs under `screenshots/ark-automation/reports`.
- A comparison run must report:
  - which breakpoint and view was checked
  - whether it passed, failed, or was skipped
  - dimension mismatch if present
  - a compact diff metric if comparison was possible
- For human review in GitHub, always copy/export the latest review images to:
  - `review-shots/latest/430-top.png`
  - `review-shots/latest/1024-top.png`
  - `review-shots/latest/1280-top.png`
  - `review-shots/latest/1280-full.png`
- Overwrite those fixed files instead of creating timestamped review screenshots.

## Reporting Language
- All summaries, blocker descriptions, mismatch analysis, and handoff text must be written in Simplified Chinese.
- Keep commands, file paths, and metric keys in English when needed.
- Every report must use this exact structure:
  1. `本轮完成`
  2. `当前仍不像的地方`
  3. `最新验证结果`
  4. `下一步具体要修什么`
  5. `运行过的命令`
- In `当前仍不像的地方`, explicitly name:
  - the worst breakpoint
  - the worst section
  - whether the result became closer to or further from `Ark.pen`

## Stop Conditions
- Stop only when:
  - user intent is missing
  - references contradict each other in a way that changes implementation
  - the environment is broken
  - a hard rate limit stops execution
- Before stopping, update `../PLAN.md` with current status and exact next step.
