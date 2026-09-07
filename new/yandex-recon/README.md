# Yandex Recon

> Yandex dork queries for recon, OSINT & bug bounty.

A client-side Yandex search query generator for authorized security research, OSINT, asset discovery, and bug-bounty reconnaissance. All query generation occurs locally in your browser — no data leaves your machine.

**Passive OSINT · no traffic to target**

---

## Features

- **80+ dork templates** across 5 categories: Subdomains, Open Directories, Sensitive Files, Admin & Login, Recon
- **rhost wildcard technique** — Yandex-specific reversed-host subdomain enumeration including A–Z brute-force variants
- **Category & severity filters** — Critical / High / Info with multi-select
- **Engine switching** — Yandex.com or Yandex.ru
- **One-click Run on Yandex** — opens URL-encoded search in a new tab
- **Copy individual queries** or copy all filtered results at once
- **Export as TXT / JSON / CSV** — browser-side downloads, no server required
- **Favorites** — star dorks and filter to favorites; persisted in localStorage
- **Search history** — remembers recent targets; click to re-generate
- **Query search** — real-time filter across title, description, query, and category
- **Grid / List view** — preference persisted in localStorage
- **Custom Dork Builder** — compose queries from operators + values, or enter freeform queries; add to results
- **Statistics dashboard** — live counts of Total / Critical / High / Info
- **Dark theme** with grid background and glassmorphism cards
- **Fully responsive** — desktop, tablet, and mobile layouts
- **Accessible** — keyboard navigable, visible focus states, aria-labels, reduced-motion support
- **Zero dependencies beyond React + Tailwind** — no backend, no auth, no database

---

## Screenshots

_(Add screenshots here after deployment)_

---

## Installation

```bash
git clone https://github.com/your-username/yandex-recon.git
cd yandex-recon
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Deployment

### GitHub Pages

1. Build: `npm run build`
2. Deploy `dist/` via GitHub Pages (set source to the `dist` folder or use a `gh-pages` action)

### Vercel

```bash
npx vercel --prod
```

Or connect the repository in the Vercel dashboard — it auto-detects Vite.

### Netlify

```bash
npx netlify deploy --prod --dir=dist
```

Or connect via the Netlify dashboard. Build command: `npm run build`, publish directory: `dist`.

### Cloudflare Pages

Connect your GitHub repository in the Cloudflare Pages dashboard:
- Build command: `npm run build`
- Build output directory: `dist`

---

## Usage

1. Enter a target domain (`example.com`, `sub.example.com`, `https://example.com/`) in the input field
2. Press Enter or click **Generate Dorks**
3. Filter by category (Subdomains, Open Directories, Sensitive Files, Admin & Login, Recon)
4. Filter by severity (Critical, High, Info) and choose engine (Yandex.com or Yandex.ru)
5. Click **Copy** to copy a query, or **Run on Yandex** to open it in a new tab
6. Click **Copy all** to copy every visible query at once
7. Export as TXT / JSON / CSV for use in your workflow
8. Star queries to save them as favorites
9. Use the **Custom** category to build and test your own dork queries

---

## Query-Generation Architecture

All dork templates live in `src/data/dorks.ts` as structured TypeScript objects:

```typescript
type Dork = {
  id: string;
  category: Category;
  severity: Severity;
  title: string;
  description: string;
  query: (domain: string) => string;
};
```

Each `query` field is a **function**, not a static string. When the user submits a domain:

1. `normalizeDomain(input)` strips protocols, `www.`, paths, and ports, returning a clean lowercase domain
2. `generateDorks(domain)` maps every template to a concrete string by calling `dork.query(domain)`
3. For `rhost:` queries, `reverseHost(domain)` reverses the domain parts: `example.com → com.example`, then the wildcard `.*` or `.a*`–`.z*` suffix is appended
4. The generated array is stored in React state — no server, no network requests

This means the domain never appears hardcoded anywhere in the source. Every query result is dynamically computed from the user's input.

---

## Project Structure

```
src/
  components/
    Header.tsx           # Brand, tagline, operator badges
    TargetInput.tsx      # Domain input with normalization and history dropdown
    FilterBar.tsx        # Category, severity, and engine pills
    StatsCards.tsx       # Total / Critical / High / Info counts
    ResultsToolbar.tsx   # Count, search, view toggle, copy all, export
    DorkCard.tsx         # Individual query card (grid + list modes)
    DorkGrid.tsx         # Category-grouped card layout
    CustomDorkBuilder.tsx # Builder UI + freeform textarea
    EmptyState.tsx       # Pre-generate and no-match states
    Footer.tsx           # Branding and privacy note

  data/
    dorks.ts             # All 80+ dork templates + generateDorks()
    operators.ts         # Yandex operator reference data

  lib/
    domain.ts            # normalizeDomain(), reverseHost(), isValidDomain()
    clipboard.ts         # copyToClipboard() with fallback
    export.ts            # exportTxt(), exportJson(), exportCsv()
    yandex.ts            # buildYandexUrl(), openInYandex()
    storage.ts           # localStorage helpers for favorites/history/prefs

  types/
    dork.ts              # TypeScript types

  App.tsx                # Root component: state, filtering, orchestration
  main.tsx               # Entry point
  index.css              # Tailwind + custom design tokens
```

---

## Privacy

- Query generation occurs entirely in your browser
- No domains, queries, or any user data are sent to any server
- No analytics or tracking are included by default
- Favorites and history are stored in your browser's localStorage only

---

## Responsible Use

This tool is intended **only for authorized security research**. Only use it against domains and systems you own or have explicit written permission to test. Generating search queries is a passive, read-only action — but using findings from those queries to access systems without authorization may be illegal in your jurisdiction.

---

## Contributing

Pull requests and issues are welcome. Please open an issue to discuss major changes before submitting a PR.

---

## License

MIT
