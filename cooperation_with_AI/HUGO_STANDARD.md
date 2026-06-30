# LoveClaude Hugo 主题创作规范

> 基于 LoveClaude Hugo 主题源码（v0.146.0+）逆向提炼的创作规范。
> 涵盖：目录组织、布局层级、Partial 系统、命名约定、配置规范、资产管道与设计原则。

---

## 1. 概述

LoveClaude 是一个**深色优先**的 Hugo 博客主题，视觉语言受 Anthropic / Claude 设计风格启发。

| 属性 | 值 |
|------|-----|
| 最低 Hugo 版本 | `0.146.0` |
| 许可证 | MIT |
| 外部依赖 | 零（无 npm、无 Tailwind、无 jQuery） |
| 核心设计 | 深色优先、衬线字体、玻璃拟态、零框架 |

---

## 2. 目录组织规范

```
LoveClaude/
├── assets/
│   ├── css/
│   │   └── main.css          # 单一 CSS 文件，~4180 行
│   ├── js/
│   │   └── main.js           # 单一 JS 文件，~1128 行
│   └── fonts/                # 自托管字体（由用户自行放置）
│       ├── SourceSerif4-Regular.ttf
│       ├── SourceSerif4-SemiBold.ttf
│       ├── SourceHanSerifCN-Regular.otf
│       └── SourceHanSerifCN-Medium.otf
├── layouts/
│   ├── baseof.html           # 基础框架模板
│   ├── index.html            # 首页（生命树）
│   ├── single.html           # 文章详情页
│   ├── list.html             # 博客列表页
│   ├── taxonomy.html         # 分类法聚合页
│   ├── archives.html         # 归档页
│   ├── 404.html              # 404 页
│   ├── _partials/            # 可复用片段（下划线前缀）
│   │   ├── head.html
│   │   ├── header.html
│   │   ├── footer.html
│   │   ├── hero.html
│   │   ├── toc.html
│   │   ├── post-card.html
│   │   ├── pagination.html
│   │   ├── protected-modal.html
│   │   └── rc-protect-modal.html
│   ├── friends/
│   │   └── list.html         # 友情链接页（匹配 content/friends/）
│   └── page/
│       └── about.html        # 关于页（匹配 content/about/_index.md）
├── exampleSite/
│   ├── hugo.toml
│   └── content/
│       ├── posts/
│       └── friends/
└── theme.toml
```

### 目录规则

| 路径 | 用途 | 约定 |
|------|------|------|
| `layouts/` | 根级模板 | 如 baseof、index、single、list 等直接放置 |
| `layouts/_partials/` | 可复用片段 | **下划线前缀**防止 Hugo 直接查找，调用时用 `partial "name.html" .` |
| `layouts/{type}/` | 内容类型布局 | 以内容类型命名的子目录（如 `friends/`、`page/`） |
| `assets/css/` | 样式 | 单一文件策略，通过 Hugo Pipes 指纹化 |
| `assets/js/` | 脚本 | 单一文件策略，通过 Hugo Pipes 指纹化 |
| `assets/fonts/` | 字体 | 自托管由主题使用方自行放置 |
| `exampleSite/` | 示例站点 | 包含完整可运行的 hugo.toml 和示例内容 |

---

## 3. 布局层级规范

### 3.1 baseof.html — 基础框架

**职责**：所有页面的 HTML 骨架，通过 `block "main"` 暴露扩展点。

```
baseof.html
├── 版本门控（hugo.Version ≥ 0.146.0，否则 errorf）
├── <html data-theme="dark">
│   ├── partial "head.html"
│   ├── <body>
│   │   ├── #reading-progress（仅 IsPage）
│   │   ├── partial "header.html"
│   │   ├── <main> → block "main"（所有子模板覆盖此处）
│   │   ├── partial "footer.html"
│   │   ├── partial "protected-modal.html"（始终渲染）
│   │   ├── partial "rc-protect-modal.html"（始终渲染）
│   │   └── #scroll-top（固定按钮，SVG chevron）
```

### 3.2 index.html — 首页（生命树）

**职责**：渲染 hero 部分 + 生命树文章时间轴。

- 定义 `$catClr` 颜色映射字典（类别 → 色值）
- 用 `where .RegularPages "Type" "posts"` 获取文章
- 文章在垂直时间轴上**左右交错排列**（mod 2 判断）
- 顶冠（最新）+ 底根（最旧）+ 树干生长动画
- JS 通过 `#tree-root` hash 或"浏览文章"按钮触发解锁

### 3.3 single.html — 文章详情页

**职责**：文章内容展示，支持受保护/未受保护双路径。

- **文章头**：分类链接、标题、副标题、作者、日期、受保护标签/阅读时间/字数
- **受保护路径**（`protected: true`）：显示 lock 占位符 → content 包装在 `#prot-content-gate[hidden]` → JS 在 TOTP 验证通过后 `removeAttribute('hidden')`
- **未受保护路径**：封面图 → TOC → content → tags → 前后导航 → 浮动 TOC → 相关文章（`.Related`）
- 浮动 TOC 仅在 `.Params.toc` 为 true 且 `TableOfContents` 长度 > 100 时渲染

### 3.4 list.html — 博客列表页

**职责**：展示文章列表，支持搜索、筛选、分页。

- **Section 页面**：左侧粘性侧边栏（可折叠分类/标签过滤器）+ 右侧博客主区域（搜索栏 + 网格/列表视图切换 + 分页卡片网格）
- **分类法页面**（else 分支）：简单卡片网格 + 分页
- 空状态回退：`"暂无文章。"`
- 视图状态保存在 `localStorage`

### 3.5 taxonomy.html — 分类法聚合页

**职责**：展示所有分类/标签及其文章计数。

- 用 `.Data.Terms.Alphabetical` 遍历
- CSS 类 `tag-item--size-N` 表示不同大小的标签

### 3.6 archives.html — 归档页

**职责**：按年份分组的文章列表。

- 用 `.GroupByDate "2006"` 分组
- 显示：日期（月-日）、文章标题、所属分类

### 3.7 404.html — 错误页

**职责**：极简 404 提示 + 返回首页按钮。

- `404` 大字排版 + 文案 + `btn btn-primary`

---

## 4. Partial 命名与职责规范

所有 partial 文件名采用**全小写 + 连字符分隔**，存放在 `layouts/_partials/` 下。

| Partial 文件 | 职责 | 调用位置 |
|-------------|------|---------|
| `head.html` | `<head>` 元数据、FOUC 防护 JS、字体 @font-face、CSS/JS 资源链接、OG meta | baseof.html |
| `header.html` | 固定导航栏：logo、主菜单、语言切换器（4 语言）、主题切换、移动端汉堡菜单 | baseof.html |
| `footer.html` | 三列页脚：品牌+GitHub、导航菜单、鸣谢、版权+座右铭 | baseof.html |
| `hero.html` | 全屏英雄区：背景画布粒子、环境光晕、标题、副标题、CTA 按钮、分类导航 | index.html |
| `toc.html` | 条件性内联目录（`toc: true` 且长度 > 100 字符时渲染） | single.html |
| `post-card.html` | 可复用文章卡片：封面/emoji 生成封面、锁标、日期、标题、描述、分类徽章 | list.html, index.html |
| `pagination.html` | 基于 `.Paginator` 的标准分页（上一页/下一页+编号） | list.html |
| `protected-modal.html` | TOTP 2FA 验证对话框：6 位 OTP 输入、Telegram Bot 链接、30 天信任 | baseof.html |
| `rc-protect-modal.html` | 右键版权保护模态框：NZ 版权法条文、接受/拒绝按钮 | baseof.html |

---

## 5. 内容类型布局规范

### 5.1 Hugo 路由匹配

```
layouts/
├── index.html         → 首页（/）
├── single.html        → 所有单页的默认模板
├── list.html          → 所有列表页的默认模板
├── taxonomy.html      → 分类法聚合（/tags/、/categories/）
├── friends/list.html  → content/friends/ 下的列表页
└── page/about.html    → content/about/_index.md 的页面模板
```

### 5.2 好友链接规范

内容文件位于 `content/friends/`，front matter 结构：

```yaml
---
title: "博客名"
date: 2026-01-01
description: "简短描述"
link: "https://example.com"
avatar: "https://example.com/avatar.png"
---
```

`layouts/friends/list.html` 使用 `.Pages` 遍历渲染卡片网格（包含 avatar、title、description 和外部链接）。

### 5.3 独立页面规范

`layouts/page/about.html` 渲染 `content/about/_index.md` 的独立页面，支持复杂排版（时间轴生平、技能网格、兴趣卡片）。

---

## 6. Front Matter 规范

### 6.1 文章 Front Matter

全部使用**全小写**键名：

```yaml
---
title: "文章标题"           # 文章标题
date: 2026-01-01            # 发布日期
draft: false                # 是否为草稿
description: "简介"         # 卡片和 meta 中显示
categories: ["技术"]        # 分类（匹配 $catClr 字典）
tags: ["hugo", "theme"]    # 标签
emoji: "🎨"                 # 无配图时作为封面 emoji
cover: "/img/photo.jpg"    # 真实封面图（覆盖 emoji 封面）
author: "作者名"            # 作者
toc: true                   # 启用浮动目录
color: "#7c3aed"           # 生命树节点颜色
protected: true             # 启用 TOTP 保护
---
```

### 6.2 分类颜色映射

首页 `index.html` 中预定义 `$catClr` 字典：

| 分类 | 色值 |
|------|------|
| 技术 | `#7c3aed` |
| AI / ai | `#3b82f6` |
| 读书 | `#10b981` |
| 随笔 | `#f59e0b` |
| 设计 | `#ec4899` |
| 工具 | `#f97316` |
| 默认 | `#7c3aed` |

---

## 7. 配置规范

### 7.1 theme.toml

```toml
name        = "LoveClaude"
license     = "MIT"
description = "一句话描述"
min_version = "0.146.0"

[author]
  name    = "作者名"
  homepage = "https://example.com"

features = [
  "responsive", "dark-mode", "light-mode", "multilingual",
  "protected-articles", "life-tree-homepage", "floating-toc",
  "glass-morphism", "client-side-translation",
]
```

### 7.2 hugo.toml 参数结构

```toml
theme   = 'LoveClaude'
defaultContentLanguage = 'zh'

[params]
  description     = "站点描述"
  heroLabel       = "PERSONAL BLOG"
  heroTitle       = '支持 <span class="gradient-text">HTML</span>'
  heroSubtitle    = "副标题"
  defaultTheme    = "dark"      # "dark" | "light"
  dateFormat      = "Jan 2, 2006"
  showReadingTime = true
  showWordCount   = true
  telegramBotURL  = "https://t.me/yourbot"
  contactEmail    = "you@example.com"

[pagination]
  pagerSize = 6

[outputs]
  home    = ["HTML", "RSS"]
  section = ["HTML", "RSS"]
  page    = ["HTML"]

[markup.highlight]
  style     = "dracula"
  noClasses = true

[markup.goldmark.renderer]
  unsafe = true   # 允许 Markdown 中使用 HTML
```

### 7.3 多语言菜单

```toml
[languages.zh]
  locale = "zh-CN"
  label  = "中文"
  title  = "My Blog"
  weight = 1

  [[languages.zh.menus.main]]
    name   = "文章"
    url    = "/posts/"
    weight = 10
  [[languages.zh.menus.main]]
    name   = "归档"
    url    = "/archives/"
    weight = 20
  [[languages.zh.menus.main]]
    name   = "标签"
    url    = "/tags/"
    weight = 30
  [[languages.zh.menus.main]]
    name   = "友链"
    url    = "/friends/"
    weight = 35
  [[languages.zh.menus.main]]
    name   = "关于"
    url    = "/about/"
    weight = 40
```

---

## 8. 命名规范

### 8.1 模板文件命名

| 范围 | 命名规则 | 示例 |
|------|---------|------|
| 根布局 | 功能名（全小写） | `index.html`, `single.html`, `404.html` |
| Partial | 全小写 + 连字符 | `post-card.html`, `protected-modal.html` |
| 内容类型目录 | 内容类型名（全小写） | `friends/`, `page/` |
| Partial 目录 | 下划线前缀 | `_partials/` |

### 8.2 CSS 命名

- **类名**：BEM 风格，全小写连字符
  - 组件块：`.post-card`, `.ltree-item`, `.site-header`
  - 元素/修饰符：`.ltree-item--left`, `.post-card--protected`
  - 状态：`.prot-digit--error`, `.lc-no-trans`
- **ID**：全小写连字符
  - `#hero-canvas`, `#toc-float`, `#protected-overlay`

### 8.3 JS 命名

- **函数**：驼峰式（`initMobileMenu`, `verifyTOTP`, `initFloatingTOC`）
- **变量**：驼峰式（`treeUnlocked`, `_aesKey`）或大写常量（`THEME_KEY`, `TOTP_SECRET_B32`）
- **类**：首字母大写（`Particles`）

### 8.4 Data 属性

使用 `lc-` 前缀：

- `data-lc-orig` — 原始文本内容（翻译用）
- `data-lc-orig-html` — 原始 HTML 内容（翻译用）
- `data-protected` — 受保护文章标记

### 8.5 localStorage / sessionStorage 键

使用 `loveclaude-` 或 `lc-` 前缀：

| 键 | 作用域 | 用途 |
|---|--------|------|
| `loveclaude-theme` | localStorage | 主题偏好（dark/light） |
| `loveclaude-view` | localStorage | 博客视图模式（grid/list） |
| `loveclaude-lang` | localStorage | 翻译语言 |
| `lc-2fa-trust` | localStorage | 30 天 TOTP 信任 |
| `lc-2fa-session` | sessionStorage | 当前标签页验证状态 |
| `lc-rc-warned` | sessionStorage | 右键保护已确认 |

---

## 9. 资产管道规范

### 9.1 CSS 处理

```go-html-template
{{ $css := resources.Get "css/main.css" | resources.Fingerprint "sha256" }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}">
```

- 单一入口 `assets/css/main.css`，不使用预处理器
- Hugo Pipes 读取 → Fingerprint → 输出带 hash 的文件名

### 9.2 JS 处理

```go-html-template
{{ $js := resources.Get "js/main.js" | resources.Fingerprint "sha256" }}
<script src="{{ $js.RelPermalink }}" defer></script>
```

- 单一入口 `assets/js/main.js`
- `defer` 加载，确保在 DOM 解析完成后执行
- `DOMContentLoaded` 中统一初始化所有模块

### 9.3 字体处理

```go-html-template
{{ $sr := resources.Get "fonts/SourceSerif4-Regular.ttf" | resources.Fingerprint "sha256" }}
<style>
@font-face {
  font-family: 'Source Serif 4';
  src: url('{{ $sr.RelPermalink }}') format('truetype');
  font-display: swap;
  unicode-range: ...;
}
</style>
```

- 字体文件通过 Hugo Pipes 读取并指纹化
- `@font-face` 声明内联在 `<style>` 中
- 拉丁字体 + CJK 字体通过 `unicode-range` 拼合
- CJK 字体**不设** `unicode-range`（避免 CSS minifier 破坏 CJK 码点）

### 9.4 FOUC 防护

```html
<script>
(function(){
  var s = localStorage.getItem('loveclaude-theme');
  var h = new Date().getHours();
  var t = s || (h>=18||h<6||matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.classList.add('lc-no-trans');
})();
</script>
```

- 内联在 `<head>` 中，首个 paint 之前执行
- 检测优先级：localStorage → 时间段 → 系统偏好
- 首帧后移除 `lc-no-trans` class 恢复过渡动画

---

## 10. 设计原则

### 10.1 深色优先

- `<html>` 默认 `data-theme="dark"`
- CSS 变量在 `:root`（深色）和 `[data-theme="light"]` 中分别定义
- 主题切换：localStorage + 时间段检测 + 系统偏好三级降级

### 10.2 零外部依赖

- 无 npm、无 Webpack、无 Tailwind、无 jQuery、无图标库
- 所有 CSS 和 JS 纯手写
- SVG 图标全部内联在模板中

### 10.3 生成式封面系统

无配图时，封面由 **5 层 CSS** 自动生成：

| 层级 | 实现方式 |
|------|---------|
| 1 — 背景色 | CSS `background-color`，分类专属色 |
| 2 — 光晕层 | `radial-gradient` 径向渐变 |
| 3 — 标题水印 | CSS 伪元素 `content: attr()` 渲染标题大字号 |
| 4 — Emoji | CSS 伪元素，hover 放大上浮 |
| 5 — 暗角层 | `box-shadow` 或叠加渐变 |

### 10.4 JS 模块化初始化

所有功能模块在 `DOMContentLoaded` 中顺序初始化：

```javascript
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(resolveTheme());
  initMobileMenu();
  initScrollTop();
  initHeaderScroll();
  initBlogControls();
  initReadingProgress();
  initScrollReveal();
  initCodeCopy();
  initTocHighlight();
  initLanguageSwitcher();
  initImageBlurUp();
  initArticleTree();
  initProtectedModal();
  initRightClickProtection();
  initFloatingTOC();
});
```

### 10.5 响应式断点

| 断点 | 应用 |
|------|------|
| 1024px | 桌面大屏 |
| 900px | 平板/小桌面（浮动 TOC 切换为底部抽屉） |
| 768px | 小平板 |
| 640px | 大屏手机 |
| 480px | 小屏手机 |

### 10.6 无障碍

- `<meta name="description">` 和 `<meta name="author">`
- Open Graph meta（og:title, og:description, og:type, og:url, og:image）
- `aria-label`、`aria-expanded`、`aria-controls`、`aria-hidden`
- 阅读进度条 `aria-hidden="true"`
- `prefers-reduced-motion` 支持（滚动动画、卡片揭示等尊重用户偏好）
- 代码块复制按钮 `aria-label="复制代码"`

### 10.7 安全性

- TOTP 基于 RFC 6238，使用 Web Crypto API 实现
- AES-GCM 内容加密，解密在客户端完成
- 密钥以 Base32 明文存在于构建后的 JS 中 → 仅适合个人博客
- 右键保护通过 `contextmenu` 事件拦截 + 法律条文模态框实现

---

## 11. 总结：创作规范总表

| 维度 | 规范 |
|------|------|
| 模板文件命名 | 全小写 + 连字符 |
| Partial 目录 | `_partials/` 下划线前缀 |
| 内容类型目录 | 全小写匹配内容类型 |
| CSS 类 | BEM 风格连字符，组件块 + 修饰符 `--` |
| CSS ID | 全小写连字符 |
| JS 函数 | 驼峰式 `init` 前缀 |
| JS 变量 | 驼峰式或 SCREAMING_SNAKE_CASE |
| data 属性 | `lc-` 前缀 |
| localStorage | `loveclaude-` 或 `lc-` 前缀 |
| Front matter | 全小写键名 |
| 分类色值预设 | `$catClr` 字典 6 种分类色 |
| 资产处理 | Hugo Pipes + Fingerprint sha256 |
| 字体 | 自托管，@font-face 内联，unicode-range 拼合 |
| 无依赖 | 零 npm/框架/外部资源 |
| JS 加载 | 单文件 + `defer` + DOMContentLoaded 统一初始化 |
| 主题切换 | localStorage → 时间段 → 系统偏好三级降级 |
| FOUC 防护 | `<head>` 首行内联 JS |
