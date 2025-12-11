# Steph Portfolio

A Next.js 14 + TypeScript portfolio for showcasing Steph's work history, education, and contact details. The UI combines Tailwind CSS styling with Radix UI primitives, animations, and a library of reusable components so new sections or layouts can be iterated on quickly.

## Features

- **Modern stack** – Next.js App Router, React 18, Tailwind CSS, Radix UI, Framer Motion, and shadcn-inspired components.
- **Typed forms & validation** – `react-hook-form` + `zod` power the contact and utility forms in `components/ui/form.tsx`.
- **Printable collateral** – LaTeX sources in `assets/education.tex` and `assets/experience.tex` keep résumé artifacts versioned alongside the app.
- **Theme-aware design** – Light/dark themes and responsive layouts built with CSS variables and the design tokens in `styles/`.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   # or: pnpm install / yarn install
   ```
2. **Start the development server**
   ```bash
   npm run dev
   ```
   The site runs at http://localhost:3000 with hot reloading.
3. **Type-check & lint**
   ```bash
   npm run lint
   ```
4. **Create a production build**
   ```bash
   npm run build
   npm run start
   ```

## Project Structure

```
app/             Route handlers, metadata, and page sections
components/      UI primitives, section blocks, and shared logic
styles/          Global Tailwind styles and CSS variables
assets/          LaTeX sources for résumé/portfolio exports
public/          Static assets consumed by Next.js
```

Edit the copy, links, and content blocks in `app/` or `components/sections` to personalize the portfolio. Update the LaTeX files under `assets/` when you need refreshed PDF exports to match the site content.
