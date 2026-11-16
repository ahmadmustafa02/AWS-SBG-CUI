# AWS Student Builder Group CUI — website (frontend)

Next.js (App Router, TypeScript, plain CSS modules). Built to the brief in `skill.md` and the PRD.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # also runs the 27-person roster check
```

## Where things live

| What | Where |
| --- | --- |
| Team roster (27 people) + completeness check | `src/content/team.ts` |
| Events (date, venue, agenda, speakers, Meetup URL) | `src/content/events.ts` |
| Socials, nav, recruitment switch, pathways, quest points, feature flags | `src/content/site.ts` |
| 3D splash screen (logo assembly, then club name) | `src/components/Splash.tsx`, `LogoScene.tsx` |
| Team photos (resized copies) | `public/team/<id>.jpg` |
| Gallery albums by year | `src/content/gallery.ts`, images in `public/gallery/` |
| Design tokens (the only place hex colours appear) | `src/app/globals.css` |
| Every API call the UI makes | `src/lib/api.ts` |

## For the backend dev

The frontend only talks to the API through `src/lib/api.ts`. Set `NEXT_PUBLIC_API_BASE_URL`
(see `.env.example`) and implement the routes documented there. Until it is set the site runs in
preview mode: forms validate but send nothing, and the leaderboard, certificates, verification
and registration show "not connected" states instead of fake data.

Flip `FEATURES` in `src/content/site.ts` as modules go live (accounts, Find My Photos, LinkedIn posting).

## Waiting on the organizers

- Community Day date/time, agenda, speakers, capacity and Meetup event URL (`src/content/events.ts`).
  The countdown and Register button appear automatically once these are filled in.
- Photos, bios and LinkedIn URLs for each team member.
- Official logo file (SVG). The mark is currently traced 1:1 from the supplied JPEG (`src/components/LogoMark.tsx`).
- Contact email, sponsors/partners, swag rules, recruitment deadline.
