import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
  '.gif',
  '.svg',
]);

const EVENT_TYPE_FOLDER_CONFIG = [
  { folder: 'spark', branchScoped: false },
  { folder: 'picnic', branchScoped: false },
  { folder: 'ganpati', branchScoped: false },
  { folder: 'cyclothon', branchScoped: false },
  { folder: 'techno-tour', branchScoped: false },
  { folder: 'staff-sports', branchScoped: true },
  { folder: 'student-sports', branchScoped: true },
  { folder: 'indoor-games', branchScoped: true },
];

const sortNatural = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

const isImageFile = (fileName) => IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
const normalizeKey = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const readDirectoryEntries = async (absolutePath) => {
  try {
    return await fs.readdir(absolutePath, { withFileTypes: true });
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const readImageFiles = async (absolutePath) => {
  const entries = await readDirectoryEntries(absolutePath);
  return entries
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => entry.name)
    .sort(sortNatural);
};

const readImageFilesRecursive = async (absoluteRoot, relativePrefix = '') => {
  const entries = await readDirectoryEntries(absoluteRoot);
  const files = [];

  for (const entry of entries.sort((a, b) => sortNatural(a.name, b.name))) {
    const absoluteEntry = path.join(absoluteRoot, entry.name);
    if (entry.isDirectory()) {
      const nextPrefix = path.join(relativePrefix, entry.name);
      const nestedFiles = await readImageFilesRecursive(absoluteEntry, nextPrefix);
      files.push(...nestedFiles);
      continue;
    }

    if (!entry.isFile() || !isImageFile(entry.name)) {
      continue;
    }

    files.push(path.join(relativePrefix, entry.name));
  }

  return files.sort(sortNatural);
};

const ensureDirectory = async (absolutePath) => {
  await fs.mkdir(absolutePath, { recursive: true });
};

const buildBranchAliasLookup = async (projectRoot) => {
  const branchesPath = path.join(projectRoot, 'src', 'data', 'branches.ts');
  const source = await fs.readFile(branchesPath, 'utf8');
  const branchPattern = /slug:\s*"([^"]+)"[\s\S]*?displayName:\s*"([^"]+)"/g;
  const aliasLookup = new Map();
  let match;

  while ((match = branchPattern.exec(source)) !== null) {
    const [, slug, displayName] = match;
    if (slug === 'coming-soon') {
      continue;
    }

    const aliases = new Set([
      slug,
      displayName,
      displayName.split(' - ')[0],
    ]);

    for (const alias of aliases) {
      aliasLookup.set(normalizeKey(alias), slug);
    }
  }

  return aliasLookup;
};

const getActiveBranchSlugs = async (projectRoot) => {
  const branchesPath = path.join(projectRoot, 'src', 'data', 'branches.ts');
  const source = await fs.readFile(branchesPath, 'utf8');
  const slugPattern = /slug:\s*"([^"]+)"/g;
  const slugs = [];
  let match;

  while ((match = slugPattern.exec(source)) !== null) {
    const slug = match[1];
    if (slug === 'coming-soon') {
      continue;
    }
    slugs.push(slug);
  }

  return Array.from(new Set(slugs)).sort(sortNatural);
};

const ensureGalleryFolderTemplate = async (projectRoot, branchSlugs) => {
  const branchRoot = path.join(projectRoot, 'public', 'branch-photos');
  const storeFrontRoot = path.join(projectRoot, 'public', 'store-front-thumbnails');
  const galleryRoot = path.join(projectRoot, 'public', 'gallery');
  const seminarsRoot = path.join(galleryRoot, 'seminars');
  const certificatesRoot = path.join(galleryRoot, 'certificates');
  const eventsRoot = path.join(galleryRoot, 'events');

  await Promise.all([
    ensureDirectory(branchRoot),
    ensureDirectory(storeFrontRoot),
    ensureDirectory(seminarsRoot),
    ensureDirectory(certificatesRoot),
    ensureDirectory(eventsRoot),
  ]);

  await Promise.all(
    branchSlugs.flatMap((slug) => [
      ensureDirectory(path.join(branchRoot, slug)),
      ensureDirectory(path.join(storeFrontRoot, slug)),
      ensureDirectory(path.join(seminarsRoot, slug)),
    ])
  );

  await Promise.all(
    EVENT_TYPE_FOLDER_CONFIG.flatMap((config) => {
      const categoryRoot = path.join(eventsRoot, config.folder);
      if (!config.branchScoped) {
        return [ensureDirectory(categoryRoot)];
      }

      return [
        ensureDirectory(categoryRoot),
        ensureDirectory(path.join(categoryRoot, 'common')),
        ...branchSlugs.map((slug) => ensureDirectory(path.join(categoryRoot, slug))),
      ];
    })
  );
};

const readBranchPhotos = async (projectRoot, aliasLookup) => {
  const branchesRoot = path.join(projectRoot, 'public', 'branch-photos');
  const entries = await readDirectoryEntries(branchesRoot);
  const branchDirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(sortNatural);

  const branches = {};

  for (const slug of branchDirs) {
    const branchFolder = path.join(branchesRoot, slug);
    const files = await readImageFiles(branchFolder);
    if (files.length === 0) {
      continue;
    }

    const resolvedSlug = aliasLookup.get(normalizeKey(slug)) ?? normalizeKey(slug);
    const resolvedFiles = files.map((fileName) => `branch-photos/${slug}/${fileName}`);
    const existing = branches[resolvedSlug] ?? [];
    branches[resolvedSlug] = [...existing, ...resolvedFiles].sort(sortNatural);
  }

  return branches;
};

const readStoreFrontThumbnails = async (projectRoot, aliasLookup) => {
  const thumbnailsRoot = path.join(projectRoot, 'public', 'store-front-thumbnails');
  const entries = await readDirectoryEntries(thumbnailsRoot);
  const thumbnailDirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(sortNatural);

  const storeFrontThumbnails = {};

  for (const folderName of thumbnailDirs) {
    const folderPath = path.join(thumbnailsRoot, folderName);
    const files = await readImageFiles(folderPath);
    if (files.length === 0) {
      continue;
    }

    const resolvedSlug = aliasLookup.get(normalizeKey(folderName)) ?? normalizeKey(folderName);
    const firstImagePath = `store-front-thumbnails/${folderName}/${files[0]}`;
    const isExactSlugFolder = normalizeKey(folderName) === resolvedSlug;

    if (!(resolvedSlug in storeFrontThumbnails) || isExactSlugFolder) {
      storeFrontThumbnails[resolvedSlug] = firstImagePath;
    }
  }

  return storeFrontThumbnails;
};

const readCategoryPhotos = async (projectRoot, category) => {
  const categoryRoot = path.join(projectRoot, 'public', 'gallery', category);
  const files = await readImageFilesRecursive(categoryRoot);
  return files.map((fileName) => {
    const relativeFile = fileName.split(path.sep).join('/');
    return `gallery/${category}/${relativeFile}`;
  });
};

const makeOutput = (manifest) => `/* AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. */

export interface GeneratedGalleryManifest {
  branches: Record<string, string[]>;
  storeFrontThumbnails: Record<string, string>;
  seminars: string[];
  events: string[];
  certificates: string[];
}

export const galleryManifest: GeneratedGalleryManifest = ${JSON.stringify(manifest, null, 2)};
`;

export const generateGalleryManifest = async (projectRoot = process.cwd()) => {
  const branchSlugs = await getActiveBranchSlugs(projectRoot);
  await ensureGalleryFolderTemplate(projectRoot, branchSlugs);

  const aliasLookup = await buildBranchAliasLookup(projectRoot);
  const manifest = {
    branches: await readBranchPhotos(projectRoot, aliasLookup),
    storeFrontThumbnails: await readStoreFrontThumbnails(projectRoot, aliasLookup),
    seminars: await readCategoryPhotos(projectRoot, 'seminars'),
    events: await readCategoryPhotos(projectRoot, 'events'),
    certificates: await readCategoryPhotos(projectRoot, 'certificates'),
  };

  const outputPath = path.join(projectRoot, 'src', 'data', 'generated', 'galleryManifest.ts');
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, makeOutput(manifest), 'utf8');

  return manifest;
};

const isCliRun = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isCliRun) {
  const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
  generateGalleryManifest(projectRoot)
    .then(() => {
      console.log('Gallery manifest generated.');
    })
    .catch((error) => {
      console.error('Failed to generate gallery manifest.');
      console.error(error);
      process.exit(1);
    });
}
