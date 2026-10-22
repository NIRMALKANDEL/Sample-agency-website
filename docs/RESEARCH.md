# Research summary

Research was carried out on 22 October 2026 with web search and by reading the sources below. Perplexity was not connected to this session, so standard web search was used instead. Figures are as reported by each source. They are third-party claims, not independently verified, so check them again before quoting them in sales material.

## 1. Growth marketing on Instagram

From [SocialPilot, Instagram Reels algorithm 2026](https://www.socialpilot.co/de/blog/instagram-reels-algorithm):

- **Sends (DM shares) are the strongest ranking signal.** For reach to non-followers they are reportedly weighted 3 to 5 times more than likes.
- **Watch time and completion come next.** A short Reel that people watch to the end beats a long one that they drop.
- **Originality is enforced.** Content that reuses 70% or more of another creator's visuals or audio is flagged. Since April 2026 this also applies to photos and carousels. Watermarked reposts are demoted.
- **Trial Reels** (for accounts with 1,000+ followers) are shown to non-followers first. They are a low-risk way to test new formats.
- **Length:** Reels can run up to 20 minutes, but non-follower recommendations reportedly cap at about 3 minutes.
- **Topic controls ("Your Algorithm")** now cover Reels, Explore and Feed. Keyword-rich captions matter more than hashtags.
- **Tactics:** hook in the first ~3 seconds (motion or on-screen text within ~0.5 s), stay ~90% on-niche, and aim for 3 to 4 strong Reels a week rather than a high volume of weak ones.

Other references: [Metricool Reels guide](https://metricool.com/instagram-reels-guide/), [Sendible follower strategies](https://www.sendible.com/insights/how-to-get-more-followers-on-instagram), [ContentGrip on influencer marketing](https://www.contentgrip.com/instagram-influencer-marketing/).

## 2. Other platforms

From [Whitehat SEO, social media strategy](https://whitehat-seo.co.uk/blog/social-media-strategy):

- **LinkedIn:** company-page posts reach only 1 to 2% of the feed. Personal profiles reportedly reach 561% more people than company pages with the same content. The best formats are multi-image posts, PDF carousels and native video. External links carry a reach penalty of about 60%. The recommended model is founder- or employee-led.
- **TikTok:** increasingly used by B2B decision-makers. The 35 to 54 age group is the fastest-growing segment. Educational, keyword-led short videos work well because TikTok also serves as a search engine.
- **YouTube:** channels that combine Shorts and long-form reportedly grow 41% faster. YouTube is the social platform most often cited in Google AI Overviews.
- **Facebook:** Meta's AI targeting makes paid campaigns relevant again for B2B.
- **Reddit:** heavily surfaced in Google results and AI answers.
- **Across platforms:** reduce posting volume and invest in depth. Saves, shares and DMs now outweigh comments.

## 3. What converts on agency websites

From [Unicorn Platform](https://unicornplatform.com/blog/agency-portfolio-sites-in-2026), [ManyRequests](https://manyrequests.com/blog/agency-website/) and [RNO1](https://blog.rno1.com/4-best-practices-to-enhance-your-agency's-website-for-growth):

- **First screen:** say who you help and the outcome, with one primary CTA and one proof cue.
- **Navigation:** 4 to 6 plain labels ("Work", not "The magic"), with key pages one or two clicks away.
- **Case studies:** use a consistent sequence (context, challenge, approach, work, outcome, next step). Show a few sharp studies rather than a big gallery, and end every study with a CTA.
- **CTA wording:** use specific, intent-matched labels ("Book a discovery call", "Tell us about your brand"). "Let's talk" does too little work.
- **Lead capture:** offer a primary CTA for ready buyers and a secondary one for people who want proof first. Provide alternatives to forms (email, phone, WhatsApp).
- **Trust:** real people, clear contact details, privacy and terms pages, and transparent engagement models.

## 4. Enquiry and booking UX

From [GrowthSpree, analysis of 300+ demo pages](https://www.growthspreeofficial.com/blogs/b2b-saas-demo-page-conversion-killers-300-companies-analyzed):

- Each field beyond the core five reportedly cuts conversion by 10 to 15%. Aim for 5 to 7 fields, with qualifiers as quick picks.
- Sending people from a form to a separate scheduling page loses 30 to 50% of them. **Embed the calendar** next to or right after the form.
- Say what happens after submitting.
- Mobile users need a short form or a one-tap alternative.

Cal.com supports inline embeds, prefilled fields, UTM passthrough and booking events ([cal.com/embed](https://cal.com/embed)).

## 5. Technical: Core Web Vitals, consent and analytics

- **Core Web Vitals targets** at the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Tactics: static generation, few render-blocking scripts, variable or subset fonts, a fixed-position cookie banner, and a lean tag container ([StudioMeyer](https://studiomeyer.io/en/blog/core-web-vitals-2026), [Vercel](https://vercel.com/kb/guide/how-to-improve-core-web-vitals)).
- **Google Consent Mode v2:** set defaults for `ad_storage`, `ad_user_data`, `ad_personalization` and `analytics_storage` to `denied` **before** the GTM snippet, call `update` on the visitor's choice, and re-apply the saved choice on every page load ([CookieChimp guide](https://cookiechimp.com/blog/google-consent-mode-v2-implementation-guide)).

## 6. Design references and trends

Galleries reviewed: [DesignRush digital agencies](https://www.designrush.com/best-designs/websites/digital-agencies), [Awwwards guide for agencies](https://www.digidop.com/blog/complete-guide-awwards-digital-agencies), [TheeDigital 2026 trends](https://www.theedigital.com/blog/web-design-trend), [Bellaworks 2026 trends](https://bellaworksweb.com/website-design-trends-2026/).

**What works**
- Bold type-led heroes.
- A few curated, large project tiles.
- Interaction that answers the cursor.
- Visible, repeated CTAs.

**What feels dated**
- Identical rounded SaaS cards.
- Stock photos of handshakes.
- Fade-up animation on every block.
- Vague "we are passionate" copy.
- Hidden contact paths.

**Competitor pattern summary**
Most growth agencies lead with big claims and logo walls, and bury the "how". The gap this site fills:

1. It shows expertise by explaining what each platform currently rewards, with sources.
2. It shows the method.
3. It makes enquiry-to-booking a single flow.

## Implications for this build

1. The hero names the outcome (things people *send*), drawn from the strongest ranking signal above.
2. The "What platforms reward right now" section turns research into credibility without inventing results.
3. The enquiry form has 5 core fields plus quick-pick qualifiers. A Cal.com calendar appears inline, prefilled, after submission.
4. A mobile sticky bar offers one-tap booking, email and WhatsApp.
5. Consent Mode v2 defaults are set before GTM, and GA4 events cover leads, booking clicks and completed bookings.
6. Pages are statically generated, with variable fonts via `next/font`, no heavy 3D engine (CSS 3D + Framer Motion), and motion that respects reduced-motion settings.
