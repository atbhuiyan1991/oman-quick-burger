# Oman Quick Burger

Quick Order Menu & WhatsApp ordering web app with EN / AR + RTL support, live GPS location sharing, PWA manifest & service worker, and a Supabase Auth-protected admin panel in the same repository.

## Files Included
- `index.html` — Customer storefront (menu, search, sort, categories, customization modal, GPS WhatsApp checkout).
- `app.js` — Customer storefront logic (read-only menu fetch from Supabase).
- `style.css` — Dark mobile-first styling with RTL support.
- `manage-panel.html` & `manage-panel.js` — Admin panel protected by Supabase Email/Password login.
- `manifest.json` & `sw.js` — PWA support for Android & iPhone.
- `icon-192.png` & `icon-512.png` — App icons.
- `supabase-setup.sql` — Database table, RLS policies, and Storage bucket policies.

## Quick Setup
1. Open **Supabase SQL Editor** and run `supabase-setup.sql`.
2. Create a public storage bucket named `menu-images` in **Supabase Storage**.
3. Create an admin user in **Supabase Authentication -> Users**.
4. Replace `YOUR-PROJECT-ID` and `YOUR-SUPABASE-ANON-KEY` in `app.js` and `manage-panel.js`.
5. Upload all files to your GitHub repository root and enable **GitHub Pages**.
