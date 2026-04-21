# aim.obys.agency 分析记录

## 1. 布局特征

- 首屏不是常规营销页 Hero，而是“展览导览页”构图：
  - 左侧是编号化的艺术家索引。
  - 中间是超大标题堆叠。
  - 右侧是极少量说明和 CTA。
  - 下方再压一层主视觉与次级卡片。
- 页面不是连续信息流，而是几个很大的章节：
  - `Home / Intro / Experiment / Footer`
  - `Gallery` 作为覆盖层弹出，不打断主页面节奏。
- 信息量被刻意压低，视觉层级比文本层级更强。

## 2. 动画特征

- 平滑滚动：原站直接使用 `Lenis`。
- 入场动效很克制：
  - 标题和正文分行出现。
  - 弹层通过遮罩与位移进入。
  - 页面切换带一层短暂的过渡遮罩。
- 重点动效不是“处处都动”，而是：
  - 首屏节奏控制
  - 白底说明段的 reveal
  - Featured 区的图片切换
  - Gallery 的模态层展开

## 3. 网站结构

- 原站主导航很浅：
  - `Index`
  - `Experiment`
  - `About`
  - `Gallery`
- `Gallery` 更像 overlay route。
- 首页承担绝大多数品牌感知，子页只负责补充说明。

## 4. 这次复刻的实现策略

- 技术栈：`Astro + React + Tailwind + TypeScript + Lenis`
- 复刻目标：
  - 保留参考站的章节结构和交互模式
  - 用本地 Astro 项目实现可运行版本
  - 使用远程图片链接做演示素材，避免把大资源放进仓库
- 已落地的核心点：
  - 固定头部
  - Menu overlay
  - Gallery modal
  - 首屏大标题与图像堆叠
  - Intro 分行 reveal
  - Featured experiment React 交互滑块
  - About / Experiment 子页
