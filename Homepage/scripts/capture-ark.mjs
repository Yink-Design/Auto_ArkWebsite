import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import {
  currentDir,
  projectRoot,
  viewports,
  captureKinds,
} from './ark-config.mjs';

const baseUrl = process.env.ARK_BASE_URL ?? 'http://127.0.0.1:4321/';

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function detectBrowser() {
  const launchAttempts = [
    { channel: 'msedge' },
    { channel: 'chrome' },
    {},
  ];

  for (const options of launchAttempts) {
    try {
      const browser = await chromium.launch({
        headless: true,
        ...options,
      });

      return browser;
    } catch (error) {
      const label = options.channel ?? 'playwright-managed chromium';
      console.warn(`[capture:ark] Unable to launch ${label}: ${error.message}`);
    }
  }

  throw new Error(
    'No Chromium-compatible browser could be launched. Install Chrome/Edge or run "npx playwright install chromium".',
  );
}

async function waitForReady(page) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        animation-delay: 0ms !important;
        animation-duration: 0ms !important;
        transition-delay: 0ms !important;
        transition-duration: 0ms !important;
        scroll-behavior: auto !important;
      }
    `,
  });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });
  await page.waitForTimeout(150);
}

async function capture() {
  await ensureDir(currentDir);

  const browser = await detectBrowser();

  try {
    for (const viewport of viewports) {
      const page = await browser.newPage({
        viewport: { width: viewport.width, height: viewport.height },
        colorScheme: 'light',
        deviceScaleFactor: 1,
      });

      await waitForReady(page);

      for (const kind of captureKinds) {
        const fileName = kind.file(viewport);
        const outputPath = path.join(currentDir, fileName);

        await page.screenshot({
          path: outputPath,
          fullPage: kind.fullPage,
        });

        const exists = await fileExists(outputPath);
        if (!exists) {
          throw new Error(`Failed to write screenshot: ${outputPath}`);
        }

        console.log(
          `[capture:ark] Captured ${fileName} at ${viewport.width}x${viewport.height}`,
        );
      }

      await page.close();
    }
  } finally {
    await browser.close();
  }
}

capture().catch((error) => {
  console.error(`[capture:ark] ${error.message}`);
  console.error(`[capture:ark] Project root: ${projectRoot}`);
  process.exitCode = 1;
});
