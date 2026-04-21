# Ark Homepage Delivery Plan

## Goal
- Rebuild `Homepage` so the home page matches `Homepage/Ark.pen` as closely as possible.
- Use `FigmaRef` for animation timing and auto-layout strategy only when it does not break Ark static composition.
- Keep the local VS Code workflow moving through a repeatable loop: inspect, implement, check, capture, compare, record, continue.

## Rules Of Progress
- Final reviewable commits must be on branch `Codex`; `work` is temporary only.
- If you produce commits on `work`, move/sync the reviewable result to `Codex` before ending the session.
- Final review-shot outputs must be visible on `Codex`.
- Short commands from web chat (`继续推进`/`继续`/`continue`) mean resume the highest-priority unfinished task by default.
- All explanatory reports in this file must use Simplified Chinese.
- Work in order. Do not skip ahead unless the current stage is blocked by a real dependency.
- Solve one concrete visual or responsive issue per loop.
- After each visible change, run `npm run check`, capture affected screenshots, then update this file.
- Do not stop at analysis. Stop only for missing product intent, conflicting references, broken environment, or rate limits.
- Before any handoff, record `Completed`, `Next`, `Blocked`, and the latest verification commands.
- For GitHub review, maintain a fixed screenshot set at:
  - `Homepage/review-shots/latest/430-top.png`
  - `Homepage/review-shots/latest/1024-top.png`
  - `Homepage/review-shots/latest/1280-top.png`
  - `Homepage/review-shots/latest/1280-full.png`
- Prefer Simplified Chinese for explanatory handoff text in this file.

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
  - 继续推进 Stage 2/3：针对 `430` 顶区重排移动端 hero/info 节奏，压缩首屏高度并校正导航信息层级。
  - 在 `max-width:640px` 下调整 `hero-stage` 比例、logo 与蓝色块尺寸及位置，减少与 `web-ref-430` 的构图偏差。
  - 移动端导航改为两行紧凑布局（隐藏左侧描述、保留 links + 版权行），并微调 intro 左栏宽度。
  - 覆盖固定审图集到 `Homepage/review-shots/latest` 四张文件。
- Next:
  - 处理 `1024/1280` 顶区仍偏大的问题，优先校准 Hero 高度与 info 区纵向间距。
  - 对 `430` 继续微调蓝色块高度与首条黑色分隔带厚度，逼近 `Ark.pen`。
- Blocked:
  - 无环境阻塞；`compare:ark` 失败来自视觉差异未收敛。
- Verification:
  - `npm run check`
  - `npm run verify:ark`

- Completed:
  - 补充并固化分支规则：最终可审查提交与 review-shots 必须落在 `Codex`，`work` 仅作临时执行分支。
  - 执行分支统一：将最新规则提交同步到远端 `work` 与 `Codex`，并将当前工作分支切换为 `Codex`。
  - 对首页顶区做一轮结构压缩：导航取消 sticky 叠层，收紧 intro 空栏与标题字号，降低 1024/1280 顶区偏差。
  - 刷新固定审图集：`review-shots/latest/{430-top,1024-top,1280-top,1280-full}.png`。
- Next:
  - 继续优先修复 Hero/Info 在 `430` 的纵向节奏与蓝色媒体块高度，使顶部结构更接近 `Ark.pen`。
  - 对 `360/430/768` 分段微调文字尺寸与首屏留白，避免移动端标题区过挤。
- Blocked:
  - `compare:ark` 仍对 `430/1024/1280` 报 fail（现阶段为持续迭代中，非环境阻塞）。
- Verification:
  - `npm run check`
  - `npm run verify:ark`

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
- 本轮完成:
- 当前仍不像的地方:
- 最新验证结果:
- 下一步具体要修什么:
- 运行过的命令:

## Review Images
- Always keep the latest GitHub-reviewable screenshots in:
  - `Homepage/review-shots/latest/430-top.png`
  - `Homepage/review-shots/latest/1024-top.png`
  - `Homepage/review-shots/latest/1280-top.png`
  - `Homepage/review-shots/latest/1280-full.png`
- Overwrite these fixed paths instead of creating new timestamped review files for every loop.

## Resume Prompt
`继续按 PLAN.md 和 AGENTS.md 执行，不要停在分析；先读未完成项，再实现、检查、截图、更新进度，直到遇到真正阻塞或额度上限。`
