import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,

  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.{cy,spec}.{ts,tsx,js,jsx}",
    supportFile: "cypress/support/e2e.ts",
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,
  },
});
