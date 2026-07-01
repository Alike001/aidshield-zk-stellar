# AidShield Frontend

Next.js demo interface for the AidShield hackathon submission.

## Routes

- `/` - judge-facing project overview and Stellar deployment summary
- `/verify` - beneficiary selection and proof envelope demo
- `/claim` - claim submission and duplicate-claim blocking demo
- `/dashboard` - operator view for registry, claims, and contract context

## Commands

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

The build script uses `next build --webpack` and disables the Next webpack build worker in `next.config.ts` so the app builds reliably in restricted environments.
