// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Change this to your real production URL before deploying.
  site: 'https://senior-track.railsfullstack.com',
  integrations: [tailwind(), sitemap()],
});
