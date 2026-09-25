# Portfolio — iOS & MERN

An animated, interactive portfolio for an iOS engineer who also builds full-stack MERN apps.

Built with **React 18**, **Vite**, **Tailwind CSS v4**, **Framer Motion** and **Lenis** (smooth scrolling).

## What's inside

| Section | Idea |
| --- | --- |
| Loader | Xcode-style build log that ends in "Build Succeeded" |
| Navigation | A Dynamic Island pill that shows the current section and expands into a menu |
| Hero | Letter-by-letter headline, a 3D iPhone that tilts with your pointer, and a **Swift ⇄ MERN mode switch** that re-themes the whole site, swaps the phone screen (Activity rings vs. live API traffic) and re-types the code card |
| About | Paragraph that lights up word by word as you scroll, animated counters, live local time |
| Skills | An iOS home screen: tap an app to open it (shared-element transition), press **Edit home screen** to make icons jiggle and drag them onto each other to swap |
| Work | Pinned horizontal-scroll gallery with 3D tilt cards and an iOS bottom sheet you can drag down to dismiss |
| Experience | `git log --graph` timeline drawn as you scroll, with achievements as diff lines |
| Contact | iMessage conversation with typing indicator, quick replies and a compose box |
| Extras | ⌘K / Ctrl+K command palette, `M` to toggle mode, blend-mode custom cursor, scroll progress bar, film grain, `prefers-reduced-motion` support |

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
npm run build:single  # everything inlined into dist-single/index.html
```

## Make it yours

All text lives in [`src/data.js`](src/data.js): name, email, socials, skills, projects and experience.
Colours and fonts are tokens at the top of [`src/index.css`](src/index.css).

## Deploy

A GitHub Actions workflow (`.github/workflows/deploy.yml`) publishes `main` to GitHub Pages.
In the repo settings go to **Pages → Build and deployment → Source** and choose **GitHub Actions** if it isn't picked automatically.
It also deploys as-is to Vercel or Netlify (build command `npm run build`, output `dist`).
