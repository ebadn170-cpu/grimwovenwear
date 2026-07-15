# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hero.spec.ts >> Hero — reduced motion >> visual snapshot matches baseline
- Location: tests\e2e\hero.spec.ts:83:7

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | /**
  4   |  * Baseline smoke coverage for the hero. Re-run and compare as the hero
  5   |  * gains the 3D centerpiece and additional motion in later phases —
  6   |  * regressions here should be caught before they ship, not discovered on
  7   |  * a mid-tier phone (or a GPU-less VM) in production.
  8   |  */
  9   | 
  10  | test.describe("Hero — baseline", () => {
  11  |   test("renders the wordmark and scroll cue", async ({ page }) => {
  12  |     await page.goto("/");
  13  | 
  14  |     await expect(page.getByRole("heading", { name: "Grim" })).toBeVisible();
  15  |     await expect(page.getByText("Woven Wear")).toBeVisible();
  16  |     await expect(page.getByText("Est. MMXXVI")).toBeVisible();
  17  |   });
  18  | 
  19  |   test("hero canvas host is marked decorative", async ({ page }) => {
  20  |     await page.goto("/");
  21  |     // Whether or not WebGL is available in this environment, the wrapper
  22  |     // that hosts it (or its fallback) must stay out of the a11y tree.
  23  |     const host = page.locator('[aria-hidden="true"]').first();
  24  |     await expect(host).toBeAttached();
  25  |   });
  26  | 
  27  |   test("largest contentful paint stays within budget", async ({ page }) => {
  28  |     await page.goto("/");
  29  | 
  30  |     const lcp = await page.evaluate(
  31  |       () =>
  32  |         new Promise<number>((resolve) => {
  33  |           new PerformanceObserver((list) => {
  34  |             const entries = list.getEntries();
  35  |             const last = entries[entries.length - 1];
  36  |             resolve(last.startTime);
  37  |           }).observe({ type: "largest-contentful-paint", buffered: true });
  38  | 
  39  |           // Don't hang the test if LCP never fires.
  40  |           setTimeout(() => resolve(-1), 5000);
  41  |         })
  42  |     );
  43  | 
  44  |     expect(lcp).toBeGreaterThan(-1);
  45  |     expect(lcp).toBeLessThan(2000);
  46  |   });
  47  | 
  48  |   test("no meaningful layout shift while the hero settles", async ({ page }) => {
  49  |     await page.goto("/");
  50  |     await page.waitForTimeout(1500); // let webfonts + canvas mount settle
  51  | 
  52  |     const cls = await page.evaluate(
  53  |       () =>
  54  |         new Promise<number>((resolve) => {
  55  |           let total = 0;
  56  |           new PerformanceObserver((list) => {
  57  |             for (const entry of list.getEntries() as unknown as Array<
  58  |               PerformanceEntry & { value: number; hadRecentInput: boolean }
  59  |             >) {
  60  |               if (!entry.hadRecentInput) total += entry.value;
  61  |             }
  62  |           }).observe({ type: "layout-shift", buffered: true });
  63  |           setTimeout(() => resolve(total), 500);
  64  |         })
  65  |     );
  66  | 
  67  |     expect(cls).toBeLessThan(0.1);
  68  |   });
  69  | });
  70  | 
  71  | test.describe("Hero — reduced motion", () => {
  72  |   test.use({ contextOptions: { reducedMotion: "reduce" } });
  73  | 
  74  |   test("wordmark settles at resting state without animating in", async ({
  75  |     page,
  76  |   }) => {
  77  |     await page.goto("/");
  78  | 
  79  |     const wordmark = page.locator('[data-reveal="wordmark"]');
  80  |     await expect(wordmark).toHaveCSS("opacity", "1");
  81  |   });
  82  | 
  83  |   test("visual snapshot matches baseline", async ({ page }) => {
> 84  |     await page.goto("/");
      |                ^ Error: page.goto: Target page, context or browser has been closed
  85  |     await page.waitForTimeout(500);
  86  |     // First run generates the baseline image — commit it. Re-run with
  87  |     // `npm run test:e2e:update-snapshots` after an intentional hero change.
  88  |     await expect(page).toHaveScreenshot("hero-reduced-motion.png", {
  89  |       maxDiffPixelRatio: 0.02,
  90  |     });
  91  |   });
  92  | });
  93  | 
  94  | test.describe("Hero — mobile viewport", () => {
  95  |   test.use({ viewport: { width: 375, height: 667 } });
  96  | 
  97  |   test("wordmark remains legible within viewport", async ({ page }) => {
  98  |     await page.goto("/");
  99  |     const wordmark = page.getByRole("heading", { name: "Grim" });
  100 |     await expect(wordmark).toBeVisible();
  101 |     const box = await wordmark.boundingBox();
  102 |     expect(box?.width ?? 0).toBeLessThanOrEqual(375);
  103 |   });
  104 | });
  105 | 
  106 | test.describe("Hero — WebGL unavailable (regression)", () => {
  107 |   // Covers the crash seen on real hardware: "THREE.WebGLRenderer: A WebGL
  108 |   // context could not be created" on machines/VMs with hardware
  109 |   // acceleration disabled or GPU access blocked. HeroCanvas must detect
  110 |   // this ahead of time (useHeroCapability) and render the static fallback
  111 |   // instead of ever attempting a WebGL context — this test simulates that
  112 |   // environment by making canvas.getContext("webgl"/"webgl2") return null,
  113 |   // the same signal a real GPU-less browser produces.
  114 |   test("falls back gracefully instead of throwing", async ({ page }) => {
  115 |     const pageErrors: Error[] = [];
  116 |     page.on("pageerror", (err) => pageErrors.push(err));
  117 | 
  118 |     await page.addInitScript(() => {
  119 |       const originalGetContext = HTMLCanvasElement.prototype.getContext;
  120 |       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  121 |       (HTMLCanvasElement.prototype as any).getContext = function (
  122 |         type: string,
  123 |         ...args: unknown[]
  124 |       ) {
  125 |         if (typeof type === "string" && type.includes("webgl")) return null;
  126 |         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  127 |         return (originalGetContext as any).apply(this, [type, ...args]);
  128 |       };
  129 |     });
  130 | 
  131 |     await page.goto("/");
  132 | 
  133 |     // No live canvas should ever be mounted in this environment.
  134 |     await expect(page.locator("canvas")).toHaveCount(0);
  135 |     // The rest of the hero must render normally regardless.
  136 |     await expect(page.getByRole("heading", { name: "Grim" })).toBeVisible();
  137 |     // And nothing should have thrown to the page.
  138 |     expect(pageErrors).toHaveLength(0);
  139 |   });
  140 | });
```