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

Edit `project.config.json` to customize:

- Site name, tagline, and description
- Page content (hero, about, CTA, stories sections)
- Navigation links
- Social media links
- Contact information
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
