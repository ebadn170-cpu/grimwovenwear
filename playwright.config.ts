import { defineConfig, devices } from "@playwright/test";

/**
 * Baseline e2e coverage — currently scoped to the hero (see
 * tests/e2e/hero.spec.ts). Run with `npm run test:e2e`.
 *
 * `webServer` boots the dev server automatically; if one is already
 * running on :3000 locally it's reused instead of starting a second copy.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium-reduced-motion",
      use: {
        ...devices["Desktop Chrome"],
        contextOptions: { reducedMotion: "reduce" },
      },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone SE"] },
    },
  ],
});