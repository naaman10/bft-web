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

6. **Testimonials:** Create a content type **Review** with API ID **`review`** (Settings → Content model). The site expects these field API IDs:

   | Field name (suggested) | API ID       | Type        |
   |------------------------|--------------|-------------|
   | Parent name            | `parentName` | Short text  |
   | Review text            | `reviewText` | Rich text   |
   | Location               | `location`   | Short text  |

   Add and **publish** one entry per testimonial. The homepage loads them via `getReviews()` (ordered by creation time). If none are returned, **placeholder testimonials** are shown instead.

   If your API IDs differ, adjust the field keys read in `getReviews()` inside `lib/contentful.ts`.

   **Reviews not showing?** Entries must be **published**. By default we no longer force `locale: en-US` — the API uses your **space default locale** so localized fields match. If you need a specific locale, set `CONTENTFUL_LOCALE` in `.env.local`. If the content type API ID isn’t `review`, set `CONTENTFUL_REVIEW_CONTENT_TYPE`. For server-side hints, set `CONTENTFUL_DEBUG=1` and check the terminal when loading the homepage.

Without Contentful configured, the site still runs and uses built-in default copy.

### Contact form (`/contact`)

The contact page posts to `/api/contact`. Submissions are validated on the server.

**Bot protection**

1. **Honeypot (always on)** — A hidden “company” field must stay empty; simple bots that autofill every input are rejected.
2. **Cloudflare Turnstile (recommended for production)** — Add both keys in `.env.local` / Vercel:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — site key (widget on the form)
   - `TURNSTILE_SECRET_KEY` — secret (server verifies the token on each submit)

   Create a Turnstile widget in the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/turnstile) and allow your domains (include `localhost` for local testing). If the secret is set, the API **requires** a valid Turnstile token; if only the honeypot is used (no Turnstile keys), submissions still work.

**Other options** (not built in here): Google reCAPTCHA v3, hCaptcha, or rate limiting (e.g. Upstash) — Turnstile is free and works well on Vercel.

**Email delivery**

- **Without Resend:** The API still returns success; the enquiry is logged on the server (terminal or Vercel logs).
- **With [Resend](https://resend.com):**

  ```env
  RESEND_API_KEY=re_xxxxxxxx
  CONTACT_FROM_EMAIL=Brighter Futures <hello@yourdomain.com>
  CONTACT_TO_EMAIL=you@yourdomain.com
  ```

  Use a verified domain/sender in Resend for `CONTACT_FROM_EMAIL`.

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
