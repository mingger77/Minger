# Mingger

> A simple, clean personal blog theme for [Hugo](https://gohugo.io/) — Anthropic-inspired, warm beige tones.
> Built-in dark mode with one-click toggle.

![Hugo](https://img.shields.io/badge/Hugo-%5E0.146.0-ff4088?style=flat-square&logo=hugo)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## Features

- **Minimalist design** — clean layout, warm beige / dark gray-blue palette
- **Dark mode** — dark by default, toggle via dove icon in header, persisted to localStorage
- **Zero external dependencies** — no JS frameworks, no icon libraries, no CDN fonts
- **Responsive** — mobile-first, single-column on screens under 768px
- **RSS support** — auto-generated RSS feed for posts
- **SVG dove watermark** — signature background element on every page
- **Custom favicon** — easily configurable
- **Chinese-first UI** — navigation and default labels in Chinese

---

## Screenshots

<!-- TODO: Add screenshots here -->

---

## Quick Start

### 1. Install Hugo

Requires Hugo **≥ 0.146.0**:

```bash
hugo version
```

### 2. Use the theme

Copy this theme to your Hugo site's `themes/Mingger/` directory, then add to your site's `hugo.toml`:

```toml
theme = 'Mingger'
```

### 3. Start the dev server

```bash
hugo server
```

Or preview directly with the exampleSite:

```bash
cd themes/Mingger/exampleSite
hugo server --themesDir ../..
```

---

## Directory Structure

```
your-site/
├── hugo.toml              # Site configuration
├── content/
│   ├── _index.md          # Home page content (optional)
│   ├── posts/             # Blog posts directory
│   │   ├── my-first-post.md
│   │   └── ...
│   └── about/
│       └── _index.md      # About page
└── themes/
    └── Mingger/           # Theme files
```

### Theme structure

```
themes/Mingger/
├── theme.toml             # Theme metadata
├── LICENSE                # MIT License
├── assets/
│   ├── css/main.css       # All styles (includes dark mode variables)
│   └── js/main.js         # Theme toggle + smooth scroll
├── layouts/
│   ├── baseof.html         # Base template
│   ├── index.html          # Homepage
│   ├── list.html           # Post list
│   ├── single.html         # Single post
│   ├── 404.html            # 404 page
│   ├── page/
│   │   └── about.html      # About page template
│   ├── about/
│   │   └── list.html       # Alternative about layout
│   └── _partials/
│       ├── head.html       # HTML head
│       ├── header.html     # Navigation bar (blog name on left, links + toggle on right)
│       ├── footer.html     # Footer
│       └── dove.html       # SVG dove watermark
├── exampleSite/            # Example site for preview
└── cooperation_with_AI/    # AI-assisted development docs
```

---

## Configuration

### Site config (`hugo.toml`)

```toml
baseURL = 'https://example.org/'
theme   = 'Mingger'
defaultContentLanguage = 'zh'

[params]
  blogName    = "你的博客名称"     # Name displayed on homepage
  description = "你的博客简介"     # Subtitle on homepage
  homeExtra   = "额外内容"        # Optional extra block on homepage (Markdown supported)
  favicon     = "/favicon.ico"    # Favicon path (place in static/)

[outputs]
  home    = ["HTML"]
  section = ["HTML", "RSS"]
  page    = ["HTML"]

[markup.goldmark.renderer]
  unsafe = true   # Allow HTML in Markdown
```

### Parameter reference

| Parameter | Description | Required |
|-----------|-------------|----------|
| `params.blogName` | Blog name on homepage | Optional (defaults to `title`) |
| `params.description` | Blog subtitle | Optional |
| `params.homeExtra` | Extra content in right panel (Markdown) | Optional |
| `params.favicon` | Favicon path | Optional |

---

## Content Management

### Creating posts

Create Markdown files in `content/posts/`:

```markdown
---
title: "My First Post"
date: 2026-06-30
draft: false
---

Content here...
```

### Front matter fields

| Field | Description | Example |
|-------|-------------|---------|
| `title` | Post title | `"My Post"` |
| `date` | Publish date | `2026-06-30` |
| `draft` | Is draft | `false` |

### Editing the About page

Edit `content/about/_index.md`:

```markdown
---
title: "About"
description: "A short description"
info:
  name: "Your Name"
  bio: "A brief bio"
contact:
  - label: "GitHub"
    value: "yourname"
  - label: "Email"
    value: "you@example.com"
---

Extra content here...
```

### Custom favicon

Place your favicon in `static/` and configure in `hugo.toml`:

```toml
[params]
  favicon = "/favicon.ico"
```

---

## Development

- **CSS**: Edit `assets/css/main.css` — all styles in one file, CSS custom properties; `:root` for light mode, `[data-theme="dark"]` for dark mode
- **JS**: Edit `assets/js/main.js` — theme toggle (localStorage) + anchor smooth scroll
- **Templates**: Edit files in `layouts/` — Hugo Go HTML templates
- Both CSS and JS are processed through [Hugo Pipes](https://gohugo.io/hugo-pipes/) with SHA-256 fingerprinting

---

## License

[MIT](LICENSE) © 2026 [mingger77](https://github.com/mingger77)

---

## Acknowledgements

- Design inspiration from [Anthropic](https://www.anthropic.com/)
- Hugo theme structure reference [LoveClaude](https://github.com/mingger77/LoveClaude)
- Built with [Hugo](https://gohugo.io/)
- Developed with AI assistance
