// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  // Production URL — drives @astrojs/sitemap absolute URLs and any
  // `Astro.site`-based references in pages/layouts.
  site: 'https://learn.railsfullstack.com',
  integrations: [tailwind(), sitemap(), icon()],
});
