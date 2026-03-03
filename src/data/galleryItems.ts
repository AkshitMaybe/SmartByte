import { getActiveBranches } from '@/data/branches';
import { galleryManifest } from '@/data/generated/galleryManifest';

export type GallerySection = 'branches' | 'events' | 'seminars' | 'certificates';
export type EventType =
  | 'spark'
  | 'picnic'
  | 'ganpati'
  | 'cyclothon'
  | 'techno-tour'
  | 'staff-sports'
  | 'student-sports'
  | 'indoor-games';
export type GalleryMediaType = 'image' | 'video';
export type GalleryCity = 'Kalyan' | 'Dombivli' | 'Kongaon' | 'Badlapur' | 'Titwala' | 'Thane' | 'Panvel';

interface EventTypeConfig {
  value: EventType;
  label: string;
  branchScoped: boolean;
  keywords: string[];
}

export interface GalleryItem {
  id: string;
  section: GallerySection;
  city: GalleryCity;
  branch: string;
  isCommonEvent?: boolean;
  eventType?: EventType;
  title?: string;
  date?: string;
  mediaType: GalleryMediaType;
  src: string;
  thumbnail?: string;
  avifSrc?: string;
  webpSrc?: string;
}

interface GalleryBranch {
  slug: string;
  branch: string;
  city: GalleryCity;
  displayName: string;
}

export const galleryCities: GalleryCity[] = [
  'Kalyan',
  'Dombivli',
  'Kongaon',
  'Badlapur',
  'Titwala',
  'Thane',
  'Panvel',
];

export const eventTypeConfigs: EventTypeConfig[] = [
  {
    value: 'spark',
    label: 'Spark',
    branchScoped: false,
    keywords: ['spark'],
  },
  {
    value: 'picnic',
    label: 'Picnic',
    branchScoped: false,
    keywords: ['picnic'],
  },
  {
    value: 'ganpati',
    label: 'Ganpati',
    branchScoped: false,
    keywords: ['ganpati', 'ganesh'],
  },
  {
    value: 'cyclothon',
    label: 'Cyclothon',
    branchScoped: false,
    keywords: ['cyclothon', 'cyclethon', 'cycling'],
  },
  {
    value: 'techno-tour',
    label: 'Techno Tour',
    branchScoped: false,
    keywords: ['techno-tour', 'techno', 'technotour'],
  },
  {
    value: 'staff-sports',
    label: 'Staff Sports',
    branchScoped: true,
    keywords: ['staff-sports', 'staff-sport', 'staffsport', 'staff'],
  },
  {
    value: 'student-sports',
    label: 'Student Sports',
    branchScoped: true,
    keywords: ['student-sports', 'student-sport', 'studentsports', 'student'],
  },
  {
    value: 'indoor-games',
    label: 'Indoor Games',
    branchScoped: true,
    keywords: ['indoor-games', 'indoor-game', 'indoorgames', 'indoor'],
  },
];

export const branchScopedEventTypes: EventType[] = eventTypeConfigs
  .filter((config) => config.branchScoped)
  .map((config) => config.value);

const eventFolderAliases = new Map<string, EventType>([
  ['spark', 'spark'],
  ['picnic', 'picnic'],
  ['ganpati', 'ganpati'],
  ['cyclothon', 'cyclothon'],
  ['cyclethon', 'cyclothon'],
  ['techno-tour', 'techno-tour'],
  ['technotour', 'techno-tour'],
  ['staff-sports', 'staff-sports'],
  ['staffsport', 'staff-sports'],
  ['staffsports', 'staff-sports'],
  ['student-sports', 'student-sports'],
  ['studentsport', 'student-sports'],
  ['studentsports', 'student-sports'],
  ['indoor-games', 'indoor-games'],
  ['indoorgame', 'indoor-games'],
  ['indoorgames', 'indoor-games'],
]);

const activeBranches = getActiveBranches();

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

const optimizableExtensions = new Set(['.jpg', '.jpeg', '.png']);
const getOptimizedSources = (relativePath: string): Pick<GalleryItem, 'avifSrc' | 'webpSrc'> => {
  const normalized = relativePath.replace(/^\/+/, '');
  const extensionIndex = normalized.lastIndexOf('.');
  if (extensionIndex <= 0) {
    return {};
  }

  const extension = normalized.slice(extensionIndex).toLowerCase();
  if (!optimizableExtensions.has(extension)) {
    return {};
  }

  const withoutExtension = normalized.slice(0, extensionIndex);
  return {
    avifSrc: publicAsset(`optimized/${withoutExtension}.avif`),
    webpSrc: publicAsset(`optimized/${withoutExtension}.webp`),
  };
};

const mapCityGroupToGalleryCity = (cityGroup: string): GalleryCity => {
  switch (cityGroup) {
    case 'Kalyan':
      return 'Kalyan';
    case 'Dombivli':
      return 'Dombivli';
    case 'Bhiwandi':
      return 'Kongaon';
    case 'Badlapur':
      return 'Badlapur';
    case 'Titwala':
      return 'Titwala';
    case 'Thane':
      return 'Thane';
    case 'Diva':
      return 'Thane';
    case 'Panvel':
      return 'Panvel';
    default:
      return 'Kalyan';
  }
};

export const galleryBranches: GalleryBranch[] = activeBranches
  .map((branch) => ({
    slug: branch.slug,
    branch: branch.displayName.split(' - ')[0].trim(),
    city: mapCityGroupToGalleryCity(branch.cityGroup),
    displayName: branch.displayName,
  }))
  .sort((a, b) => {
    const cityDiff = galleryCities.indexOf(a.city) - galleryCities.indexOf(b.city);
    if (cityDiff !== 0) return cityDiff;
    return a.branch.localeCompare(b.branch, undefined, { numeric: true, sensitivity: 'base' });
  });

export const galleryBranchCount = galleryBranches.length;

const branchBySlug = new Map(galleryBranches.map((branch) => [branch.slug, branch]));
const defaultBranch: GalleryBranch = galleryBranches[0] ?? {
  slug: 'head-office',
  branch: 'Head Office',
  city: 'Kalyan',
  displayName: 'Head Office - Kalyan',
};

const branchAliasEntries = (() => {
  const entries: Array<{ alias: string; slug: string }> = [];

  galleryBranches.forEach((branch) => {
    const aliases = new Set([
      branch.slug,
      branch.displayName,
      branch.branch,
    ]);

    aliases.forEach((alias) => {
      const normalized = normalizeText(alias);
      if (!normalized || normalized.length < 4) return;
      entries.push({ alias: normalized, slug: branch.slug });
    });
  });

  return entries.sort((a, b) => b.alias.length - a.alias.length);
})();

const resolveBranchSlug = (rawValue: string): string => {
  const normalized = normalizeText(rawValue);
  if (!normalized) return defaultBranch.slug;

  const direct = galleryBranches.find((branch) => normalizeText(branch.slug) === normalized);
  if (direct) return direct.slug;

  const byDisplay = galleryBranches.find((branch) => normalizeText(branch.displayName) === normalized);
  if (byDisplay) return byDisplay.slug;

  const byName = galleryBranches.find((branch) => normalizeText(branch.branch) === normalized);
  if (byName) return byName.slug;

  return defaultBranch.slug;
};

const resolveBranchSlugFromPath = (relativePath: string): string => {
  const normalizedPath = normalizeText(relativePath);
  for (const entry of branchAliasEntries) {
    if (normalizedPath.includes(entry.alias)) {
      return entry.slug;
    }
  }
  return defaultBranch.slug;
};

const pathIncludesKnownBranch = (relativePath: string): boolean => {
  const normalizedPath = normalizeText(relativePath);
  return branchAliasEntries.some((entry) => normalizedPath.includes(entry.alias));
};

const getNormalizedPathSegments = (relativePath: string): string[] =>
  relativePath
    .replace(/^\/+/, '')
    .split(/[\\/]+/)
    .map((segment) => normalizeText(segment))
    .filter((segment) => segment.length > 0);

const detectEventTypeFromFolder = (relativePath: string): EventType | null => {
  const segments = getNormalizedPathSegments(relativePath);
  const eventsIndex = segments.findIndex((segment) => segment === 'events');
  if (eventsIndex < 0) {
    return null;
  }

  const candidates = segments.slice(eventsIndex + 1, eventsIndex + 3);
  for (const candidate of candidates) {
    const eventType = eventFolderAliases.get(candidate);
    if (eventType) {
      return eventType;
    }
  }

  return null;
};

const isCommonEventPath = (relativePath: string): boolean => {
  const segments = getNormalizedPathSegments(relativePath);
  const eventsIndex = segments.findIndex((segment) => segment === 'events');
  if (eventsIndex < 0) {
    return false;
  }

  return segments.slice(eventsIndex + 1).includes('common');
};

const makeImageItem = (
  idPrefix: string,
  index: number,
  section: GallerySection,
  branchSlug: string,
  relativePath: string,
  eventType?: EventType,
  options?: {
    branchLabel?: string;
    isCommonEvent?: boolean;
  }
): GalleryItem => {
  const branchMeta = branchBySlug.get(branchSlug) ?? defaultBranch;
  const branchLabel = options?.branchLabel ?? branchMeta.branch;

  return {
    id: `${idPrefix}-${index + 1}`,
    section,
    city: branchMeta.city,
    branch: branchLabel,
    isCommonEvent: options?.isCommonEvent,
    eventType,
    title: `${branchLabel} ${section} ${index + 1}`,
    mediaType: 'image',
    src: publicAsset(relativePath),
    ...getOptimizedSources(relativePath),
  };
};

const detectEventType = (relativePath: string, index: number): EventType => {
  const folderDetectedEventType = detectEventTypeFromFolder(relativePath);
  if (folderDetectedEventType) {
    return folderDetectedEventType;
  }

  const normalized = normalizeText(relativePath);
  for (const config of eventTypeConfigs) {
    if (config.keywords.some((keyword) => normalized.includes(keyword))) {
      return config.value;
    }
  }

  if (pathIncludesKnownBranch(relativePath)) {
    return 'student-sports';
  }

  return index % 2 === 0 ? 'spark' : 'techno-tour';
};

const branchItems: GalleryItem[] = Object.entries(galleryManifest.branches).flatMap(([branchSlug, paths]) => {
  const resolvedBranchSlug = resolveBranchSlug(branchSlug);
  return paths.map((relativePath, index) =>
    makeImageItem(resolvedBranchSlug, index, 'branches', resolvedBranchSlug, relativePath)
  );
});

const categoryItemsFromManifest = (
  section: Exclude<GallerySection, 'branches'>,
  paths: string[]
): GalleryItem[] =>
  paths.map((relativePath, index) => {
    const branchSlug = resolveBranchSlugFromPath(relativePath);
    const eventType = section === 'events' ? detectEventType(relativePath, index) : undefined;
    const isCommonEvent = section === 'events' && isCommonEventPath(relativePath);
    return makeImageItem(section, index, section, branchSlug, relativePath, eventType, {
      isCommonEvent,
      branchLabel: isCommonEvent ? 'Common' : undefined,
    });
  });

const placeholderItems = (section: Exclude<GallerySection, 'branches'>, count: number): GalleryItem[] =>
  galleryBranches.slice(0, count).map((branch, index) => ({
    id: `placeholder-${section}-${index + 1}`,
    section,
    city: branch.city,
    branch: branch.branch,
    eventType: section === 'events' ? eventTypeConfigs[index % eventTypeConfigs.length].value : undefined,
    title: `${branch.branch} ${section} placeholder ${index + 1}`,
    mediaType: 'image',
    src: publicAsset('placeholder.svg'),
  }));

const seminarItems = categoryItemsFromManifest('seminars', galleryManifest.seminars);
const eventItems = categoryItemsFromManifest('events', galleryManifest.events);
const certificateItems = categoryItemsFromManifest('certificates', galleryManifest.certificates);

export const galleryItems: GalleryItem[] = [
  ...branchItems,
  ...(eventItems.length > 0 ? eventItems : placeholderItems('events', 8)),
  ...(seminarItems.length > 0 ? seminarItems : placeholderItems('seminars', 8)),
  ...(certificateItems.length > 0 ? certificateItems : placeholderItems('certificates', 8)),
];
