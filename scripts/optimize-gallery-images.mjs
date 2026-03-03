import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const INPUT_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
const OUTPUT_FORMATS = ['avif', 'webp'];

const MAX_WIDTH = 1920;
const AVIF_QUALITY = 48;
const WEBP_QUALITY = 72;

const SOURCE_ROOTS = [
  'public/branch-photos',
  'public/store-front-thumbnails',
  'public/gallery/seminars',
  'public/gallery/events',
  'public/gallery/certificates',
];

const CACHE_FILE = 'node_modules/.cache/gallery-image-optimizer.json';

const toPosix = (value) => value.split(path.sep).join('/');

const isInputImage = (relativePath) => INPUT_EXTENSIONS.has(path.extname(relativePath).toLowerCase());

const ensureDirectory = async (absolutePath) => {
  await fs.mkdir(absolutePath, { recursive: true });
};

const readJson = async (absolutePath) => {
  try {
    const data = await fs.readFile(absolutePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
};

const walkFiles = async (absoluteRoot) => {
  const files = [];

  const visit = async (absoluteDirectory) => {
    let entries = [];
    try {
      entries = await fs.readdir(absoluteDirectory, { withFileTypes: true });
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
        return;
      }
      throw error;
    }

    for (const entry of entries) {
      const absoluteEntry = path.join(absoluteDirectory, entry.name);
      if (entry.isDirectory()) {
        await visit(absoluteEntry);
        continue;
      }
      if (entry.isFile()) {
        files.push(absoluteEntry);
      }
    }
  };

  await visit(absoluteRoot);
  return files;
};

const outputRelativePath = (relativeSourcePath, format) => {
  const extension = path.extname(relativeSourcePath);
  const withoutExtension = relativeSourcePath.slice(0, -extension.length);
  return toPosix(path.join('optimized', `${withoutExtension}.${format}`));
};

const outputAbsolutePath = (projectRoot, relativeSourcePath, format) =>
  path.join(projectRoot, 'public', outputRelativePath(relativeSourcePath, format));

const hasFreshOutputs = async (projectRoot, relativeSourcePath) => {
  for (const format of OUTPUT_FORMATS) {
    try {
      await fs.access(outputAbsolutePath(projectRoot, relativeSourcePath, format));
    } catch {
      return false;
    }
  }
  return true;
};

const optimizeSingleImage = async (absoluteSourcePath, absoluteDestinationBase) => {
  const source = sharp(absoluteSourcePath, { failOn: 'none', limitInputPixels: false }).rotate();
  const metadata = await source.metadata();
  const width = metadata.width ?? 0;
  const resize = width > MAX_WIDTH ? { width: MAX_WIDTH, withoutEnlargement: true } : null;

  const createPipeline = () => {
    const pipeline = sharp(absoluteSourcePath, { failOn: 'none', limitInputPixels: false }).rotate();
    return resize ? pipeline.resize(resize) : pipeline;
  };

  await ensureDirectory(path.dirname(`${absoluteDestinationBase}.avif`));
  await createPipeline().avif({ quality: AVIF_QUALITY, effort: 5 }).toFile(`${absoluteDestinationBase}.avif`);
  await createPipeline().webp({ quality: WEBP_QUALITY, effort: 5 }).toFile(`${absoluteDestinationBase}.webp`);
};

const removeStaleFiles = async (projectRoot, expectedRelativeOutputs) => {
  const optimizedRoot = path.join(projectRoot, 'public', 'optimized');
  const existingFiles = await walkFiles(optimizedRoot);
  const expectedSet = new Set(Array.from(expectedRelativeOutputs.values()));

  for (const absoluteFile of existingFiles) {
    const relativeFromPublic = toPosix(path.relative(path.join(projectRoot, 'public'), absoluteFile));
    if (!expectedSet.has(relativeFromPublic)) {
      await fs.rm(absoluteFile, { force: true });
    }
  }
};

export const optimizeGalleryImages = async (projectRoot = process.cwd()) => {
  const publicRoot = path.join(projectRoot, 'public');
  const cachePath = path.join(projectRoot, CACHE_FILE);
  const previousCache = await readJson(cachePath);
  const nextCache = {};

  const sourceFiles = [];
  for (const relativeRoot of SOURCE_ROOTS) {
    const absoluteRoot = path.join(projectRoot, relativeRoot);
    const files = await walkFiles(absoluteRoot);
    for (const absoluteFile of files) {
      const relativeFromPublic = toPosix(path.relative(publicRoot, absoluteFile));
      if (isInputImage(relativeFromPublic)) {
        sourceFiles.push({ absoluteFile, relativeFromPublic });
      }
    }
  }

  sourceFiles.sort((a, b) => a.relativeFromPublic.localeCompare(b.relativeFromPublic, undefined, { numeric: true, sensitivity: 'base' }));

  let optimizedCount = 0;
  let skippedCount = 0;

  const expectedRelativeOutputs = new Set();

  for (const source of sourceFiles) {
    const stat = await fs.stat(source.absoluteFile);
    const fingerprint = `${stat.size}-${stat.mtimeMs}`;
    const cacheKey = source.relativeFromPublic;
    const cachedFingerprint = previousCache[cacheKey]?.fingerprint;

    const outputBase = path.join(projectRoot, 'public', 'optimized', source.relativeFromPublic).replace(/\.[^.]+$/, '');
    for (const format of OUTPUT_FORMATS) {
      expectedRelativeOutputs.add(outputRelativePath(source.relativeFromPublic, format));
    }

    const outputsReady = await hasFreshOutputs(projectRoot, source.relativeFromPublic);
    if (cachedFingerprint === fingerprint && outputsReady) {
      nextCache[cacheKey] = { fingerprint };
      skippedCount += 1;
      continue;
    }

    await optimizeSingleImage(source.absoluteFile, outputBase);
    nextCache[cacheKey] = { fingerprint };
    optimizedCount += 1;
  }

  await removeStaleFiles(projectRoot, expectedRelativeOutputs);
  await ensureDirectory(path.dirname(cachePath));
  await fs.writeFile(cachePath, JSON.stringify(nextCache, null, 2), 'utf8');

  return {
    total: sourceFiles.length,
    optimized: optimizedCount,
    skipped: skippedCount,
  };
};

const isCliRun = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isCliRun) {
  const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
  optimizeGalleryImages(projectRoot)
    .then((result) => {
      console.log(
        `Image optimization complete. Total: ${result.total}, optimized: ${result.optimized}, skipped: ${result.skipped}`
      );
    })
    .catch((error) => {
      console.error('Failed to optimize gallery images.');
      console.error(error);
      process.exit(1);
    });
}
