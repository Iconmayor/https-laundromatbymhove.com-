# Laundromat by MHOVE

Next.js 15 App Router website for laundry, residential and commercial cleaning, fumigation, upholstery care and post-construction cleanup. Includes the customer and partner journeys, the business enquiry flow and the original published legal documents.

## Development

Use Node.js 22 or 24 and npm.

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm start
```

The home page shows the studio poster immediately. A single lazy-loaded React Three Fiber canvas loads the active GLB on demand and follows the scene markers as the page scrolls. GSAP and ScrollTrigger coordinate object movement, section reveals and progress. The four hero service links go directly to their sections. Lenis smooths desktop wheel scrolling when motion is allowed. The cloth uses a morph target and the washer drum has a separate rotation pivot. Two-dimensional soap bubbles, floor masks and sparkles animate independently of the canvas.

Use the home hero pause button or the browser’s reduced-motion setting to pause. Reduced-motion and WebGL failures retain service content and posters. Lower-power devices can use the lightweight mop video. The model meshes use Meshopt. Self-hosted assets keep the renderer independent of CDN script or model requests.

## Update content

- `lib/siteConfig.ts` contains the logo-linked brand settings, WhatsApp number, app destinations, services, coverage fields, and package details. Set a package's `from` price in naira once approved. Prices without a confirmed value lead to a quote enquiry.
- `lib/faq.ts` and the service records contain public FAQ copy. `lib/terms.json` and `lib/privacy.json` hold the published business text.
- `lib/easings.ts` and `lib/scrollTimeline.ts` contain timing and the 3D sweep and service movement paths.
- `public/models/` and `public/posters/` use matching basenames. Export GLB with Y up and the front facing +Z. Keep moving parts under their existing node names and preserve cloth morphs. Use Meshopt compression and JPEG or WebP textures.
- `public/images/`, `public/brand/` and `public/video/` contain the studio backdrops, service photos, icons, sharing image and fallback videos. See [asset sources](ASSETS.md).

## Booking and publication

WhatsApp requests use the number supplied by the business. A visitor reviews and sends the draft in WhatsApp. The site does not send messages on a visitor's behalf. Business, partner and support forms prepare an email draft and offer a WhatsApp fallback.

Save-a-copy is optional. With private `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` configured, the dedicated booking page offers visitors an opt-in and sends validated values to the server. Use a private `website_bookings` table with text columns for name, phone, service, address, time and notes, a date column, and timestamps or an ID as appropriate. Leave these variables unset for a WhatsApp-only preview. Only enable public data collection with approved database and abuse controls.

Use the Next.js framework on Vercel and `npm ci` / `npm run build`. Set `NEXT_PUBLIC_SITE_URL` to the canonical URL for the environment. The Vercel review host sets noindex by default. Set `INDEX_WEBSITE=true` for an approved public release only. `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` enables optional analytics. Events contain action and service labels, rather than contact or booking fields.

Before a custom-domain launch, confirm address, operating hours, current coverage, verified social links, prices, the detailed fumigation service list and any testimonials that have permission to be published.
