# Brighter Futures Tutoring — Website

Marketing site for **Brighter Futures Tutoring**, built with Next.js. Content is managed in [Contentful](https://www.contentful.com).

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Contentful** (headless CMS)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Contentful setup

1. Create a [Contentful account](https://www.contentful.com) and a space.
2. In the space, go to **Settings → API keys** and create a **Content delivery API** token (or use the default).
3. Copy `.env.example` to `.env.local` and set:

   ```env
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
   ```

4. In Contentful, create a content type **Home Page** (API ID: `homePage`) with these fields (all Short text or Long text as needed):

   | Field name       | API ID          | Type     |
   |------------------|-----------------|----------|
   | Hero headline    | heroHeadline    | Short text |
   | Hero subtext     | heroSubtext     | Long text  |
   | CTA label        | ctaLabel        | Short text |
   | Services headline| servicesHeadline| Short text |
   | About headline   | aboutHeadline   | Short text |
   | About body       | aboutBody       | Long text  |
   | Contact headline | contactHeadline | Short text |
   | Contact email    | contactEmail    | Short text |
   | Contact phone    | contactPhone    | Short text |

5. Create one **Home Page** entry and publish it. The site will use this entry for the homepage content.

Without Contentful configured, the site still runs and uses built-in default copy.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying on Vercel

The project is set up for one-click deploy on [Vercel](https://vercel.com):

1. Push your repo to GitHub/GitLab/Bitbucket and [import the project](https://vercel.com/new) in Vercel.
2. Add **Environment Variables** in the Vercel project settings (or during import):
   - `CONTENTFUL_SPACE_ID` — your Contentful space ID
   - `CONTENTFUL_ACCESS_TOKEN` — your Contentful Content Delivery API token
3. Deploy. Vercel will run `npm run build` and deploy the output.

**Optimisations included:**

- **ISR**: The homepage uses `revalidate = 60`, so Contentful content is revalidated at most every 60 seconds without redeploying.
- **Caching**: Long-lived cache headers for `/_next/static/*` assets.
- **Security headers**: Set via `vercel.json` (X-Frame-Options, X-Content-Type-Options, Referrer-Policy).

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Project structure

- `app/` — Next.js App Router (layout, page, styles)
- `components/` — Reusable UI (Header, Hero, Services, About, Contact, Footer)
- `lib/contentful.ts` — Contentful client and helpers (`getHomePage`, `getEntriesByType`, etc.)

To add more content types (e.g. Services, Testimonials), define them in Contentful and extend the types and fetch logic in `lib/contentful.ts`, then use the data in the relevant components.
