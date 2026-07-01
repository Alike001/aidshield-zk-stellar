## Goal
Turn the AidShield frontend into a polished, competition-ready hackathon demo that clearly shows privacy-preserving aid eligibility, Stellar claim enforcement, and the end-to-end ZK verification story with a stronger visual hierarchy and more credible operator UX.

## Constraints
- Keep the existing Next.js app-router stack in `frontend/`.
- Preserve the current routes: `/`, `/verify`, `/claim`, and `/dashboard`.
- Do not change the smart contract or backend proof logic in this pass.
- Use the existing mock/demo data model, but it can be reshaped for better presentation.
- Keep the UI responsive and accessible on desktop and mobile.
- Prefer a premium, productized dashboard aesthetic with no generic starter-template look.

## Acceptance
- `npm run lint` passes in `frontend/`.
- `npm run build` passes in `frontend/`.
- The landing page, verify flow, claim flow, and dashboard all read as one cohesive product.
- The design clearly communicates the ZK + Stellar flow within the first screenful.
- The frontend is visually upgraded enough to stand beside polished hackathon submissions.
