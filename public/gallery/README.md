Use this structure for drag-and-drop uploads.
Anything you place in these folders is auto-detected.

```text
gallery/
  seminars/
    <branch-slug>/
      *.jpg|*.jpeg|*.png|*.webp|*.avif
  certificates/
    *.jpg|*.jpeg|*.png|*.webp|*.avif
  events/
    spark/
      *.(images)
    picnic/
      *.(images)
    ganpati/
      *.(images)
    cyclothon/
      *.(images)
    techno-tour/
      *.(images)
    staff-sports/
      common/
        *.(images)
      <branch-slug>/
        *.(images)
    student-sports/
      common/
        *.(images)
      <branch-slug>/
        *.(images)
    indoor-games/
      common/
        *.(images)
      <branch-slug>/
        *.(images)
```

Notes:
- Use branch slugs from `src/data/branches.ts` for `<branch-slug>`.
- Events category behavior:
  - `spark`, `picnic`, `ganpati`, `cyclothon`, `techno-tour` are common events (no city/branch filter in UI).
  - `staff-sports`, `student-sports`, `indoor-games` are branch-scoped (city and branch filters appear in UI).
- Nested folders are supported, so the app scans recursively.
- Photos are auto-optimized to AVIF/WebP in `public/optimized/gallery/`.
