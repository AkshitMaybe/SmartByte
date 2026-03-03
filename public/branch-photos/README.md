Place branch photos in this folder using branch slugs from `src/data/branches.ts`.

Structure:

branch-photos/
  <branch-slug>/
    1.jpg
    2.jpg
    ...

Example:

branch-photos/
  kalyan-head-office/
    1.jpg
    2.jpg
  kalyan-rambaug/
    1.jpg

No manual mapping is needed. The app auto-scans this folder and updates:
- Branch detail revolving photos
- Branch gallery page photos

Folders for all active branch slugs are auto-created during:
- `npm run dev`
- `npm run build`
- `npm run sync:gallery`

Branch thumbnail cards now prefer images from `public/store-front-thumbnails/`.
If no store-front thumbnail exists for a branch, the first image from this folder is used.

Photos are also auto-optimized to AVIF/WebP in `public/optimized/branch-photos/`.
