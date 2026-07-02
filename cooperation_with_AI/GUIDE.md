# Mingger 主题使用指南

> Mingger 是一个简单清爽的 Hugo 个人博客主题。
> 风格参考 Anthropic，追求简洁与舒适。
> 支持暗色模式，默认暗色，一键切换。

---

## 目录

- [快速开始](#快速开始)
- [目录结构](#目录结构)
- [配置说明](#配置说明)
- [内容管理](#内容管理)
- [暗色模式](#暗色模式)
- [常见问题](#常见问题)

---

## 快速开始

### 1. 安装 Hugo

确保已安装 Hugo **≥ 0.146.0**：

```bash
hugo version
```

### 2. 使用主题

将主题放置在 Hugo 站点的 `themes/Mingger` 目录下，然后在站点根目录的 `hugo.toml` 中添加：

```toml
theme = 'Mingger'
```

### 3. 启动开发服务器

```bash
hugo server -t Mingger
```

或者直接在 Mingger 主题的 exampleSite 中预览：

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
│   │   ├── first-post.md
│   │   └── ...
│   └── about/
│       └── _index.md      # 关于页
└── themes/
    └── Mingger/           # 主题文件
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
  description = "你的博客简介"     # 主页介绍的介绍文字
  homeExtra   = "额外内容"        # 主页右侧深米色方块内的额外文字（支持 Markdown）
  favicon     = "/favicon.ico"    # 网站图标路径（可选）

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
| `params.blogName` | 主页显示的博客名称 | 可选（默认使用 `title`） |
| `params.description` | 博客介绍文字 | 可选 |
| `params.homeExtra` | 主页右侧深米色方块内的额外文字（支持 Markdown） | 可选 |
| `params.favicon` | 网站图标路径（放在 `static/` 下） | 可选 |

---

## 内容管理

### 创建文章

在 `content/posts/` 下创建 Markdown 文件：

```markdown
---
title: "文章标题"
date: 2026-06-30
draft: false
---

这里是正文。
```

### 前注字段

| 字段 | 说明 | 示例 |
|------|------|------|
| `title` | 文章标题 | `"我的第一篇文章"` |
| `date` | 创作时间 | `2026-06-30` |
| `draft` | 是否为草稿 | `false` |

### 编辑关于页

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

## 暗色模式

Mingger 默认以暗色模式加载，顶栏右侧的鸽子图标可一键切换明/暗模式。

- **暗色模式**：深青灰色背景、深绿色顶底栏、纯黑色鸽子水印、浅色文字
- **亮色模式**：温暖米色背景、深米黄色顶底栏、深米色鸽子水印、深色文字
- **持久化**：切换后的模式会自动保存，刷新页面或再次访问时保持不变
- **切换按钮**：顶栏右侧的迷你鸽子 SVG 图标，暗色模式下为白色，亮色模式下为黑色

无需额外配置，即开即用。

---

## 常见问题

**Q: 如何修改主页显示的博客名称？**
A: 在 `hugo.toml` 中设置 `[params] blogName = "你的名称"`。

**Q: 如何修改顶部导航的链接文字？**
A: 编辑 `layouts/_partials/header.html` 中的 `<a>` 标签文字和左侧博客名。

**Q: 如何添加更多页面？**
A: 在 `layouts/` 下创建对应的模板，然后在 `content/` 下创建内容文件。

**Q: 如何关闭暗色模式？**
A: 点击顶栏右侧的鸽子图标即可切换到亮色模式，模式会被浏览器记住。

---

> 更多信息请访问 [GitHub](https://github.com/mingger77)
