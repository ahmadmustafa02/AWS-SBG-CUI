"use client";

import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/api";
import { Icon } from "./Icon";
import styles from "./PhotoGrid.module.css";

/**
 * Photo wall with a lightbox. Used by the event album, Find My Photos results
 * and the gallery. Plain <img> on purpose: album URLs are short-lived signed
 * links from the API, which the Next image optimizer must not cache.
 */
export function PhotoGrid({ photos, label }: { photos: Photo[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open !== null && !el.open) el.showModal();
    if (open === null && el.open) el.close();
  }, [open]);

  const step = (by: number) => setOpen((i) => (i === null ? i : (i + by + photos.length) % photos.length));
  const current = open !== null ? photos[open] : undefined;

  return (
    <>
      <ul className={styles.grid} aria-label={label}>
        {photos.map((p, i) => (
          <li key={p.id}>
            <button type="button" className={styles.thumb} onClick={() => setOpen(i)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.thumbUrl ?? p.url} alt={p.alt ?? `${label}, photo ${i + 1}`} loading="lazy" decoding="async" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className={styles.lightbox}
        aria-label="Photo viewer"
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {current && (
          <figure className={styles.figure}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.url} alt={current.alt ?? `${label}, photo ${open! + 1}`} />
            <figcaption className={styles.bar}>
              <span className="mono">
                {open! + 1} / {photos.length}
              </span>
              <span className="btn-row">
                <button type="button" className="btn btn--secondary btn--small" onClick={() => step(-1)} disabled={photos.length < 2}>
                  Previous
                </button>
                <button type="button" className="btn btn--secondary btn--small" onClick={() => step(1)} disabled={photos.length < 2}>
                  Next
                </button>
                <a className="btn btn--small" href={current.url} download>
                  Download
                </a>
                <button type="button" className="btn btn--secondary btn--small" onClick={() => setOpen(null)} aria-label="Close photo viewer">
                  <Icon name="close" size={16} />
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
