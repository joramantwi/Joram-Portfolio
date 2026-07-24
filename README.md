# Joram Antwi — Portfolio

Professional portfolio for **Joram Antwi**, Dynamics 365 Functional Consultant. The UI is themed after the **Dynamics 365 model-driven app** experience — a dark command bar, a grouped left navigation pane, an in-app command bar, and dashboard-style tiles.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **lucide-react** icons
- Static export (`output: "export"`) — ready for **Azure Static Web Apps**

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build (static export)

```bash
npm run build
```

The static site is generated into the `out/` folder.

## Editing content

All portfolio content lives in a single file: [`src/data/portfolio.ts`](src/data/portfolio.ts). Update your summary, experience, skills, projects, certifications and education there — the UI updates automatically.

Navigation groups and view titles are defined in [`src/components/nav.ts`](src/components/nav.ts).

## CV (by request only)

The CV is intentionally **not hosted** on the public site. The "Request CV" buttons and the sidebar "CV / Résumé" link open a pre-addressed email so you can send your CV only to recruiters and people you choose to share it with.

## Deployment (Azure Static Web Apps)

A workflow is provided at `.github/workflows/azure-static-web-apps.yml`.

1. Create an Azure Static Web App resource and connect it to this GitHub repo.
2. Set **app location** = `/`, **output location** = `out`, **build command** = `npm run build`.
3. Azure adds the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret automatically — pushes to `main` then deploy.

## Project structure

```
src/
  app/               # Next.js app router (layout, page, global styles)
  components/
    TopBar.tsx       # dark D365 command header
    Sidebar.tsx      # grouped navigation pane
    CommandBar.tsx   # in-view command/action bar
    AppShell.tsx     # client shell wiring views + navigation
    nav.ts           # navigation config + view titles
    ui.tsx           # shared Tile / Badge primitives
    views/           # one component per navigable view
  data/
    portfolio.ts     # all portfolio content
```
