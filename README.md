# Sendworthy: creative agency website

This is a production-ready website for a growth and creative studio. It is built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion** and **React Three Fiber**, and is ready to deploy on **Vercel** with a custom domain.

- Research behind the build: [`docs/RESEARCH.md`](docs/RESEARCH.md)
- Design direction and tokens: [`docs/DESIGN.md`](docs/DESIGN.md)

## Stack and why

| Choice | Why |
|---|---|
| Next.js 16 (App Router, static generation) | SEO-friendly server-rendered HTML, per-page metadata, sitemap and robots from code, image/font optimisation, API route for the form |
| TypeScript | Safer edits to content and config |
| Tailwind CSS v4 | Small CSS output, design tokens as CSS variables (light/dark) |
| Framer Motion (`LazyMotion`) | Page curtain transitions, scroll-linked effects (horizontal work rail, word-by-word statement, process line), springy tabs, nav and previews |
| three.js + React Three Fiber + drei | The hero's floating 3D "reactions" (heart, paper plane, play button…). Lazy-loaded in the browser only (`next/dynamic`, `ssr: false`), lit with in-code Lightformers (no downloaded HDRs), pauses off-screen, static under reduced motion, lower detail on phones |
| Bricolage Grotesque + Geist (`next/font`) | A heavy, condensed variable display face for headlines and a clean sans for body. Self-hosted, no layout shift |
| next-themes | Light/dark/system theme without flash, remembered per visitor |
| Cal.com embed | Real booking with timezones, confirmations, reminders and calendar sync |
| Resend or webhook | Real enquiry delivery by email or to Slack/Zapier/CRM |
| zod | One validation schema shared by the browser and the server |
| Markdown blog (`gray-matter` + `marked`) | Add an article by adding a `.md` file |

## Pages

- `/`: 3D hero, crossed marquee tapes, interactive services list, scroll-lit manifesto and process, horizontal work rail, "What platforms reward right now" (sourced), process, engagement models, FAQ, quick enquiry
- `/services` and `/services/[slug]`: 8 service pages with Service + FAQ structured data
- `/work` and `/work/[slug]`: case studies (currently **concept projects**, clearly labelled)
- `/about`: story, values, disciplines; team section appears when you add real people
- `/insights` and `/insights/[slug]`: Markdown blog with BlogPosting schema and per-article social images
- `/contact`: full enquiry form, with an inline Cal.com calendar after sending
- `/book`: discovery-call booking
- `/privacy`, `/terms`, `/cookies`: legal templates
- Also included: a custom 404, an error page, `sitemap.xml`, `robots.txt`, web manifest, icons and Open Graph images

## Run it locally

Requires **Node.js 20.9+** (22 LTS recommended).

```bash
npm install
cp .env.example .env.local   # Windows PowerShell: Copy-Item .env.example .env.local
npm run dev                  # http://localhost:3000
```

Quality checks:

```bash
npm run typecheck   # TypeScript
npm run lint        # ESLint (Next.js core-web-vitals rules)
npm run build       # production build
npm run start       # serve the production build locally
```

On Windows you can also double-click `scripts\verify.cmd`. It installs packages and runs the typecheck, lint and build, and writes the output to `verify-log.txt`. `scripts\start-production.cmd` serves the build at http://localhost:3000.

> **Tip for Windows + OneDrive:** `node_modules` and `.next` contain thousands of files. If OneDrive syncing slows things down, move the project outside OneDrive (e.g. `C:\dev\sendworthy`) or pause syncing while you work.

## Make it yours (do this before launch)

1. **`src/lib/site.ts`**: name, email, phone, WhatsApp, location, hours, social links, budget ranges. Empty values are hidden on the site.
2. **`src/content/work.ts`**: replace the four concept projects with real client work. Only add `results` you can verify and have permission to publish.
3. **Testimonials and team**: add real entries to `site.testimonials` and `site.team`. Those sections appear automatically.
4. **`src/content/services.ts`, `src/content/home.ts`**: review every service, FAQ and engagement model so they match how you actually work.
5. **Legal pages**: fill in your legal entity and have a qualified advisor review them.
6. **Platform insights** (`src/content/home.ts`): the figures come from third-party sources cited on the page. Re-check them every few months.

## Environment variables

Copy `.env.example` and fill in what you use. Every variable is optional except `NEXT_PUBLIC_SITE_URL` in production.

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your domain, e.g. `https://www.yourbrand.com`. Used for canonical URLs, sitemap and Open Graph |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container (`GTM-XXXXXXX`) |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID (`G-XXXXXXX`). Only used if GTM is **not** set, to avoid double counting |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML-tag token |
| `NEXT_PUBLIC_CAL_LINK` | Cal.com event path, e.g. `yourname/discovery-call` |
| `NEXT_PUBLIC_CAL_ORIGIN` | `https://app.cal.com` (default) or `https://app.cal.eu` |
| `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, `ENQUIRY_TO_EMAIL` | Deliver enquiries by email via Resend |
| `ENQUIRY_WEBHOOK_URL` | Also/instead POST enquiries as JSON to Slack, Zapier, Make, n8n, a CRM… |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Optional Cloudflare Turnstile spam check |

### How the forms behave

- Validation runs in the browser and again on the server (same zod schema).
- Spam protection comes from a honeypot field, a minimum fill time, per-IP rate limiting and optional Turnstile.
- If **no delivery method is configured**, the form says so honestly and points visitors to your email address. It never shows a fake success message.
- After a successful send on `/contact`, the Cal.com calendar appears with the visitor's name, email and message already filled in.

## Booking (Cal.com)

1. Create a free account at [cal.com](https://cal.com) and an event type, e.g. "Discovery call", 30 minutes, with Google Meet or Zoom.
2. Connect your calendar so busy times are blocked.
3. Set `NEXT_PUBLIC_CAL_LINK=yourname/discovery-call` and redeploy.

Cal.com handles timezones (it shows each visitor their local time), confirmations, reminders and rescheduling. Until the variable is set, `/book` shows a clear fallback asking visitors to send a brief instead.

## Enquiry email (Resend)

1. Sign up at [resend.com](https://resend.com) and **verify your domain** (they give you DNS records to add).
2. Create an API key and set `RESEND_API_KEY`.
3. Set `ENQUIRY_FROM_EMAIL` (an address on your verified domain) and `ENQUIRY_TO_EMAIL` (your inbox; separate several addresses with commas).

Each enquiry email has `reply-to` set to the visitor, so you can reply straight from your inbox.

## Analytics: Google Tag Manager, GA4 and consent

The site implements **Google Consent Mode v2**. All storage is `denied` by default and set **before** GTM loads. The cookie banner updates consent when the visitor chooses, and the choice is re-applied on every page load. Visitors can change it later from **Cookie settings** in the footer.

### Recommended setup (GTM)

1. Create a GTM container at [tagmanager.google.com](https://tagmanager.google.com) and set `NEXT_PUBLIC_GTM_ID`.
2. In GTM, add a **Google tag** with your GA4 Measurement ID, triggered on **Initialization – All Pages**.
3. Create a **Custom Event** trigger matching the regex `^(generate_lead|book_call_click|booking_completed|contact_click)$`.
4. Add a **GA4 Event** tag with event name `{{Event}}`. Add the event parameters you care about from Data Layer Variables: `cta_location`, `form_source`, `form_variant`, `services`, `budget`, `method`.
5. In GA4, go to **Admin > Events** and mark `generate_lead` and `booking_completed` as **key events** (conversions).
6. GA4 enhanced measurement ("page changes based on browser history events") records page views for client-side navigation. Keep it on.
7. Use GTM **Preview** to confirm that the events fire once each.

### Without GTM

Set only `NEXT_PUBLIC_GA_ID`. GA4 loads directly and receives the same events.

### Events sent

| Event | When | Main parameters |
|---|---|---|
| `generate_lead` | Enquiry delivered successfully (once per submission) | `form_source`, `form_variant`, `services`, `budget` |
| `book_call_click` | Any "Book a call" CTA | `cta_location` |
| `booking_completed` | Cal.com confirms a booking (once per booking) | `method`, `cta_location` |
| `contact_click` | Email, phone or WhatsApp link clicked | `method`, `cta_location` |

## Google Search Console

1. Add a **URL-prefix property** for `https://www.yourbrand.com` (or a Domain property via DNS).
2. Choose **HTML tag** verification, copy the `content="..."` value into `NEXT_PUBLIC_GSC_VERIFICATION`, redeploy, then click Verify.
3. Submit `https://www.yourbrand.com/sitemap.xml` under **Sitemaps**.

## Deploy to Vercel

1. Push this folder to a GitHub repository:
   ```bash
   git init && git add . && git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In [vercel.com](https://vercel.com), choose **Add New > Project** and import the repository. The framework preset is detected automatically (build command `next build`).
3. Add the environment variables (Project > Settings > Environment Variables) for **Production**, and for **Preview** if you want forms to work on preview links.
4. Click **Deploy**.

Preview deployments automatically serve a `robots.txt` that blocks crawling, so they never compete with your real domain.

### Connect your custom domain

1. In Vercel, go to **Project > Settings > Domains** and add `yourbrand.com` and `www.yourbrand.com`.
2. Choose one as primary (we recommend `www`) and set the other to **redirect** to it. That makes canonicalisation automatic.
3. At your domain registrar, add the DNS records that Vercel shows. Usually:
   - `A` record for `@` pointing to Vercel's IP (shown in the dashboard)
   - `CNAME` record for `www` pointing to the Vercel target (shown in the dashboard)
4. Wait for DNS to propagate (minutes to a few hours). Vercel issues the **HTTPS certificate automatically**. The site sends HSTS headers, so always use `https://`.
5. Set `NEXT_PUBLIC_SITE_URL` to the primary domain and redeploy.

Other hosts (Netlify, Render, a Node server) work too: run `npm run build && npm run start` on Node 20.9+.

## Security and performance notes

- Security headers (HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) are set in `next.config.ts`.
- No Content-Security-Policy is set by default, because GTM can load arbitrary tags. If you lock down GTM, add a CSP that allows `googletagmanager.com`, `google-analytics.com`, your Cal origin and `challenges.cloudflare.com`.
- The rate limiter is in-memory (per server instance). For high traffic, swap it for Upstash Redis.
- Pages are statically generated, fonts are self-hosted by `next/font`, the calendar is lazy-loaded, and off-screen sections use `content-visibility`. Motion respects `prefers-reduced-motion`. The three.js bundle is split off the main bundle and loads after the page is interactive, so the headline stays the largest contentful paint.

## Project structure

```
src/
  app/                 routes, metadata, sitemap, robots, OG images, API route
  components/          UI (Header, Hero, three/ (WebGL hero), ui/ (Spotlight), forms, booking…)
  content/             services, work, home content, insights/*.md
  lib/                 site config, SEO, analytics, consent, validation
docs/                  research and design notes
```
