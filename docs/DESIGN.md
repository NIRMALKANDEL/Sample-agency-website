# Design direction: Sendworthy

**Subject.** Sendworthy is a growth and creative studio for brands that live on Instagram, TikTok, YouTube and LinkedIn.
**Audience.** Founders and marketing leads at consumer and B2B brands.
**Primary job.** Turn a visit into an enquiry or a booked discovery call.

## Concept: one loud thing

The first direction (colourful, stretching type) was too busy and too basic for the client. The brief became: **fewer colours, a bolder theme, a real 3D element, 21st.dev-style polish.**

The site is near-monochrome (a violet-black and a lavender-tinted off-white) with **one electric accent, chartreuse**. It is spent on a few places only: the primary buttons, focus rings and selection, selected chips, and one full-bleed chartreuse inversion section on the home page. Lavender is a soft glow and lives in the 3D object's iridescence. Tomato is a signal colour for errors only.

The memorable object is a genuine WebGL **iridescent chrome torus knot** in the hero. It slowly morphs and rotates, tilts toward the pointer and turns as the page scrolls.

Dark mode is the hero look (the default theme is still "system"). Light mode is fully designed, not inverted: faint lavender paper, white cards, ink buttons-on-chartreuse and ink focus rings.

## Tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| paper | `#F7F5FD` | `#0E0B1A` | page background (lavender-tinted off-white; violet-black, never pure black) |
| surface | `#FFFFFF` | `#14102A` | cards and panels |
| surface-2 | `#EFEBFA` | `#1B1636` | hover fills, inset panels, active nav |
| ink | `#130F26` | `#F3F0FF` | text |
| muted | `#5C5675` | `#A29BC2` | secondary text |
| line / line-strong | `#E3DEF3` / `#CDC6E6` | `#272142` / `#3A3260` | hairline borders |
| accent (chartreuse) | `#D4FF3A` | `#D4FF3A` | the ONE loud accent; always paired with `#0E0B1A` text (about 15:1) |
| lavender | `#B9A6FF` | `#B9A6FF` | soft glows, 3D iridescence, one cover colour |
| tomato | `#FF5A3C` | `#FF5A3C` | errors only (field border, alert) |
| focus | `#130F26` | `#D4FF3A` | 2 px focus ring, 3 px offset |

Contrast: muted on paper is about 6:1 in light and 7:1 in dark. On chartreuse sections the tokens are re-scoped by `.on-bright` (ink `#0E0B1A`, muted `#3A3556`, about 9:1).

## Type

- **Geist** (variable) for headlines, UI and body. Headlines are weight 600 with tight tracking (`-0.04em` to `-0.05em`) and line height 0.96 to 1.05. Body is 16 px at 1.6. Buttons and labels are weight 500 or 600.
- **Instrument Serif italic** for exactly two expressive moments: the home page's chartreuse statement ("Short loops, clear numbers, no six-month strategy decks.") and the 404 numerals. It is not preloaded.
- No all-caps eyebrows, no single highlighted word in headlines and no monospace labels. The hero headline gets one gradient sweep across the whole line, once, on load.

## Key patterns

- **Floating pill navbar** with backdrop blur. The mobile menu panel is a sibling of the header, never a child of the blurred pill (a `backdrop-filter` ancestor would trap the `position: fixed` panel).
- **Bento grids** with `Spotlight` cards: a cursor-following fill and a hairline edge glow, driven by CSS variables (no React re-renders), hover devices only. Services use a 2+1+1 / 1+2+1 / 2+2 layout; work uses 7/5 and 5/7.
- **Mobile is redesigned, not shrunk.** Services and work become swipeable scroll-snap rows that bleed to the screen edge. Platforms are tabs, the FAQ is an accordion, and the sticky action is a floating pill that sits above the footer padding. Touch targets are at least 44 px.
- **Subtle backgrounds.** A masked hairline grid, a faint lavender glow and soft noise in the hero, page heroes and panels.
- **Marquee** of platform names with edge-fade masks, paused on hover.
- **Accordion** that animates height with CSS grid rows (`0fr` to `1fr`), with proper `aria-expanded`, regions and `inert` when closed.
- **Process** is the only numbered content because it is a real sequence.
- **Generated cover art** for case studies (`WorkCover`) uses only violet-black, lavender and chartreuse. "Concept" labels stay on every case study.

## The 3D hero (`src/components/three`)

- `HeroVisual` (client) reserves a fixed-size box with a CSS glow placeholder, then mounts `HeroScene` with `next/dynamic` (`ssr: false`) after idle time, so the headline stays the LCP element and there is no layout shift.
- `HeroScene` draws a torus knot with drei `MeshDistortMaterial` (metal, iridescence, clearcoat). It is lit with `<Environment>` and `Lightformer` children (a chartreuse key, a lavender fill, white strips), so no HDR is downloaded.
- `dpr` is capped at `[1, 1.75]` and drops to 1 if `PerformanceMonitor` reports a decline. Geometry detail is halved and the object is smaller below 560 px wide.
- Rendering pauses off-screen (`IntersectionObserver` switches `frameloop` to `never`) and is static under reduced motion (`demand`). A class error boundary hides the canvas if WebGL is unavailable.
- Desktop: right column beside the text. Mobile: a 14 to 18 rem strip above the headline, overlapping it slightly.

## Layout

Content is left-aligned on a 12-column grid (max width 80 rem). Section rhythm is 5 to 8 rem.

```
HOME
┌──────────────(floating pill nav)──────────────┐
│ Make things             ┌── 3D chrome knot ──┐│
│ people send.            │  (WebGL, lavender  ││
│ one line · [Book] [Work]│   + chartreuse)    ││
├─ platforms marquee (edge-faded) ──────────────┤
│ Services bento (carousel on mobile)           │
│ Work bento (carousel on mobile)               │
│ What platforms reward now: tabs + sources     │
│ ████ full-bleed CHARTREUSE: serif statement + │
│      4-step process ████                      │
│ Ways to work together: 3 spotlight cards      │
│ FAQ accordion                                 │
│ Quiet CTA panel with the 3-field form         │
└────────────── big faded wordmark footer ──────┘
```

## Review against the brief (what changed)

1. **Fewer colours.** Three brand colours became one accent plus a soft tint. The previous version used all three as large surfaces (tomato buttons, lavender marquee, chartreuse CTA). Now only the accent is loud.
2. **Not the generic "acid green on black".** The base is violet-black and lavender-tinted paper, the accent appears in a controlled few places, and the single full-bleed inversion carries a serif italic statement, which is the one place type becomes expressive.
3. **Real 3D.** The CSS-3D post stack was replaced by a WebGL object that responds to pointer and scroll, with performance and accessibility safeguards.
4. **Type.** The Anybody width-axis gimmick was removed. Geist with tight tracking replaces both old families.
5. **Motion.** One hero sweep, the 3D object, hover spotlights and state changes (accordion, tabs, menu). No scattered fade-ups. Everything is disabled or static under `prefers-reduced-motion`.
