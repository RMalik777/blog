# Rafli Malik — blog

Photos and notes from places I've been. Live at [blog.raflimalik.com](https://blog.raflimalik.com).

Built with [Astro](https://astro.build/) (static output), [Sanity](https://sanity.io/) for content, Tailwind CSS 4 and shadcn/ui (Base UI). The site is published in English (`/`) and Indonesian (`/id/`).

## Requirements

- Node.js 22.12 or later
- pnpm (version pinned in `package.json`)

## Getting started

1. `pnpm install`
2. Copy `.env.example` to `.env` and set `PUBLIC_SANITY_STUDIO_PROJECT_ID` and `PUBLIC_SANITY_STUDIO_DATASET`.
3. `pnpm dev`

The site runs at [http://localhost:4321](http://localhost:4321) and the embedded Sanity Studio at [http://localhost:4321/admin](http://localhost:4321/admin).

## Scripts

| Command        | What it does                                                                     |
| -------------- | -------------------------------------------------------------------------------- |
| `pnpm dev`     | Start the dev server                                                             |
| `pnpm build`   | Type-check (`astro check`, `tsc`) and build the static site to `dist/`           |
| `pnpm preview` | Serve the production build locally                                               |
| `pnpm typegen` | Extract the Sanity schema and regenerate `sanity.types.ts` from the GROQ queries |
| `pnpm lint`    | Check formatting (Prettier) and lint (ESLint)                                    |
| `pnpm format`  | Format all files                                                                 |

Run `pnpm typegen` after you change anything in `schema/` or the queries in `src/lib/sanity.ts`, and commit the updated `schema.json` and `sanity.types.ts`.

## Project structure

- `schema/`: Sanity content model (`post`, `blockContent`)
- `sanity.config.ts`: Studio configuration, including document-level translations (EN and ID)
- `src/lib/sanity.ts`: GROQ queries (typed with `defineQuery`) and fetch helpers
- `src/lib/image.ts`: Sanity image URL and `srcset` helpers
- `src/components/`: page views and UI components; `ui/` holds shadcn components
- `src/i18n/ui.ts`: interface strings for each language
- `src/pages/`: routes. English routes are at the root, Indonesian routes are under `id/`.
- `migrations/`: Sanity content migrations

## Content

Posts are translated per document with `@sanity/document-internationalization`. A post shows on the site after it is published, and a link to its translation shows when both language versions are published.

Upgrading to `@sanity/document-internationalization` v6 required a one-time data migration (`migrations/migrateToLanguageField`). The migration was run against `production` on 2026-09-30. You don't need to run it again.

## Deployment

The build output in `dist/` is fully static, so no server adapter is needed. Deploy it to any static host, for example Cloudflare Workers static assets or Cloudflare Pages. Use Node.js 22.12 or later in the build environment. Build command: `pnpm build`. Output directory: `dist`.

## Notes

- TypeScript is pinned to 6.0 because `typescript-eslint` and `@astrojs/check` don't support TypeScript 7 yet.
- `astro.config.ts` disables `@sanity/astro`'s dev-only module dedupe on Windows to work around a path bug in `@sanity/astro` 3.5.1.

## License

Content (words and photos) is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The source code is licensed under the [MIT license](LICENSE-CODE).
