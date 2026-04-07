# BDev — Personal Portfolio

Personal portfolio website built with Next.js, Tailwind CSS, and Supabase.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase
- **Animations:** Framer Motion
- **Smooth Scroll:** Lenis
- **Icons:** Lucide React
- **Font:** Open Sans (Google Fonts)

## Features

- Dark minimalist design
- Scroll-driven hero card shrink animation
- Navbar that hides on scroll down and reappears on scroll up
- Infinite marquee text carousel
- Projects section dynamically loaded from Supabase
- Alternating image/text layout for projects
- Admin panel protected by Supabase Auth
- Supabase Storage for project images

## Running Locally

1. Clone the repository

```bash
git clone https://github.com/Sentessh/port.git
cd port
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file at the root with your Supabase credentials

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
```

4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
