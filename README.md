# 🎨 Personal Portfolio — Auto-Sync Dashboard

A modern, production-ready personal portfolio with:
- 🔄 **Automatic GitHub sync** — projects update when you push to GitHub
- 📝 **LinkedIn posts** integration (manual JSON + API-ready)
- 📊 **Analytics dashboard** with charts + external embed support
- 🎨 **Pantone pastel design** with glassmorphism, dark/light mode
- 📱 **Fully responsive** — looks great on every screen

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
cd portfolio-app
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Create initial database
npx prisma db push

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the portfolio immediately.

---

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | Defaults to `file:./dev.db` (SQLite) |
| `GITHUB_USERNAME` | ✅ | Your GitHub username |
| `GITHUB_ACCESS_TOKEN` | ⬜ | For private repos + higher rate limits |
| `GITHUB_CLIENT_ID` | ⬜ | GitHub OAuth App client ID |
| `GITHUB_CLIENT_SECRET` | ⬜ | GitHub OAuth App client secret |
| `LINKEDIN_ACCESS_TOKEN` | ⬜ | LinkedIn API token (if approved) |
| `NEXT_PUBLIC_DASHBOARD_EMBED_URL` | ⬜ | Tableau/Looker/Power BI embed URL |
| `NEXTAUTH_SECRET` | ✅ | Run `openssl rand -base64 32` |
| `CRON_SECRET` | ⬜ | Protects the cron endpoint on Vercel |

---

## 📁 Folder Structure

```
portfolio-app/
├── content/              # Blog posts (Markdown) + LinkedIn data (JSON)
│   ├── blog/             # .md files — auto-discovered
│   ├── linkedin-posts.json
│   └── linkedin-stats.json
├── prisma/
│   └── schema.prisma     # Database models
├── public/
│   └── resume.pdf        # Your downloadable resume
├── src/
│   ├── app/              # Next.js App Router pages + API routes
│   │   ├── api/          # REST endpoints (github, linkedin, cron, contact)
│   │   ├── about/        # About + Skills + Resume
│   │   ├── admin/        # Sync controls
│   │   ├── blog/         # Markdown blog
│   │   ├── contact/      # Contact form
│   │   ├── dashboard/    # Analytics + charts
│   │   ├── posts/        # LinkedIn posts
│   │   └── projects/     # GitHub projects
│   ├── components/       # 18 React components
│   ├── lib/              # GitHub, LinkedIn, blog, analytics utils
│   ├── theme/            # MUI custom theme + ThemeProvider
│   └── types/            # TypeScript interfaces
└── vercel.json           # Cron config for auto-sync
```

---

## 🎨 Design System

**Pantone-inspired pastel palette:**

| Color | Hex | Usage |
|-------|-----|-------|
| Pastel Blue | `#A7C7E7` | Primary, links, accents |
| Pastel Lavender | `#C3B1E1` | Secondary, gradients |
| Pastel Mint | `#B8E0D2` | Success, data viz |
| Pastel Peach | `#FFD1BA` | Warm accents |
| Pastel Yellow | `#FFF2B2` | Highlights |

**Features:** Glassmorphism cards, soft shadows, gradient buttons, dark/light mode toggle, Inter + Outfit fonts.

---

## 🔄 Auto-Sync Setup

### GitHub
1. The app fetches repos via the GitHub API automatically
2. **Webhook (real-time):** In your GitHub settings, add a webhook:
   - URL: `https://your-domain.com/api/github/webhook`
   - Secret: Match `GITHUB_WEBHOOK_SECRET` in `.env`
   - Events: Push, Repository, Create
3. **Cron (every 6 hours):** Configured in `vercel.json`

### LinkedIn
1. **Recommended:** Edit `content/linkedin-posts.json` manually
2. **API:** If you have LinkedIn Marketing Developer Platform access, set `LINKEDIN_ACCESS_TOKEN`

---

## 📊 Analytics Dashboard

The dashboard page shows:
- GitHub activity over time (area chart)
- Repos by language (pie chart)
- LinkedIn engagement trends (bar chart)
- External dashboard embed (Tableau/Looker/Power BI via iframe)

To embed an external dashboard, set `NEXT_PUBLIC_DASHBOARD_EMBED_URL` in `.env`.

---

## 📝 Blog

Add Markdown files to `content/blog/`:

```markdown
---
title: "My Post Title"
date: "2026-02-16"
description: "A brief description"
tags: ["React", "Next.js"]
---

Your blog content here...
```

Posts auto-appear on `/blog` sorted by date.

---

## 🚀 Deployment

### Vercel (recommended)
```bash
npm i -g vercel
vercel deploy
```

Set environment variables in the Vercel dashboard. The cron job for auto-sync is configured in `vercel.json`.

### Netlify
```bash
netlify deploy --prod
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **UI:** Material UI 6 + Framer Motion
- **Database:** Prisma + SQLite (dev) / PostgreSQL (prod)
- **Charts:** Recharts
- **Blog:** Markdown + react-markdown + remark-gfm
- **Auth-ready:** NextAuth.js
- **Deployment:** Vercel/Netlify compatible

---

## 📄 License

MIT
