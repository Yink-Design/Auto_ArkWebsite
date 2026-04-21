import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const projectRoot = path.resolve(__dirname, '..');
export const screenshotsDir = path.join(projectRoot, 'screenshots');
export const automationDir = path.join(screenshotsDir, 'ark-automation');
export const currentDir = path.join(automationDir, 'current');
export const reportsDir = path.join(automationDir, 'reports');
export const diffsDir = path.join(reportsDir, 'diffs');

export const viewports = [
  { key: '360', width: 360, height: 900 },
  { key: '430', width: 430, height: 932 },
  { key: '768', width: 768, height: 900 },
  { key: '1024', width: 1024, height: 900 },
  { key: '1280', width: 1280, height: 960 },
  { key: '1440', width: 1440, height: 1024 },
  { key: '1720', width: 1720, height: 1080 },
];

export const captureKinds = [
  { key: 'top', fullPage: false, file: (vp) => `ark-${vp.key}-top.png` },
  { key: 'full', fullPage: true, file: (vp) => `ark-${vp.key}-full.png` },
];

export const referenceMap = {
  '430-top': path.join(screenshotsDir, 'web-ref-430.png'),
  '1024-top': path.join(screenshotsDir, 'ark-home-1024-v8.png'),
  '1280-top': path.join(screenshotsDir, 'web-ref-top.png'),
  '1280-full': path.join(screenshotsDir, 'ark-home-full-v11.png'),
};

export const reportJsonPath = path.join(reportsDir, 'compare-report.json');
export const reportMdPath = path.join(reportsDir, 'compare-report.md');

export function resolveCapturePath(viewportKey, captureKey) {
  const kind = captureKinds.find((entry) => entry.key === captureKey);
  if (!kind) {
    throw new Error(`Unknown capture kind: ${captureKey}`);
  }

  return path.join(currentDir, kind.file({ key: viewportKey }));
}
