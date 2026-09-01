# Setup — Hey-JG-Blog

## 1. Supabase (database + auth)
1. Create a project at supabase.com (free tier is fine).
2. Go to **SQL Editor -> New query**, paste the entire contents of `supabase/setup.sql`, click **Run**.
   This creates all tables, security rules, and default content.
3. Go to **Authentication -> Users -> Add user**. Enter an email + password for yourself,
   and check **Auto Confirm User**. This is your one admin login.
4. Go to **Project Settings -> API**. Copy the **Project URL** and the **anon public** key.

## 2. Get your real content out of Trickle (optional but recommended)
Your live posts/about-page content aren't in this code export — Trickle stores that on its own
servers. To pull it out:
1. Open your **live Trickle site** in a browser tab.
2. Open DevTools (F12) -> Console.
3. Paste in the contents of `scripts/export-from-trickle.js`, press Enter.
4. It downloads `hey-jg-blog-export.json`. Send that file back to Claude — it'll generate the
   exact SQL insert statements to load your real posts into Supabase.

If you skip this, the site launches with the placeholder default content from `setup.sql`,
and you can just write everything fresh from the new admin panel.

## 3. Netlify
1. Push this folder to a GitHub repo (or drag-and-drop the folder into Netlify's deploy UI).
2. In Netlify: **Add new site -> Import an existing project**, pick the repo.
   Build command and publish directory are already set via `netlify.toml` — no changes needed.
3. Before the first deploy, go to **Site configuration -> Environment variables** and add:
   - `VITE_SUPABASE_URL` — from step 1
   - `VITE_SUPABASE_ANON_KEY` — from step 1
   - `VITE_ADMIN_EMAIL` — the email you created in step 1
4. Deploy. First build takes a minute or two (installing dependencies + building).

## 4. Using it
- Visit `/admin` on your new site, type your Supabase account password, and you're in.
- Everything else (writing posts, editing the About page, site settings) works the same as before.

## If the first Netlify build fails
Paste the build log back and it'll get fixed — Vite + React + Tailwind is a very standard
setup, so failures (if any) are almost always a one-line config fix.
