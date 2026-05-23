# BOOM T-Shirteria

Multilingual storefront for BOOM T-Shirteria, built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI primitives, Biome, and theme support.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Biome for linting and formatting
- Local theme provider
- Radix UI primitives styled in the shadcn/ui style

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Routes

- `/pt`, `/en`, `/es`
- `/[locale]/shop`
- `/[locale]/collections/t-shirts`
- `/[locale]/collections/prints`
- `/[locale]/product/[slug]`
- `/[locale]/cart`
- `/[locale]/favorites`
- `/[locale]/checkout`

Stripe is intentionally not connected yet. The checkout page is a shell for the future payment flow.
