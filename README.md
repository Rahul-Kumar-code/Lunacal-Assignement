# Lunacal Assignment UI

A polished, responsive single-page experience built with Next.js 16, Tailwind CSS v4, and React 19. The design recreates the provided Lunacal assignment mockup featuring an "About Me" profile widget, an interactive gallery widget, custom scrollbar treatments, and rich hover interactions.

## ✨ Features

- **Responsive layout** – Mobile-first column layout that expands to a split desktop view without wasting space on smaller screens.
- **About Me widget** – Tabbed content (About Me, Experiences, Recommended) with custom scroll indicator styling and subtle transitions.
- **Gallery widget** – Horizontal carousel with snap scrolling, keyboard-accessible arrow controls, and client-side image uploads via object URLs.
- **Interactive polish** – Hover tilt/scale animations, soft shadows, customized scrollbars, and divider accents to match the supplied design reference.
- **TypeScript first** – Strong typing across components to ease future enhancements.

## 🏁 Getting Started

```bash
# install dependencies
npm install

# start the development server
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000). Tailwind styles hot-reload while you edit files under `app/` and `components/`.

## 📁 Project Structure

```
app/
  layout.tsx        # Root layout shell
  page.tsx          # Main page rendering both widgets
components/
  AboutMeWidget.tsx # Profile tabs & custom scrollbar
  GalleryWidget.tsx # Carousel, upload handling, hover effects
public/images/      # Default gallery seed images
```

## 🔧 Customization Tips

- Update the introductory copy and experience details by editing the `TAB_CONTENT` map in `components/AboutMeWidget.tsx`.
- Replace or add default gallery items by dropping images into `public/images/` and adjusting `INITIAL_IMAGES` in `components/GalleryWidget.tsx`.
- Tweak hover motion or sizing using Tailwind utilities inside each component.

## ✅ Testing & Linting

This project ships with Next.js defaults. You can run:

```bash
npm run lint
```

to catch TypeScript and ESLint issues. Add your preferred testing stack (e.g., Vitest, Jest, Playwright) as needed.

## 🚀 Deployment

Any platform that supports Node.js can host the app. For the smoothest experience, deploy via [Vercel](https://vercel.com/) or your chosen static hosting provider:

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork or clone the repository.
2. Create a feature branch (`git checkout -b feature/amazing-improvement`).
3. Commit with clear messages and open a pull request describing your change and screenshots where useful.

---

Need design tweaks or new modules? Open an issue or start a discussion—happy to iterate!This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
