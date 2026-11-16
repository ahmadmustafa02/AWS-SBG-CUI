"use client";

import { useEffect, useMemo, useState } from "react";
import { apiConfigured, fetchGallery, type GalleryAlbum } from "@/lib/api";
import { PhotoGrid } from "./PhotoGrid";
import { StateBlock } from "./StateBlock";
import styles from "./GalleryView.module.css";

/**
 * Gallery of previous years: a year filter, then each album as its own wall.
 * Starts from the albums listed in src/content/gallery.ts and swaps to the
 * API's list when it is connected.
 */
export function GalleryView({ seed }: { seed: GalleryAlbum[] }) {
  const [albums, setAlbums] = useState(seed);
  const [loading, setLoading] = useState(apiConfigured);
  const [year, setYear] = useState<number | "all">("all");

  useEffect(() => {
    if (!apiConfigured) return;
    let cancelled = false;
    fetchGallery()
      .then((res) => !cancelled && setAlbums(res.albums))
      .catch(() => {
        /* keep the seeded albums */
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const years = useMemo(() => [...new Set(albums.map((a) => a.year))].sort((a, b) => b - a), [albums]);
  const shown = albums.filter((a) => year === "all" || a.year === year).sort((a, b) => b.year - a.year);

  if (loading && albums.length === 0) return <StateBlock kind="loading" title="Loading the gallery" />;

  if (albums.length === 0) {
    return (
      <StateBlock kind="empty" title="The gallery is waiting for its first album">
        Photos from previous years will be collected here, sorted by year. They are being gathered from the team now.
      </StateBlock>
    );
  }

  return (
    <div>
      <div className={styles.years} role="group" aria-label="Filter by year">
        <button type="button" className={styles.year} aria-pressed={year === "all"} onClick={() => setYear("all")}>
          All years
        </button>
        {years.map((y) => (
          <button key={y} type="button" className={`pixel ${styles.year}`} aria-pressed={year === y} onClick={() => setYear(y)}>
            {y}
          </button>
        ))}
      </div>

      {shown.map((album) => (
        <section key={album.id} className={styles.album} aria-labelledby={`album-${album.id}`}>
          <header className={styles.head}>
            <span className={`pixel ${styles.tag}`}>{album.year}</span>
            <h2 id={`album-${album.id}`}>{album.title}</h2>
            <span className={styles.count}>
              {album.photos.length} {album.photos.length === 1 ? "photo" : "photos"}
            </span>
          </header>
          <PhotoGrid photos={album.photos} label={`${album.title} ${album.year}`} />
        </section>
      ))}
    </div>
  );
}
