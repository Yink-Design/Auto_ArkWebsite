# AGENTS.md

This file is for coding agents working in this repository. Treat it as executable collaboration policy, not general contributor prose.

## Primary Objective
- The active delivery target is `Homepage`.
- Reproduce the Ark homepage with the highest practical visual fidelity.
- Honor this priority order:
  1. `Homepage/Ark.pen` static geometry, spacing, proportions, and layer order
  2. `FigmaRef` animation and auto-layout ideas
  3. Implementation convenience

## Default Working Pattern
- Inspect existing code and references before editing.
- Prefer modifying the existing Astro implementation instead of replacing the stack.
- After each visible change in `Homepage`, run:
  - `npm run check`
  - `npm run capture:ark` when the homepage changed
  - `npm run compare:ark` when a reference comparison is relevant
- Run `npm run build` before claiming a stable milestone or handoff.

## Required Output Discipline
- Do not stop with analysis only when implementation is feasible.
- Before ending a work session, always report:
  - completed work
  - unfinished work
  - next recommended step
  - blockers
  - commands actually run
- If you hit a hard blocker or rate limit, update `PLAN.md` first.

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

## Subproject Override
- If editing files inside `Homepage`, also read `Homepage/AGENTS.md`.
- The nearest `AGENTS.md` wins when instructions conflict.
