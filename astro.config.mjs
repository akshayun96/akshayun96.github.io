import { defineConfig } from 'astro/config';

export default defineConfig({
  // Repo must be named akshayun96.github.io for this address.
  site: 'https://akshayun96.github.io',
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/': '/en/',
  },
});
