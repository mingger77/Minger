# Mingger

> 一款简单清爽的 [Hugo](https://gohugo.io/) 个人博客主题，灵感来自 Anthropic 风格，温暖米色系。

![Hugo](https://img.shields.io/badge/Hugo-%5E0.146.0-ff4088?style=flat-square&logo=hugo)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 功能特性

- **极简设计** — 干净布局，温暖米色配色
- **零外部依赖** — 无 JS 框架、无图标库、无 CDN 字体
- **响应式适配** — 移动端优先，768px 以下自动单列
- **RSS 支持** — 自动生成文章 RSS 订阅
- **SVG 鸽子水印** — 每页背景的 signature 元素
- **自定义网站图标** — 简单配置即可更换 favicon
- **中文友好** — 导航和默认文案均为中文

---

## 截图

<!-- TODO: 添加截图 -->

---

## 快速开始

### 1. 安装 Hugo

需要 Hugo **≥ 0.146.0**：

```bash
hugo version
```

### 2. 使用主题

将主题放在 Hugo 站点的 `themes/Mingger/` 目录下，然后在站点根目录的 `hugo.toml` 中添加：

```toml
theme = 'Mingger'
```

### 3. 启动开发服务器

```bash
hugo server
```

或直接在 exampleSite 中预览：

```bash
cd themes/Mingger/exampleSite
hugo server --themesDir ../..
```

---

## 目录结构

```
your-site/
├── hugo.toml              # 站点配置
├── content/
│   ├── _index.md          # 首页内容（可选）
│   ├── posts/             # 文章目录
│   │   ├── my-first-post.md
│   │   └── ...
│   └── about/
│       └── _index.md      # 关于页
└── themes/
    └── Mingger/           # 主题文件
```

### 主题内部结构

```
themes/Mingger/
├── theme.toml             # 主题元数据
├── LICENSE                # MIT 许可证
├── assets/
│   ├── css/main.css       # 全部样式
│   └── js/main.js         # 极简 JavaScript
├── layouts/
│   ├── baseof.html         # 基础模板
│   ├── index.html          # 首页
│   ├── list.html           # 文章列表
│   ├── single.html         # 文章详情
│   ├── 404.html            # 404 页面
│   ├── page/
│   │   └── about.html      # 关于页模板
│   ├── about/
│   │   └── list.html       # 备选关于页布局
│   └── _partials/
│       ├── head.html       # HTML head
│       ├── header.html     # 导航栏
│       ├── footer.html     # 页脚
│       └── dove.html       # SVG 鸽子水印
├── exampleSite/            # 示例站点
└── cooperation_with_AI/    # AI 协作开发文档
```

---

## 配置说明

### 站点配置（hugo.toml）

```toml
baseURL = 'https://example.org/'
theme   = 'Mingger'
defaultContentLanguage = 'zh'

[params]
  blogName    = "你的博客名称"     # 主页显示的博客名
  description = "你的博客简介"     # 主页介绍文字
  homeExtra   = "额外内容"        # 首页右侧额外内容块（支持 Markdown）
  favicon     = "/favicon.ico"    # 网站图标路径（放在 static/ 下）

[outputs]
  home    = ["HTML"]
  section = ["HTML", "RSS"]
  page    = ["HTML"]

[markup.goldmark.renderer]
  unsafe = true   # 允许 Markdown 中使用 HTML
```

### 参数说明

| 参数 | 说明 | 是否必填 |
|------|------|---------|
| `params.blogName` | 主页显示的博客名 | 可选（默认使用 `title`） |
| `params.description` | 博客介绍文字 | 可选 |
| `params.homeExtra` | 首页右侧额外内容（支持 Markdown） | 可选 |
| `params.favicon` | 网站图标路径 | 可选 |

---

## 内容管理

### 创建文章

在 `content/posts/` 下创建 Markdown 文件：

```markdown
---
title: "我的第一篇文章"
date: 2026-06-30
draft: false
---

这里是正文……
```

### 前注字段

| 字段 | 说明 | 示例 |
|------|------|------|
| `title` | 文章标题 | `"我的文章"` |
| `date` | 创作时间 | `2026-06-30` |
| `draft` | 是否为草稿 | `false` |

### 编辑关于页面

编辑 `content/about/_index.md`：

```markdown
---
title: "关于"
description: "一句话描述"
info:
  name: "你的名字"
  bio: "个人简介"
contact:
  - label: "GitHub"
    value: "yourname"
  - label: "邮箱"
    value: "you@example.com"
---

这里是正文内容……
```

### 自定义网站图标

将图标文件放在站点根目录的 `static/` 下，然后在 `hugo.toml` 中指定路径：

```toml
[params]
  favicon = "/favicon.ico"
```

---

## 开发指南

- **CSS**：编辑 `assets/css/main.css` — 所有样式集中在一个文件，使用 CSS 自定义属性
- **JS**：编辑 `assets/js/main.js` — 极简原生 JavaScript
- **模板**：编辑 `layouts/` 下的文件 — Hugo Go HTML 模板
- CSS 和 JS 均通过 [Hugo Pipes](https://gohugo.io/hugo-pipes/) 处理，带 SHA-256 指纹缓存

---

## 许可证

[MIT](LICENSE) © 2026 [mingger77](https://github.com/mingger77)

---

## 致谢

- 设计灵感来源于 [Anthropic](https://www.anthropic.com/)
- Hugo 主题结构参考 [LoveClaude](https://github.com/mingger77/LoveClaude)
- 基于 [Hugo](https://gohugo.io/) 构建
- AI 辅助开发
