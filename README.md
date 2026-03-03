# SmartByte Computer Education Website

Official website for SmartByte Computer Education.

## Requirements

- Node.js (LTS recommended)
- npm

## Development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## Add photos (drag and drop)

Branch photos:

- Put branch images in `public/branch-photos/<branch-slug>/`.
- Use branch slugs from `src/data/branches.ts`.

Store-front thumbnails (for branch cards on `/gallery`):

- Put one image in `public/store-front-thumbnails/<branch-slug>/`.
- This is used first for the branch thumbnail card image.
- If missing, first branch image is used as fallback.

Seminars:

- Seminars: `public/gallery/seminars/<branch-slug>/`

Certificates (common, no branch filter):

- Certificates: `public/gallery/certificates/`

Events:

- Common events (no city/branch selector):
  - `public/gallery/events/spark/`
  - `public/gallery/events/picnic/`
  - `public/gallery/events/ganpati/`
  - `public/gallery/events/cyclothon/`
  - `public/gallery/events/techno-tour/`
- Branch-scoped events (city/branch selector enabled):
  - `public/gallery/events/staff-sports/<branch-slug>/`
  - `public/gallery/events/student-sports/<branch-slug>/`
  - `public/gallery/events/indoor-games/<branch-slug>/`
  - `public/gallery/events/staff-sports/common/`
  - `public/gallery/events/student-sports/common/`
  - `public/gallery/events/indoor-games/common/`

No manual mapping is needed. The app auto-generates a gallery manifest from these folders during:

- `npm run dev`
- `npm run build`
- `npm run sync:gallery`

Folder template:

- Required gallery folders are auto-created from branch data during the same commands above.

Image optimization:

- Photos are automatically optimized to AVIF/WebP in `public/optimized/`.
- Original files are still used as fallback if a format is unsupported.
- Optimizer cache is stored at `node_modules/.cache/gallery-image-optimizer.json`.

Generated file:

- `src/data/generated/galleryManifest.ts` (auto-generated, do not edit manually)
