# Fishers Oysters

Indigenous-led aquaculture enterprise combining ecological restoration with economic sovereignty on Moreton Bay

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

3. Edit `.env.local` with your API keys:
   - `OWNER_USERNAME` - optional username for the `/owner` copy editor
   - `OWNER_PASSWORD` - password for the `/owner` copy editor
   - `OWNER_SESSION_SECRET` - optional secret for owner login cookies
   - `GHL_API_KEY` - GoHighLevel API key (optional, for contact form)
   - `GHL_LOCATION_ID` - GoHighLevel location ID
   - `NOTION_TOKEN` - Notion integration token (optional)

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   ├── stories/      # Stories from Empathy Ledger
│   │   └── api/          # API routes
│   ├── components/       # React components
│   └── lib/              # Utilities and integrations
├── project.config.json   # Site configuration
└── public/              # Static assets
```

## Configuration

Website copy is stored in `src/content/site-copy.json` and can be edited at `/owner`.

For local development, `/owner` uses the fallback password `fishers-oysters` if `OWNER_PASSWORD` is not set. Production requires `OWNER_PASSWORD`. Set `OWNER_USERNAME` as well if you want a named shared editor account instead of password-only login.

To make production saves trigger a redeploy, connect the site to GitHub/Vercel and set:

- `OWNER_PASSWORD`: the password Shaun uses at `/owner`
- `OWNER_USERNAME`: optional username for the shared editor account
- `OWNER_SESSION_SECRET`: a long random string used to sign the login cookie
- `GITHUB_TOKEN`: a fine-grained GitHub token with contents read/write access to this repo
- `GITHUB_REPOSITORY=Acurioustractor/fishers-oysters`
- `GITHUB_BRANCH=main`
- `VERCEL_DEPLOY_HOOK_URL`: optional, only needed if the GitHub commit does not trigger Vercel automatically

Remote edit flow:

1. Shaun opens the deployed site URL on his computer.
2. He goes to `/owner`.
3. He signs in with the shared editor account details.
4. He edits copy and presses **Publish changes**.
5. The site commits `src/content/site-copy.json` to GitHub.
6. Vercel rebuilds and the deployed website updates after the deployment finishes.

Edit `project.config.json` only for low-level site settings:

- Site name, tagline, and description
- Social media links
- Integration settings
- Ecosystem attribution (optional)

## Integrations

### Empathy Ledger

Stories are automatically fetched from [Empathy Ledger](https://empathy-ledger-v2.vercel.app) based on the project slug. Only stories with EXTERNAL consent are displayed.

### GoHighLevel

Contact form submissions are sent to GoHighLevel CRM when configured. Set `GHL_API_KEY` and `GHL_LOCATION_ID` in your environment variables.

## Syncing Content

To sync the latest content from Empathy Ledger:

```bash
npm run sync
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the production version:

```bash
npm run build
npm start
```

## Theme: earth

Colors:
- Primary: `#4A6741`
- Secondary: `#8B7355`
- Accent: `#D4A574`

---

Project Code: ACT-FO
