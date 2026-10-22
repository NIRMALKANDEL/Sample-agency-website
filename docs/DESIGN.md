# Design direction: Sendworthy, "Ultraviolet feed"

**Subject.** Sendworthy is a growth and creative studio for brands that live on Instagram, TikTok, YouTube and LinkedIn.
**Audience.** Founders and marketing leads at consumer and B2B brands.
**Primary job.** Turn a visit into an enquiry or a booked discovery call.

## Concept

The site should feel like the feed at its best: saturated, tactile and alive. Everything is built around the moment someone sends a post to a friend. The hero headline cycles through what we want people to do ("Make things people send / save / share / book"). Glossy 3D "reactions" (a heart, a paper plane, a play button, a speech bubble, a bookmark) float behind it, and notifications drift past.

The earlier near-monochrome version (violet-black with one acid-green accent) read as a generic template. This version uses all three brand colours with confidence on a saturated ultraviolet base.

## Colour

| Token | Light | Dark | Role |
|---|---|---|---|
| paper | `#F3EEFF` | `#12072E` | page background (ultraviolet in dark mode, never grey-black) |
| surface / surface-2 | `#FFFFFF` / `#E9E1FF` | `#1C0F45` / `#27185A` | cards, panels |
| ink / muted | `#1A0B40` / `#574A82` | `#F5F0FF` / `#B7AADF` | text (muted is 6.8:1 light, 9:1 dark) |
| accent (tomato) | `#FF4F2B` | `#FF4F2B` | primary buttons, big CTA panel, service hover fill. Always ultraviolet text on it (5.9:1) |
| pop (chartreuse) | `#D8FF3C` | `#D8FF3C` | stickers, selection, active tabs, button hover fill, cursor ring |
| lavender | `#B8A2FF` | `#B8A2FF` | glows, chips, third sticker colour |
| heat gradient | lavender → tomato → amber → chartreuse | | progress bars, blobs, animated gradient text (deeper stops in light mode for contrast) |

Dark mode is the default. Some bands (the manifesto and process band, the footer and form cards) stay ultraviolet in both themes through `.theme-uv`. Bright panels re-scope tokens through `.on-bright`.

## Type

- **Bricolage Grotesque** (variable: weight, width and optical size) for display: weight 800, width 82, tight leading (0.86 to 0.95). It's condensed enough that huge headlines fit on phones.
- **Geist** for body and UI.

## Motion and interaction

- **Load:** headline words rise in one after another (pure CSS, `SplitWords`). The last word cycles inside a tilted tomato sticker (`WordCycler`). Chips pop in with a spring and then bob.
- **3D:** `HeroScene` (React Three Fiber) floats the reaction shapes with drei `Float`, leans toward the pointer and spreads apart on scroll. It pauses off-screen and is static under reduced motion.
- **Cursor:** a chartreuse ring with a difference blend trails the mouse and grows over anything clickable. Buttons are magnetic (they lean toward the pointer). Fine pointers only, and the native cursor stays.
- **Buttons:** a colour fill sweeps up from the bottom on hover.
- **Header:** a floating pill with a sliding chartreuse hover indicator (`layoutId`) and a heat-gradient reading-progress bar.
- **Tapes:** two crossed marquee bands (tomato and chartreuse) running in opposite directions.
- **Services:** a big list. A tomato fill sweeps up each row on hover, and a preview card with the service's channels springs after the cursor.
- **Manifesto:** a statement that lights up word by word as you scroll (`ScrollText`).
- **Process:** a timeline whose gradient line fills as you scroll. It sits next to a sticky heading.
- **Work:** on desktop, a pinned horizontal rail that slides sideways as you scroll down. Cards tilt in 3D toward the pointer. On phones it's a swipe row.
- **Tabs:** a spring-animated pill moves between platforms, and the headline uses animated gradient text.
- **Engagements:** tilt cards. The middle one has a rotating conic-gradient border.
- **Scroll reveals:** `[data-reveal]` elements rise in once (`RevealObserver`). They are only hidden when JavaScript runs, with a CSS failsafe.
- **Page transitions:** a tomato curtain wipes up off each new page on client-side navigation.
- **Footer:** an ultraviolet band. The giant wordmark's letters jump and turn chartreuse on hover.
- Everything respects `prefers-reduced-motion`: animations stop, the 3D scene is static, the rail becomes a normal row, and the cursor effects are off.

## Accessibility guardrails

- Text on tomato and chartreuse is always ultraviolet `#12072E`.
- Focus rings are chartreuse in dark mode and ultraviolet in light mode.
- Touch targets are at least 44 px.
- Decorative motion is `aria-hidden`. The headline's cycling word is decorative, and the heading text contains "send." for screen readers and search.
