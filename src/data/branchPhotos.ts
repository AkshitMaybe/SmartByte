import { galleryManifest } from '@/data/generated/galleryManifest';
import { getActiveBranches } from '@/data/branches';

export interface BranchPhoto {
  src: string;
  alt: string;
  label: string;
  avifSrc?: string;
  webpSrc?: string;
}

export type GalleryCategory = 'seminars' | 'events' | 'certificates';

const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  seminars: 'Seminar',
  events: 'Event',
  certificates: 'Certificate',
};

const OPTIMIZABLE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
const BRANCH_SCOPED_EVENT_TYPES = new Set(['staff-sports', 'student-sports', 'indoor-games']);
const activeBranches = getActiveBranches();
const sortNatural = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

const normalizeText = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const publicAsset = (assetPath: string): string => {
  const normalized = assetPath
    .replace(/^\/+/, '')
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `${import.meta.env.BASE_URL}${normalized}`;
};

const PLACEHOLDER_SRC = publicAsset('placeholder.svg');

const getOptimizedSources = (relativePath: string): Pick<BranchPhoto, 'avifSrc' | 'webpSrc'> => {
  const normalized = relativePath.replace(/^\/+/, '');
  const extensionIndex = normalized.lastIndexOf('.');

  if (extensionIndex <= 0) {
    return {};
  }

  const extension = normalized.slice(extensionIndex).toLowerCase();
  if (!OPTIMIZABLE_EXTENSIONS.has(extension)) {
    return {};
  }

  const withoutExtension = normalized.slice(0, extensionIndex);
  return {
    avifSrc: publicAsset(`optimized/${withoutExtension}.avif`),
    webpSrc: publicAsset(`optimized/${withoutExtension}.webp`),
  };
};

const makePhoto = (relativePath: string, alt: string, label: string): BranchPhoto => ({
  src: publicAsset(relativePath),
  alt,
  label,
  ...getOptimizedSources(relativePath),
});

const toPlaceholder = (labelPrefix: string, index: number): BranchPhoto => ({
  src: PLACEHOLDER_SRC,
  alt: `${labelPrefix} placeholder ${index + 1}`,
  label: `${labelPrefix} ${index + 1}`,
});

const fillWithPlaceholders = (photos: BranchPhoto[], minCount: number, labelPrefix: string): BranchPhoto[] => {
  if (minCount <= photos.length) {
    return photos;
  }

  const placeholders = Array.from({ length: minCount - photos.length }, (_, offset) =>
    toPlaceholder(labelPrefix, photos.length + offset)
  );

  return [...photos, ...placeholders];
};

const branchAliasEntries = (() =>
  activeBranches
    .flatMap((branch) => {
      const aliases = new Set([
        branch.slug,
        branch.displayName,
        branch.displayName.split(' - ')[0].trim(),
      ]);

      return Array.from(aliases)
        .map((alias) => normalizeText(alias))
        .filter((alias) => alias.length > 3)
        .map((alias) => ({ alias, slug: branch.slug }));
    })
    .sort((a, b) => b.alias.length - a.alias.length)
)();

const resolveBranchSlugFromPath = (relativePath: string): string | null => {
  const normalizedPath = normalizeText(relativePath);
  const match = branchAliasEntries.find((entry) => normalizedPath.includes(entry.alias));
  return match?.slug ?? null;
};

const getNormalizedPathSegments = (relativePath: string): string[] =>
  relativePath
    .replace(/^\/+/, '')
    .split(/[\\/]+/)
    .map((segment) => normalizeText(segment))
    .filter((segment) => segment.length > 0);

const isBranchGalleryPathAllowed = (relativePath: string): boolean => {
  const segments = getNormalizedPathSegments(relativePath);
  const galleryIndex = segments.findIndex((segment) => segment === 'gallery');

  if (galleryIndex < 0) {
    return false;
  }

  const section = segments[galleryIndex + 1];
  if (section === 'seminars') {
    return true;
  }

  if (section !== 'events') {
    return false;
  }

  const eventType = segments[galleryIndex + 2] ?? '';
  if (!BRANCH_SCOPED_EVENT_TYPES.has(eventType)) {
    return false;
  }

  return !segments.includes('common');
};

const getGalleryBranchPaths = (branchSlug: string): string[] => {
  const sectionPaths = [
    ...galleryManifest.seminars,
    ...galleryManifest.events,
    ...galleryManifest.certificates,
  ];

  return sectionPaths.filter(
    (relativePath) =>
      isBranchGalleryPathAllowed(relativePath) && resolveBranchSlugFromPath(relativePath) === branchSlug
  );
};

export const getBranchPhotos = (
  branchSlug: string,
  displayName: string,
  minCount = 0
): BranchPhoto[] => {
  const branchPaths = galleryManifest.branches[branchSlug] ?? [];
  const galleryPaths = getGalleryBranchPaths(branchSlug);
  const mergedPaths = [
    ...branchPaths,
    ...galleryPaths.filter((relativePath) => !branchPaths.includes(relativePath)).sort(sortNatural),
  ];

  const relativePaths = mergedPaths;
  const photos = relativePaths.map((relativePath, index) =>
    makePhoto(relativePath, `${displayName} photo ${index + 1}`, `Branch Photo ${index + 1}`)
  );

  return fillWithPlaceholders(photos, minCount, 'Branch Photo');
};

export const getBranchThumbnail = (branchSlug: string, displayName: string): BranchPhoto => {
  const storeFrontPath = galleryManifest.storeFrontThumbnails[branchSlug];
  if (storeFrontPath) {
    return makePhoto(storeFrontPath, `${displayName} thumbnail`, `${displayName} thumbnail`);
  }

  const firstBranchPhotoPath = galleryManifest.branches[branchSlug]?.[0];
  if (!firstBranchPhotoPath) {
    return {
      src: PLACEHOLDER_SRC,
      alt: `${displayName} thumbnail placeholder`,
      label: `${displayName} thumbnail`,
    };
  }

  return makePhoto(firstBranchPhotoPath, `${displayName} thumbnail`, `${displayName} thumbnail`);
};

export const getCategoryPhotos = (category: GalleryCategory, minCount = 0): BranchPhoto[] => {
  const relativePaths = galleryManifest[category];
  const labelPrefix = `${CATEGORY_LABELS[category]} Photo`;
  const photos = relativePaths.map((relativePath, index) =>
    makePhoto(relativePath, `${CATEGORY_LABELS[category]} photo ${index + 1}`, `${labelPrefix} ${index + 1}`)
  );

  return fillWithPlaceholders(photos, minCount, labelPrefix);
};

export const getCategoryPhotoCount = (category: GalleryCategory): number =>
  galleryManifest[category].length;
