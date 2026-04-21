import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {
  currentDir,
  diffsDir,
  referenceMap,
  reportJsonPath,
  reportMdPath,
  reportsDir,
  viewports,
  captureKinds,
} from './ark-config.mjs';

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function comparePair(actualPath, referencePath, diffPath) {
  const actual = sharp(actualPath).ensureAlpha();
  const reference = sharp(referencePath).ensureAlpha();

  const actualMeta = await actual.metadata();
  const referenceMeta = await reference.metadata();

  if (actualMeta.width !== referenceMeta.width) {
    return {
      status: 'fail',
      reason: `width mismatch actual=${actualMeta.width} ref=${referenceMeta.width}`,
      diffRatio: null,
      meanChannelDelta: null,
    };
  }

  const compareHeight = Math.min(actualMeta.height, referenceMeta.height);
  const heightDelta = Math.abs(actualMeta.height - referenceMeta.height);
  const heightDeltaRatio = heightDelta / Math.max(actualMeta.height, referenceMeta.height);
  const heightNote =
    actualMeta.height === referenceMeta.height
      ? 'height match'
      : `height mismatch actual=${actualMeta.height} ref=${referenceMeta.height} compare_height=${compareHeight}`;

  const actualRaw = await actual
    .extract({
      left: 0,
      top: 0,
      width: actualMeta.width,
      height: compareHeight,
    })
    .raw()
    .toBuffer();
  const referenceRaw = await reference
    .extract({
      left: 0,
      top: 0,
      width: referenceMeta.width,
      height: compareHeight,
    })
    .raw()
    .toBuffer();
  const diffBuffer = Buffer.alloc(actualRaw.length);

  let changedPixels = 0;
  let totalDelta = 0;

  for (let index = 0; index < actualRaw.length; index += 4) {
    const dr = Math.abs(actualRaw[index] - referenceRaw[index]);
    const dg = Math.abs(actualRaw[index + 1] - referenceRaw[index + 1]);
    const db = Math.abs(actualRaw[index + 2] - referenceRaw[index + 2]);
    const da = Math.abs(actualRaw[index + 3] - referenceRaw[index + 3]);
    const delta = dr + dg + db + da;

    totalDelta += delta;

    const pixelChanged = delta > 32;
    if (pixelChanged) {
      changedPixels += 1;
      diffBuffer[index] = 255;
      diffBuffer[index + 1] = 0;
      diffBuffer[index + 2] = 0;
      diffBuffer[index + 3] = 255;
    } else {
      diffBuffer[index] = actualRaw[index];
      diffBuffer[index + 1] = actualRaw[index + 1];
      diffBuffer[index + 2] = actualRaw[index + 2];
      diffBuffer[index + 3] = 110;
    }
  }

  const pixelCount = actualMeta.width * compareHeight;
  const diffRatio = changedPixels / pixelCount;
  const meanChannelDelta = totalDelta / (pixelCount * 4);

  await sharp(diffBuffer, {
    raw: {
      width: actualMeta.width,
      height: compareHeight,
      channels: 4,
    },
  }).png().toFile(diffPath);

  let status = 'pass';
  if (diffRatio > 0.12 || meanChannelDelta > 18 || heightDeltaRatio > 0.25) {
    status = 'fail';
  } else if (diffRatio > 0.05 || meanChannelDelta > 9 || heightDeltaRatio > 0) {
    status = 'warn';
  }

  return {
    status,
    reason: `${heightNote}; diff_ratio=${(diffRatio * 100).toFixed(2)}% mean_delta=${meanChannelDelta.toFixed(2)}`,
    diffRatio,
    meanChannelDelta,
  };
}

function toMarkdown(results) {
  const lines = [
    '# Ark Compare Report',
    '',
    '| Check | Status | Notes |',
    '| --- | --- | --- |',
  ];

  for (const result of results) {
    const label = `${result.viewport}/${result.capture}`;
    lines.push(`| ${label} | ${result.status} | ${result.reason} |`);
  }

  return `${lines.join('\n')}\n`;
}

async function main() {
  await ensureDir(reportsDir);
  await ensureDir(diffsDir);

  const results = [];

  for (const viewport of viewports) {
    for (const capture of captureKinds) {
      const key = `${viewport.key}-${capture.key}`;
      const actualPath = path.join(currentDir, capture.file(viewport));
      const referencePath = referenceMap[key];

      if (!(await exists(actualPath))) {
        results.push({
          viewport: viewport.key,
          capture: capture.key,
          status: 'skip',
          reason: 'no current capture found',
        });
        continue;
      }

      if (!referencePath) {
        results.push({
          viewport: viewport.key,
          capture: capture.key,
          status: 'skip',
          reason: 'no reference configured',
        });
        continue;
      }

      if (!(await exists(referencePath))) {
        results.push({
          viewport: viewport.key,
          capture: capture.key,
          status: 'skip',
          reason: `reference missing at ${referencePath}`,
        });
        continue;
      }

      const diffPath = path.join(
        diffsDir,
        `${viewport.key}-${capture.key}-diff.png`,
      );

      const result = await comparePair(actualPath, referencePath, diffPath);
      results.push({
        viewport: viewport.key,
        capture: capture.key,
        reference: path.basename(referencePath),
        diff: path.basename(diffPath),
        ...result,
      });
    }
  }

  await fs.writeFile(reportJsonPath, JSON.stringify(results, null, 2));
  await fs.writeFile(reportMdPath, toMarkdown(results));

  for (const result of results) {
    console.log(
      `[compare:ark] ${result.viewport}/${result.capture}: ${result.status} - ${result.reason}`,
    );
  }

  if (results.some((entry) => entry.status === 'fail')) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`[compare:ark] ${error.message}`);
  process.exitCode = 1;
});
