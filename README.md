# Bug Tracker — Group 3 (Frontend)

# Deployment URL
https://group-project-bug-tracker-front-end-group-3-9dhrg5gp7.vercel.app/

Next.js app for submitting bug reports to the TCSS 460 Group 3 backend API.

## Backend API

**Base URL:** `https://group-project-backend-group-3-1.onrender.com`

New reports are always submitted with `issueStatus` set to `OPEN`.

## Quick start

**Requirements:** Node.js 20+, [pnpm](https://pnpm.io/installation)

```bash
pnpm install
```

Create a `.env` file in the project root (optional — defaults to the Render backend):

```env
NEXT_PUBLIC_API_BASE_URL=https://group-project-backend-group-3-1.onrender.com
```

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start development server |
| `pnpm build` | Production build         |
| `pnpm start` | Run production server    |
| `pnpm lint`  | Run ESLint               |

## Environment variables

| Variable                   | Required | Description                                                             |
| -------------------------- | -------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | No       | Backend base URL (no trailing slash). Defaults to the Render URL above. |

Restart the dev server after changing `.env`.

## CI

GitHub Actions runs on push/PR to `main`: `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm build`.

## Stack

- Next.js 16 · React 19 · TypeScript · Tailwind CSS v4
