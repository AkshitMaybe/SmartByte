Use this folder for branch card thumbnail photos shown on `/gallery`.

Structure:

store-front-thumbnails/
  <branch-slug>/
    thumbnail.jpg

Example:

store-front-thumbnails/
  kalyan-head-office/
    storefront.jpg
  dombivli-star-colony/
    storefront.jpg

Rules:
- Put only one best storefront image per branch folder.
- Folder name should be the branch slug from `src/data/branches.ts`.
- If this folder is empty for a branch, the first image from `public/branch-photos/<branch>/` is used.
- Folders for all active branch slugs are auto-created during:
  - `npm run dev`
  - `npm run build`
  - `npm run sync:gallery`

Photos are auto-optimized to AVIF/WebP in `public/optimized/store-front-thumbnails/`.
