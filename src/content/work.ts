/**
 * Case studies.
 *
 * The four entries below are CONCEPT projects for fictional brands. They show
 * how Sendworthy approaches a brief and are labelled "Concept" on the site.
 * Replace them with real client work, and only add `results` you can verify
 * and have permission to publish.
 */

export type CoverPalette = "tomato" | "chartreuse" | "lavender" | "ink";

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  title: string;
  summary: string;
  concept: boolean;
  year: string;
  services: string[];
  palette: CoverPalette;
  /** Big word printed on the generated cover art. */
  coverWord: string;
  context: string;
  challenge: string;
  approach: { title: string; body: string }[];
  deliverables: string[];
  /** What success is measured by. */
  measures: string[];
  /** Verified, published-with-permission results only. */
  results?: { value: string; label: string }[];
};

export const work: CaseStudy[] = [
  {
    slug: "tiffin-theory-reels-launch",
    client: "Tiffin Theory",
    sector: "Food & beverage",
    title: "Launching a home-style meal brand on Reels",
    summary:
      "A launch plan for a fictional meal-kit brand: recipe-in-30-seconds Reels designed to be sent to the family group chat.",
    concept: true,
    year: "2026",
    services: ["Instagram & Reels", "Content production", "Paid social & performance"],
    palette: "tomato",
    coverWord: "Send to mum",
    context:
      "Tiffin Theory delivers ready-to-cook regional meals in two metro cities and is launching with no audience and a modest budget.",
    challenge:
      "Food content is crowded and polished recipe videos all look the same. The brand needs reach beyond followers it doesn’t have yet.",
    approach: [
      {
        title: "Design for the send",
        body: "Every Reel ends on a reason to share: ‘Send this to whoever cooks on Sundays’. Sends are the strongest signal for reach to non-followers.",
      },
      {
        title: "Test before posting",
        body: "Three hook variations per recipe go out as Trial Reels to non-followers first. Only the winner is posted to the main grid.",
      },
      {
        title: "Turn winners into ads",
        body: "The top organic Reels each month become Meta ads with a first-order offer, so paid budget backs proven creative.",
      },
    ],
    deliverables: ["Launch content series", "16 Reels a month", "Paid social campaigns", "Landing page"],
    measures: ["Sends per 1,000 reach", "First orders from Instagram", "Cost per first order"],
  },
  {
    slug: "tallyroom-founder-led-linkedin",
    client: "Tallyroom",
    sector: "B2B fintech",
    title: "Founder-led LinkedIn for a finance software startup",
    summary:
      "Moving a fictional B2B brand’s voice from a company page nobody sees to two founders people actually follow.",
    concept: true,
    year: "2026",
    services: ["Growth strategy", "Social media management", "Content production"],
    palette: "lavender",
    coverWord: "Founder > logo",
    context:
      "Tallyroom sells reconciliation software to finance teams. Its company page posts product updates to a small audience.",
    challenge:
      "Company pages reach a small slice of followers, and links in posts reduce reach further. Buyers trust people more than logos.",
    approach: [
      {
        title: "Two founder voices",
        body: "The CEO writes about running finance at a startup; the CTO explains how the product solves problems people recognise. Weekly interviews become their posts.",
      },
      {
        title: "Native formats only",
        body: "PDF carousels, multi-image posts and short native videos, with links moved to the first comment or the profile.",
      },
      {
        title: "From posts to pipeline",
        body: "A newsletter and a demo landing page capture people who engage, with UTM tracking through to the CRM.",
      },
    ],
    deliverables: ["Founder content system", "Weekly ghostwritten posts", "PDF carousels", "Demo landing page"],
    measures: ["Profile views from ideal-customer titles", "Inbound demo requests", "Pipeline influenced"],
  },
  {
    slug: "halfmoon-ceramics-brand-and-site",
    client: "Halfmoon Ceramics",
    sector: "Direct-to-consumer homeware",
    title: "A brand and Shopify site for a pottery studio",
    summary:
      "Identity, product photography and a fast storefront for a fictional studio selling handmade tableware.",
    concept: true,
    year: "2026",
    services: ["Brand identity", "Websites & landing pages", "Content production"],
    palette: "chartreuse",
    coverWord: "Made by hand",
    context:
      "Halfmoon sells through markets and Instagram DMs, taking orders by hand and losing track of them.",
    challenge:
      "The brand needs to look as considered as the work, and buying needs to be as easy as sending a DM.",
    approach: [
      {
        title: "An identity from the kiln",
        body: "Glaze colours became the palette and a wordmark drawn from the studio stamp, made to work at thumbnail size.",
      },
      {
        title: "Photography that sells texture",
        body: "One production day for product, process and lifestyle shots, cut into Reels showing each piece being thrown.",
      },
      {
        title: "Checkout in three taps",
        body: "A Shopify storefront with Instagram product tagging, so a Reel leads straight to a product page.",
      },
    ],
    deliverables: ["Visual identity", "Product photography", "Shopify storefront", "Social templates"],
    measures: ["Online conversion rate", "Orders from Instagram", "Mobile page speed"],
  },
  {
    slug: "monsoon-run-club-community",
    client: "Monsoon Run Club",
    sector: "Fitness community",
    title: "Growing a run club with YouTube Shorts and long-form",
    summary:
      "A content engine for a fictional running community: Shorts for discovery, long-form for depth, Instagram for meet-ups.",
    concept: true,
    year: "2026",
    services: ["Growth strategy", "Content production", "Creator partnerships"],
    palette: "ink",
    coverWord: "Run with us",
    context:
      "Monsoon Run Club hosts weekly runs and wants to turn its community into a brand with paid memberships and partners.",
    challenge:
      "The club’s best moments happen in person. It needs content that brings new runners in and keeps members around.",
    approach: [
      {
        title: "Shorts for discovery",
        body: "Fast, searchable Shorts answer real beginner questions (‘How slow is too slow?’) and link to full videos.",
      },
      {
        title: "Long-form for trust",
        body: "Monthly race-day documentaries and coach Q&As. Channels that combine Shorts and long-form tend to grow faster.",
      },
      {
        title: "Members as creators",
        body: "A small group of member creators get a kit and a brief, which turns the community into the distribution.",
      },
    ],
    deliverables: ["YouTube channel strategy", "8 Shorts + 1 long-form a month", "Creator kit", "Sponsor deck"],
    measures: ["New members from YouTube", "Subscriber to member conversion", "Sponsor revenue"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return work.find((w) => w.slug === slug);
}
