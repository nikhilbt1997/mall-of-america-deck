# Design Write-Up — Mall of America Partner Experience Deck
**Nikhil BT — Liat.ai Senior Frontend Engineer Assignment**

---

## Design Rationale

### The Core Problem I Was Solving

A sales rep pitching MOA to a luxury brand CMO currently does this: opens a YouTube video, flips through a PDF, opens a spreadsheet of demographics, and verbally narrates the story. It's fragmented, inconsistent, and doesn't convey scale or energy.

My goal was to replace all of that with a single URL.

### Why Dark Luxury?

I chose a near-black (`#080808`) + warm gold (`#C9A84C`) palette after studying how high-end properties present themselves — Sphere Las Vegas, SoFi Stadium, The Dubai Mall. These brands don't use white backgrounds. Darkness creates drama. Gold implies value without saying it. The combination signals premium before a single word is read.

Typography follows the same logic: Playfair Display (editorial serif) for headlines creates the feel of a luxury magazine. DM Mono for data labels adds a precision/fintech quality that makes statistics feel authoritative.

### Video as Primary Medium

The assignment specified "video is the primary storytelling medium, not decoration." The YouTube iframe runs autoplayed, muted, and looped behind multiple gradient overlays — not as background decoration, but as the emotional hook that establishes energy within the first 3 seconds. Text is layered over it with heavy `text-shadow` so readability is guaranteed regardless of which frame is visible.

### Non-Linear Navigation

The assignment explicitly required non-linear navigation. I built three layers: a fixed header with quick-jump links, a slide-out full menu with all 10 sections, and a floating progress indicator on the right with clickable gold dots. A prospect can jump from Hero directly to Leasing in one click, or use keyboard arrow keys to move section-by-section during a screen-share presentation.

### Driving Business Action

Every design decision traces back to one of the three business objectives (lease, sponsor, book). The ROI Calculator in the Leasing section shows a prospect their estimated annual revenue before they've asked the price. The comparison table shows MOA vs standalone in seconds. The intent selector on the Connect form segments leads before the first conversation. These aren't decorative features — they're sales tools.

---

## How I Used AI

### Claude as Architect
I used Claude (Anthropic) as my primary development partner — for component architecture, design system decisions, data modelling, and the three live AI features built into the deck itself.

### Three Live Claude API Integrations

**1. AI Prospect Qualifier**  
A brand fills in their category, stage, and top 3 goals. Claude generates a 3-paragraph personalised pitch explaining exactly why MOA is the right move for them right now — referencing their specific goals and MOA's data. The prompt uses role-play ("you are a senior leasing consultant") to get a confident, data-driven voice rather than generic AI output.

**2. AI Venue Recommender**  
An event planner selects their event type, expected attendance, and duration. Claude returns a structured recommendation (venue name, capacity, setup time, investment estimate) formatted for consistent UI rendering. The prompt enforces a strict output format so the React component can parse and style it predictably.

**3. Smart Contact Form**  
When a prospect submits an inquiry, Claude drafts a personalised follow-up email from the "MOA Partnership Team" — warm, specific to their inquiry type, and proposing a concrete next step. This demonstrates that AI can be embedded at every stage of the sales funnel, not just at the top.

### Framer Motion + AI = Cinematic Feel
The combination of Framer Motion scroll-triggered animations and Claude-generated copy created a deck that feels genuinely alive — stats count up as you arrive, cards stagger into view, the AI responds to your specific inputs. This is what "AI-powered interactive design" means in practice.

---

## What I'd Improve With More Time

**Real video assets** — The biggest limitation is YouTube's iframe, which occasionally flashes controls on load. A self-hosted .mp4 on Cloudinary would eliminate this completely and enable precise start/end control.

**Personalized deck URLs** — I'd build a backend that generates `/deck/nike` or `/deck/starbucks` with the AI Prospect Qualifier pre-run, the ROI Calculator pre-filled with their category, and the header customized to their brand. The sales rep sends a link; the prospect arrives and it already knows who they are.

**Walk-forward validation on the ROI Calculator** — Currently estimates are based on static conversion rates. With access to real MOA transaction data, the calculator could show actual category performance by zone.

**Lighthouse 90+ optimization** — Code splitting, lazy-loaded Recharts, preloaded fonts, and service worker caching would push performance scores above the 90 threshold. Current bundle is ~367KB which is reasonable but improvable.

**3D property map** — Replace the SVG floor plan with a Three.js interactive 3D model. Prospects could rotate the property, click on specific stores, and see the scale in a way no 2D map conveys.

---

## Final Thought

The best sales tools don't feel like tools. They feel like experiences. This deck was designed so that a prospect who lands on the URL and spends 10 minutes exploring it understands — without anyone explaining it — why Mall of America is the right address for their brand, event, or partnership. That was the brief. I hope it delivers.
