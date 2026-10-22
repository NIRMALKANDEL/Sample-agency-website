export type PlatformSignals = {
  id: string;
  platform: string;
  headline: string;
  signals: { title: string; body: string }[];
  source: { label: string; href: string };
};

/** Research-backed: see docs/RESEARCH.md. Review every few months. */
export const platformSignals: PlatformSignals[] = [
  {
    id: "instagram",
    platform: "Instagram",
    headline: "Made to be sent, watched to the end.",
    signals: [
      {
        title: "Sends beat likes",
        body: "DM shares are reported to count 3–5× more than likes for reach to non-followers.",
      },
      {
        title: "Completion over length",
        body: "A 90-second Reel people finish beats a 3-minute one they abandon. Non-follower reach reportedly caps around 3 minutes.",
      },
      {
        title: "Originality is enforced",
        body: "Reposts that reuse most of another creator’s visuals or audio lose reach to non-followers, now for photos and carousels too.",
      },
    ],
    source: {
      label: "SocialPilot, Instagram Reels algorithm 2026",
      href: "https://www.socialpilot.co/de/blog/instagram-reels-algorithm",
    },
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    headline: "People out-reach logos.",
    signals: [
      {
        title: "Personal profiles first",
        body: "Company page posts reach roughly 1–2% of the feed. Founders and employees reach far more people with the same content.",
      },
      {
        title: "Native formats win",
        body: "Multi-image posts, PDF carousels and native video lead engagement. External links carry a reported reach penalty of about 60%.",
      },
      {
        title: "One good post a day, max",
        body: "Posting several times within 24 hours is penalised. Depth beats frequency.",
      },
    ],
    source: {
      label: "Whitehat SEO, social media strategy",
      href: "https://whitehat-seo.co.uk/blog/social-media-strategy",
    },
  },
  {
    id: "tiktok",
    platform: "TikTok",
    headline: "A search engine with a feed.",
    signals: [
      {
        title: "Searchable by design",
        body: "Keyword-led, educational short videos serve both the For You feed and TikTok search.",
      },
      {
        title: "Not just for teenagers",
        body: "The 35–54 age group is reported as the fastest-growing segment, and B2B buyers use it for research.",
      },
      {
        title: "Professional content is rising",
        body: "Professional and technical content is a growing share of what people watch.",
      },
    ],
    source: {
      label: "Whitehat SEO, social media strategy",
      href: "https://whitehat-seo.co.uk/blog/social-media-strategy",
    },
  },
  {
    id: "youtube",
    platform: "YouTube",
    headline: "Shorts to be found, long-form to be trusted.",
    signals: [
      {
        title: "Mix Shorts and long-form",
        body: "Channels that combine both reportedly grow about 41% faster than single-format channels.",
      },
      {
        title: "Visible in AI answers",
        body: "YouTube is the social platform most often cited in Google’s AI Overviews.",
      },
      {
        title: "Search is the front door",
        body: "Titles and chapters that match how people phrase questions keep videos discoverable for years.",
      },
    ],
    source: {
      label: "Whitehat SEO, social media strategy",
      href: "https://whitehat-seo.co.uk/blog/social-media-strategy",
    },
  },
  {
    id: "meta-ads",
    platform: "Meta ads",
    headline: "Creative is the targeting.",
    signals: [
      {
        title: "Broad audiences, strong creative",
        body: "Meta’s AI targeting now infers intent, so the ad itself decides who sees it.",
      },
      {
        title: "Organic tests, paid scale",
        body: "Reels that win organically are the safest bets to put budget behind.",
      },
      {
        title: "Measure past the click",
        body: "Server-side events and consented analytics keep results trustworthy as cookies disappear.",
      },
    ],
    source: {
      label: "Whitehat SEO, social media strategy",
      href: "https://whitehat-seo.co.uk/blog/social-media-strategy",
    },
  },
];

export const processSteps = [
  {
    title: "Audit",
    duration: "Week 1",
    body: "We review your accounts, content, ads and website, and talk to your team about what sells.",
  },
  {
    title: "Strategy sprint",
    duration: "Weeks 2–3",
    body: "Platforms, formats, budget and KPIs agreed in one plan, with the first content series scripted.",
  },
  {
    title: "Make and ship",
    duration: "Every week",
    body: "We produce, test and publish, using Trial Reels and small ad tests to find winners early.",
  },
  {
    title: "Measure and scale",
    duration: "Every month",
    body: "A clear report on what worked. Budget and effort move to the winners; the rest gets cut.",
  },
];

export const engagements = [
  {
    name: "Growth sprint",
    term: "4 weeks, fixed scope",
    bestFor: "Brands that want a plan and proof before committing.",
    includes: ["Full audit", "90-day roadmap", "12 test pieces of content", "Tracking setup"],
  },
  {
    name: "Always-on retainer",
    term: "Monthly, 3-month minimum",
    bestFor: "Brands that want a team running social and ads every week.",
    includes: ["Strategy and reporting", "Content production", "Publishing and community", "Paid social"],
  },
  {
    name: "Launch build",
    term: "Project, 4–10 weeks",
    bestFor: "New brands, rebrands and websites that need to convert.",
    includes: ["Brand identity", "Website or landing pages", "Launch content", "Analytics and booking"],
  },
];

export const homeFaqs = [
  {
    q: "How soon can we start?",
    a: "Usually within two weeks of agreeing scope. Growth sprints can start sooner when we have a slot free; ask on your discovery call.",
  },
  {
    q: "Do you work with small or early-stage brands?",
    a: "Yes. The growth sprint was designed for brands that want a clear plan and early proof before committing to a monthly retainer.",
  },
  {
    q: "Which platforms do you cover?",
    a: "Instagram, TikTok, YouTube, LinkedIn, Facebook, X, Threads and Pinterest organically, and Meta, YouTube, LinkedIn, Google and TikTok for paid campaigns.",
  },
  {
    q: "What do you need from us?",
    a: "Access to your accounts and analytics, one decision-maker who can approve content, and a short weekly check-in. We handle the rest.",
  },
  {
    q: "Who owns the content and the ad accounts?",
    a: "You do. We work inside your accounts with your permission, and finished content is licensed to you.",
  },
  {
    q: "What happens on the discovery call?",
    a: "A 30-minute video call about your goals, current channels and budget. If we’re a fit, you get a written proposal within a few working days.",
  },
];

export const platforms = [
  "Instagram Reels",
  "TikTok",
  "YouTube Shorts",
  "LinkedIn",
  "Meta Ads",
  "Google Ads",
  "Threads",
  "Pinterest",
  "Creator partnerships",
];
