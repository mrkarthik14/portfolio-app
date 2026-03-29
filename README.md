<div align="center">
  <img src="public/screenshot.png" alt="Portfolio Preview" width="100%" />

  # 🎨 Charan Karthik - Data Analyst & Aspiring Data Scientist Portfolio
  
  **🌍 Live Site:** [charan-karthik-nayakanti-portfolio.netlify.app](https://charan-karthik-nayakanti-portfolio.netlify.app/)

  A modern, production-ready personal portfolio built for data professionals, featuring automated GitHub sync, an interactive analytics dashboard, and a seamless Pantone pastel design.
</div>

---

## ✨ Features & Visuals

- 🔄 **Automatic GitHub Sync** — Projects update dynamically when you push to GitHub, ensuring your portfolio is never out of date.
- 📊 **Analytics Dashboard** — Visualize your GitHub activity and repos by language with sleek charts (Recharts) + external Data Viz embeds (Tableau/PowerBI).
- 🎨 **Premium Aesthetic** — Uses a Pantone pastel color palette with glassmorphism UI, smooth Framer Motion animations, and a rich dark/light mode toggle.
- 📱 **Fully Responsive Layout** — Optimized for all devices from mobile screens to 4K desktop displays.
- 📝 **Integrated Blog & LinkedIn Post Management** — Manages markdown-based articles and LinkedIn updates effortlessly.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
cd portfolio-app
npm install

# 2. Generate Prisma client & create initial database
npx prisma generate
npx prisma db push

# 3. Run development server
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

*(Optional variables available for extended functionality such as GitHub OAuth, LinkedIn API access, and Dashboard Embeds.)*

---

## 📁 Folder Structure

```
portfolio-app/
├── content/              # Blog posts (Markdown) + LinkedIn data (JSON)
├── prisma/               # Database models
├── public/               # Images and static assets
├── src/
│   ├── app/              # Next.js App Router pages + API routes
│   ├── components/       # React components
│   ├── lib/              # Utils logic
│   ├── theme/            # MUI custom theme
│   └── types/            # TypeScript interfaces
└── netlify/              # Netlify Build Plugins
```

---

## 🚀 Deployment

The site is currently deployed on **Netlify**:

```bash
netlify deploy --prod
```

It is also fully compatible with Vercel.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **UI:** Material UI 6 + Framer Motion
- **Database:** Prisma + SQLite (dev) / PostgreSQL (prod)
- **Charts:** Recharts
- **Blog:** Markdown + `react-markdown` + `remark-gfm`
- **Auth-ready:** NextAuth.js
- **Deployment:** Netlify Ready

---

## 📄 License

MIT
