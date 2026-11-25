import { defineConfig } from 'astro/config';

export default defineConfig({
  // TODO: replace GITHUB_USERNAME with your GitHub username (repo must be named GITHUB_USERNAME.github.io).
  site: 'https://GITHUB_USERNAME.github.io',
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/': '/en/',
  },
});
