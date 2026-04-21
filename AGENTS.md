# AGENTS.md

This file is for coding agents working in this repository. Treat it as executable collaboration policy, not general contributor prose.

## Primary Objective
- The active delivery target is `Homepage`.
- Reproduce the Ark homepage with the highest practical visual fidelity.
- Honor this priority order:
  1. `Homepage/Ark.pen` static geometry, spacing, proportions, and layer order
  2. `FigmaRef` animation and auto-layout ideas
  3. Implementation convenience

## Branch And Review Rules
- All final reviewable deliverables must land on branch `Codex`.
- Branch `work` is only a temporary execution branch and must not be used as the final review branch.
- If new commits are created on `work`, before ending the session you must safely organize and move the reviewable result onto `Codex` without losing history.
- The final visible review-shot set must also be committed on `Codex`.
- If the user sends short continuation commands in web chat, such as `继续推进`, `继续`, or `continue`, continue from the highest-priority unfinished item by default.
- All explanatory reporting must be written in Simplified Chinese.

## Default Working Pattern
- Inspect existing code and references before editing.
- Prefer modifying the existing Astro implementation instead of replacing the stack.
- After each visible change in `Homepage`, run:
  - `npm run check`
  - `npm run capture:ark` when the homepage changed
  - `npm run compare:ark` when a reference comparison is relevant
- Run `npm run build` before claiming a stable milestone or handoff.
- If the user sends a short continuation command such as `继续推进`, `continue`, `继续`, or `go on`, treat it as an instruction to resume the current highest-priority unfinished work using `PLAN.md` and the nearest `AGENTS.md` without asking for a new long prompt.

## Required Output Discipline
- Do not stop with analysis only when implementation is feasible.
- Before ending a work session, always report:
  - `本轮完成`
  - `当前仍不像的地方`
  - `最新验证结果`
  - `下一步具体要修什么`
  - `运行过的命令`
- If you hit a hard blocker or rate limit, update `PLAN.md` first.
- All explanatory reporting, summaries, blocker analysis, and handoff notes must be written in Simplified Chinese.
- Keep commands, file paths, branch names, package names, and metric keys in English when needed, but all narrative text must be Chinese.
- In `当前仍不像的地方`, explicitly state the worst breakpoint, the worst section, and whether the page became closer to or further from `Ark.pen`.

## Implementation Constraints
- Keep the Astro structure unless a targeted refactor clearly improves fidelity or maintainability.
- Prefer CSS custom properties, container-aware sizing, and semantic section boundaries.
- Avoid arbitrary magic numbers unless they are traced to `Ark.pen` or a verified screenshot measurement.
- Do not let animation disturb Ark’s resting composition.
- For responsive fixes, verify at `360/430/768/1024/1280/1440/1720`.

## Screenshot Workflow
- Use local screenshot artifacts as objective feedback, not as a substitute for reference inspection.
- Capture the directly affected area first when possible, then a larger top or full-page frame if the change affects the overall read.
- Treat screenshot verification as required for layout, clipping, overlap, spacing, and layer-order changes.
- For GitHub-based visual review, always maintain a small fixed review set instead of committing large batches of process screenshots.
- Overwrite and commit only these review files when verification runs or a milestone is reached:
  - `Homepage/review-shots/latest/430-top.png`
  - `Homepage/review-shots/latest/1024-top.png`
  - `Homepage/review-shots/latest/1280-top.png`
  - `Homepage/review-shots/latest/1280-full.png`
- In every report, explicitly list the current review image paths so the user can inspect them in GitHub.

## Subproject Override
- If editing files inside `Homepage`, also read `Homepage/AGENTS.md`.
- The nearest `AGENTS.md` wins when instructions conflict.
