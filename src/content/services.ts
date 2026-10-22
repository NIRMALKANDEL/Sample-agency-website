export type Service = {
  slug: string;
  name: string;
  /** One line used in the services index. */
  line: string;
  /** Two or three sentences for the hero of the service page. */
  summary: string;
  forWho: string;
  includes: string[];
  deliverables: string[];
  /** What we measure to judge whether it works. */
  measures: string[];
  channels: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "growth-strategy",
    name: "Growth strategy",
    line: "A clear plan for where your next customers come from.",
    summary:
      "We audit your channels, content and funnel, then write a 90-day plan that says which platforms to prioritise, what to post, what to spend and how we will know it is working.",
    forWho:
      "Brands that post a lot but can’t say which posts bring in revenue, and founders who need one plan their team can follow.",
    includes: [
      "Channel and content audit across every active platform",
      "Audience and competitor research",
      "Positioning and message testing",
      "90-day roadmap with budget split and KPIs",
      "Tracking plan for GA4 and Meta",
    ],
    deliverables: ["Audit deck", "90-day growth roadmap", "Measurement plan", "Content pillars"],
    measures: ["Qualified leads per month", "Cost per lead", "Share of revenue from social"],
    channels: ["Instagram", "TikTok", "YouTube", "LinkedIn", "Meta Ads", "Google Ads"],
    faqs: [
      {
        q: "Do we have to hire you for execution afterwards?",
        a: "No. The roadmap is written so your in-house team can run it. Many clients do continue with us for production or ads.",
      },
      {
        q: "How long does the strategy take?",
        a: "Typically three to four weeks from kickoff, depending on how quickly we get access to your accounts and data.",
      },
    ],
  },
  {
    slug: "instagram-and-reels",
    name: "Instagram & Reels",
    line: "Reels built for sends, saves and watch time.",
    summary:
      "Instagram now rewards content people send to each other and watch to the end. We plan formats, write hooks, shoot and edit Reels, and use Trial Reels to test ideas on non-followers before they reach your audience.",
    forWho:
      "Consumer brands, creators and founders who want reach beyond their current followers and a feed that sells.",
    includes: [
      "Format and series development",
      "Hook and script writing",
      "Shooting and editing (on-site or remote creator kits)",
      "Trial Reels testing programme",
      "Keyword-led captions and profile optimisation",
      "Monthly performance review",
    ],
    deliverables: ["12–20 Reels a month", "Carousels and Stories", "Monthly insights report"],
    measures: ["Sends per reach", "Average watch time", "Non-follower reach", "Profile visits to link taps"],
    channels: ["Instagram Reels", "Stories", "Carousels", "Broadcast channels"],
    faqs: [
      {
        q: "How many Reels should we post?",
        a: "Quality beats volume. For most brands three or four strong Reels a week, plus Stories, is the right starting point.",
      },
      {
        q: "Can you use trending audio?",
        a: "Yes, where the licence allows it for business accounts. We also make original audio, which Instagram favours for originality.",
      },
    ],
  },
  {
    slug: "social-media-management",
    name: "Social media management",
    line: "Always-on publishing and community, handled.",
    summary:
      "We run your calendar, publishing and community across platforms, so your brand shows up consistently and every comment and DM gets a fast, on-brand reply.",
    forWho: "Teams without the time or people to post, reply and report every week.",
    includes: [
      "Monthly content calendar",
      "Copywriting and design for every platform",
      "Scheduling and publishing",
      "Community management and DM triage",
      "Monthly reporting call",
    ],
    deliverables: ["Content calendar", "Published posts", "Community log", "Monthly report"],
    measures: ["Response time", "Engagement rate per reach", "Follower quality", "DM enquiries"],
    channels: ["Instagram", "Facebook", "LinkedIn", "X", "Threads", "Pinterest"],
    faqs: [
      {
        q: "Do you reply to comments as our brand?",
        a: "Yes, using a tone guide and an escalation list we agree with you, so sensitive messages always reach a person on your team.",
      },
    ],
  },
  {
    slug: "content-production",
    name: "Content production",
    line: "Short-form video, photo and design, made in batches.",
    summary:
      "Batch production days that turn one shoot into a month of platform-native content: Reels, Shorts, TikToks, product photography, carousels and ad creative.",
    forWho: "Brands that need a steady supply of original content without an in-house studio.",
    includes: [
      "Creative concepts and shot lists",
      "Production days (studio or location)",
      "Editing, motion graphics and captions",
      "Product and lifestyle photography",
      "Ad-ready cut-downs and variations",
    ],
    deliverables: ["Edited videos", "Photo library", "Ad creative variations", "Raw footage archive"],
    measures: ["Hook rate (3-second views)", "Completion rate", "Cost per usable asset"],
    channels: ["Reels", "TikTok", "YouTube Shorts", "Meta Ads", "Website"],
    faqs: [
      {
        q: "Who owns the content?",
        a: "You do. Final assets are licensed to you on payment, and the details are set out in our agreement.",
      },
    ],
  },
  {
    slug: "paid-social",
    name: "Paid social & performance",
    line: "Ads on Meta, YouTube, LinkedIn and Google that pay for themselves.",
    summary:
      "We plan, build and optimise paid campaigns with creative testing at the centre, so your budget follows the ads that actually bring in leads and sales.",
    forWho: "Brands ready to spend on ads and wanting a partner who connects creative to cost per result.",
    includes: [
      "Account audit and tracking setup (Pixel, Conversions API, GA4)",
      "Campaign structure and audience strategy",
      "Creative testing framework",
      "Weekly optimisation",
      "Landing page recommendations",
    ],
    deliverables: ["Campaign build", "Creative test log", "Weekly dashboard", "Monthly review"],
    measures: ["Cost per lead or purchase", "Return on ad spend", "Creative win rate"],
    channels: ["Meta Ads", "YouTube Ads", "LinkedIn Ads", "Google Ads", "TikTok Ads"],
    faqs: [
      {
        q: "Is there a minimum ad budget?",
        a: "We’ll recommend a budget that gives each test enough data to learn from. We discuss it on the discovery call.",
      },
    ],
  },
  {
    slug: "creator-partnerships",
    name: "Creator partnerships",
    line: "The right creators, briefed well, measured properly.",
    summary:
      "We find creators whose audiences match your customers, negotiate fair terms, brief them clearly and track every partnership against sales, not just views.",
    forWho: "Consumer brands that want trusted voices and authentic content at scale.",
    includes: [
      "Creator research and vetting",
      "Outreach and negotiation",
      "Briefs, contracts and usage rights",
      "Whitelisting and partnership ads",
      "Tracking links and codes",
    ],
    deliverables: ["Creator shortlist", "Campaign briefs", "Content approvals", "Results report"],
    measures: ["Cost per acquisition", "Code or link conversions", "Content reuse in ads"],
    channels: ["Instagram", "YouTube", "TikTok", "LinkedIn"],
    faqs: [
      {
        q: "Do you work with micro-creators?",
        a: "Yes. Smaller creators with engaged niche audiences often outperform larger accounts on cost per sale.",
      },
    ],
  },
  {
    slug: "brand-identity",
    name: "Brand identity",
    line: "A look and voice people remember after one scroll.",
    summary:
      "Naming, positioning, logo, type, colour and voice, designed to work at thumbnail size on a phone as well as on a billboard.",
    forWho: "New brands, and brands whose look no longer matches who they’ve become.",
    includes: [
      "Positioning and messaging",
      "Logo and visual identity system",
      "Social templates and motion toolkit",
      "Tone of voice guide",
      "Brand guidelines",
    ],
    deliverables: ["Identity system", "Brand guidelines", "Social templates", "Launch assets"],
    measures: ["Brand recall in surveys", "Consistency across channels", "Launch engagement"],
    channels: ["Every touchpoint"],
    faqs: [
      {
        q: "Can you refresh our brand without starting over?",
        a: "Yes. Often a refresh of type, colour and templates is enough to make a brand feel current again.",
      },
    ],
  },
  {
    slug: "websites-and-landing-pages",
    name: "Websites & landing pages",
    line: "Fast sites that turn social traffic into enquiries.",
    summary:
      "We design and build websites and campaign landing pages that load fast on mobile, rank on Google and make it easy to enquire or book a call.",
    forWho: "Brands sending social or ad traffic to a site that doesn’t convert.",
    includes: [
      "UX and conversion strategy",
      "Design system and responsive UI",
      "Development (Next.js, Webflow or Shopify)",
      "SEO, analytics and consent setup",
      "Booking and CRM integrations",
    ],
    deliverables: ["Website or landing pages", "Analytics setup", "Handover training"],
    measures: ["Conversion rate", "Core Web Vitals", "Organic traffic", "Cost per lead from paid traffic"],
    channels: ["Web", "Google Search", "Social traffic"],
    faqs: [
      {
        q: "Will we be able to edit the site ourselves?",
        a: "Yes. We choose the platform with you based on who will update it and how often.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
