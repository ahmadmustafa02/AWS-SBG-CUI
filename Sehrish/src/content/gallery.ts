import type { GalleryAlbum } from "@/lib/api";

/**
 * Gallery of previous years.
 *
 * To add photos before the API exists: drop the files in
 * `public/gallery/<year>/<album>/` and list them here. Once the API serves
 * GET /gallery, its albums are shown instead and this file is the fallback.
 *
 * Example:
 * {
 *   id: "2025-orientation",
 *   title: "Orientation",
 *   year: 2025,
 *   photos: [
 *     { id: "o-01", url: "/gallery/2025/orientation/01.jpg", alt: "Students at the orientation session" },
 *   ],
 * },
 */
export const GALLERY: GalleryAlbum[] = [];
