import { defineConfig } from 'cypress';

export default defineConfig({
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  modifyObstructiveCode: false,
  video: true,
  videosFolder: '../../dist/cypress/apps/finance-fe-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/finance-fe-e2e/screenshots',
  chromeWebSecurity: false,
  e2e: {
    specPattern: './src/e2e/**/*.cy.ts',
    supportFile: './src/support/e2e.ts',
  },
});
