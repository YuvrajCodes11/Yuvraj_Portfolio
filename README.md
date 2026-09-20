# Yuvraj Portfolio: Phase 2 (merged, deploy-ready)

Vite + React 19 + TypeScript + Tailwind v4 + Framer Motion (lazy-loaded) + Lenis.
Drop-in replacement for the app folder in the repo (`yuvraj-singh-sidhu-portfolio/`): same `npm run build` -> `dist/`, so the Vercel setup is unchanged.

```bash
npm install
npm run dev      # local
npm run build    # tsc -b && vite build
```

## Where things live
- `src/lib/content.ts`: ALL copy and data (merged from the repo's `src/data.ts` + verified WayPoint / contact details). Edit here only.
- `src/styles/globals.css`: design tokens, fluid `clamp()` type/spacing scale, glass + spotlight, mobile rhythm (`--section-y` tightens under 768px).
- `src/components/sections/`: Hero, Metrics, Services, Projects, About, Process, Stack, Contact.
- `src/components/ui/ProjectDialog.tsx`: full case study (bottom sheet on phones, centred dialog on desktop).
- `src/components/fx/`: ParticleGrid, CursorFX, HoloCard (avatar lives here now), SpotlightCard, Preloader, ScrollProgress.
- `public/`: resume.pdf, robots.txt, sitemap.xml, favicon, share image (unchanged from repo).

## Mobile density
- Services: tap-to-expand rows (8 titles fit on one screen).
- Case studies: swipeable rail; full problem / solution / features / results open in a sheet.
- Section spacing, card padding, gutters and type are all fluid variables in `globals.css`.

## Motion
`<LazyMotion features={loadFeatures} strict>` fetches `domAnimation` as a separate chunk; components use `m.*`, not `motion.*`.
Do not use `layoutId` / `drag` (they need `domMax`).
Reduced-motion users get: no Lenis, no preloader, transforms disabled.

## Repo hygiene
The repo currently commits `node_modules/`, `dist/` and a duplicate nested `yuvraj-singh-sidhu-portfolio/yuvraj-singh-sidhu-portfolio/` folder (an older export). This project ships a `.gitignore`; delete the nested folder and untrack node_modules/dist when you swap this in.
