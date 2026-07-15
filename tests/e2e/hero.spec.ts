import { test, expect } from "@playwright/test";

/**
 * Baseline smoke coverage for the hero. Re-run and compare as the hero
 * gains the 3D centerpiece and additional motion in later phases —
 * regressions here should be caught before they ship, not discovered on
 * a mid-tier phone (or a GPU-less VM) in production.
 */

test.describe("Hero — baseline", () => {
  test("renders the wordmark and scroll cue", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Grim" })).toBeVisible();
    await expect(page.getByText("Woven Wear")).toBeVisible();
    await expect(page.getByText("Est. MMXXVI")).toBeVisible();
  });

  test("hero canvas host is marked decorative", async ({ page }) => {
    await page.goto("/");
    // Whether or not WebGL is available in this environment, the wrapper
    // that hosts it (or its fallback) must stay out of the a11y tree.
    const host = page.locator('[aria-hidden="true"]').first();
    await expect(host).toBeAttached();
  });

  test("largest contentful paint stays within budget", async ({ page }) => {
    await page.goto("/");

    const lcp = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const last = entries[entries.length - 1];
            resolve(last.startTime);
          }).observe({ type: "largest-contentful-paint", buffered: true });

          // Don't hang the test if LCP never fires.
          setTimeout(() => resolve(-1), 5000);
        })
    );

    expect(lcp).toBeGreaterThan(-1);
    expect(lcp).toBeLessThan(2000);
  });

  test("no meaningful layout shift while the hero settles", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1500); // let webfonts + canvas mount settle

    const cls = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let total = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as unknown as Array<
              PerformanceEntry & { value: number; hadRecentInput: boolean }
            >) {
              if (!entry.hadRecentInput) total += entry.value;
            }
          }).observe({ type: "layout-shift", buffered: true });
          setTimeout(() => resolve(total), 500);
        })
    );

    expect(cls).toBeLessThan(0.1);
  });
});

test.describe("Hero — reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("wordmark settles at resting state without animating in", async ({
    page,
  }) => {
    await page.goto("/");

    const wordmark = page.locator('[data-reveal="wordmark"]');
    await expect(wordmark).toHaveCSS("opacity", "1");
  });

  test("visual snapshot matches baseline", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);
    // First run generates the baseline image — commit it. Re-run with
    // `npm run test:e2e:update-snapshots` after an intentional hero change.
    await expect(page).toHaveScreenshot("hero-reduced-motion.png", {
      maxDiffPixelRatio: 0.02,
    });
  });
});

test.describe("Hero — mobile viewport", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("wordmark remains legible within viewport", async ({ page }) => {
    await page.goto("/");
    const wordmark = page.getByRole("heading", { name: "Grim" });
    await expect(wordmark).toBeVisible();
    const box = await wordmark.boundingBox();
    expect(box?.width ?? 0).toBeLessThanOrEqual(375);
  });
});

test.describe("Hero — WebGL unavailable (regression)", () => {
  // Covers the crash seen on real hardware: "THREE.WebGLRenderer: A WebGL
  // context could not be created" on machines/VMs with hardware
  // acceleration disabled or GPU access blocked. HeroCanvas must detect
  // this ahead of time (useHeroCapability) and render the static fallback
  // instead of ever attempting a WebGL context — this test simulates that
  // environment by making canvas.getContext("webgl"/"webgl2") return null,
  // the same signal a real GPU-less browser produces.
  test("falls back gracefully instead of throwing", async ({ page }) => {
    const pageErrors: Error[] = [];
    page.on("pageerror", (err) => pageErrors.push(err));

    await page.addInitScript(() => {
      const originalGetContext = HTMLCanvasElement.prototype.getContext;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (HTMLCanvasElement.prototype as any).getContext = function (
        type: string,
        ...args: unknown[]
      ) {
        if (typeof type === "string" && type.includes("webgl")) return null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (originalGetContext as any).apply(this, [type, ...args]);
      };
    });

    await page.goto("/");

    // No live canvas should ever be mounted in this environment.
    await expect(page.locator("canvas")).toHaveCount(0);
    // The rest of the hero must render normally regardless.
    await expect(page.getByRole("heading", { name: "Grim" })).toBeVisible();
    // And nothing should have thrown to the page.
    expect(pageErrors).toHaveLength(0);
  });
});