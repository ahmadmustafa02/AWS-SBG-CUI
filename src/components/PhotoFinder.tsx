"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { apiConfigured, searchMyPhotos, type Photo } from "@/lib/api";
import { Icon } from "./Icon";
import { PhotoGrid } from "./PhotoGrid";
import { StateBlock } from "./StateBlock";
import styles from "./PhotoFinder.module.css";

const MAX_BYTES = 10 * 1024 * 1024;

type Result =
  | { kind: "idle" }
  | { kind: "searching" }
  | { kind: "not-connected" }
  | { kind: "retake" }
  | { kind: "error" }
  | { kind: "done"; photos: Photo[] };

/**
 * Find My Photos: pick the event, give consent, import one selfie, search.
 * The image is only read in the browser for the preview. It leaves the device
 * when the user presses Search, and only if the API is connected.
 */
export function PhotoFinder({ events, initialEventId }: { events: { id: string; title: string }[]; initialEventId?: string }) {
  const [eventId, setEventId] = useState(initialEventId && events.some((e) => e.id === initialEventId) ? initialEventId : (events[0]?.id ?? ""));
  const [consent, setConsent] = useState(false);
  const [remember, setRemember] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string>();
  const [result, setResult] = useState<Result>({ kind: "idle" });
  const input = useRef<HTMLInputElement>(null);

  // Preview via an object URL, released when the image changes or the page closes.
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    e.target.value = ""; // allow picking the same file again
    if (!picked) return;
    if (!picked.type.startsWith("image/")) {
      setFileError("That file isn't an image. Choose a JPG or PNG photo of your face.");
      return;
    }
    if (picked.size > MAX_BYTES) {
      setFileError("That image is over 10 MB. Choose a smaller one.");
      return;
    }
    setFileError(undefined);
    setFile(picked);
    setResult({ kind: "idle" });
  };

  const clear = () => {
    setFile(null);
    setResult({ kind: "idle" });
  };

  const search = async () => {
    if (!file || !consent || !eventId) return;
    if (!apiConfigured) {
      setResult({ kind: "not-connected" });
      return;
    }
    setResult({ kind: "searching" });
    try {
      const res = await searchMyPhotos(eventId, file, remember);
      setResult(res.retake ? { kind: "retake" } : { kind: "done", photos: res.photos });
    } catch {
      setResult({ kind: "error" });
    }
  };

  const ready = Boolean(file && consent && eventId);

  return (
    <div className={styles.finder}>
      <ol className={styles.steps}>
        {/* ---- 1. Event ---- */}
        <li>
          <span className={`pixel ${styles.num}`}>01</span>
          <div className="field">
            <label htmlFor="pf-event">Which event?</label>
            <select id="pf-event" value={eventId} onChange={(e) => setEventId(e.target.value)}>
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>
        </li>

        {/* ---- 2. Consent ---- */}
        <li>
          <span className={`pixel ${styles.num}`}>02</span>
          <div>
            <label className={styles.check}>
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span>
                <strong>I agree to a one-time face search.</strong> My image is matched against this event&apos;s photos
                and then deleted.
              </span>
            </label>
            <label className={styles.check}>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span>
                <strong>Optional:</strong> remember my face for future events, so I don&apos;t have to do this again.
              </span>
            </label>
          </div>
        </li>

        {/* ---- 3. Import image ---- */}
        <li>
          <span className={`pixel ${styles.num}`}>03</span>
          <div className={styles.drop} data-filled={Boolean(preview)}>
            {preview ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="The image you imported" className={styles.preview} />
                <div className={styles.fileMeta}>
                  <strong>{file?.name}</strong>
                  <span>Still on your device. Nothing is sent until you press Find my photos.</span>
                  <div className="btn-row">
                    <button type="button" className="btn btn--secondary btn--small" onClick={() => input.current?.click()}>
                      Change image
                    </button>
                    <button type="button" className="btn btn--secondary btn--small" onClick={clear}>
                      Remove
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className={styles.cam} aria-hidden="true">
                  <Icon name="camera" size={44} />
                </span>
                <p>
                  <strong>One clear photo of your face.</strong> Just you, looking at the camera, no sunglasses.
                </p>
                <button type="button" className="btn" onClick={() => input.current?.click()}>
                  <Icon name="camera" size={18} /> Import image
                </button>
              </>
            )}
            <input ref={input} type="file" accept="image/*" className="visually-hidden" onChange={onPick} aria-label="Import image" tabIndex={-1} />
          </div>
          {fileError && (
            <p className={styles.fileError} role="alert">
              <Icon name="alert" size={16} /> {fileError}
            </p>
          )}
        </li>
      </ol>

      <div className={styles.go}>
        <button type="button" className="btn btn--violet" onClick={search} disabled={!ready || result.kind === "searching"} aria-describedby="pf-why">
          {result.kind === "searching" ? "Searching…" : "Find my photos"}
        </button>
        <p id="pf-why" className={styles.why}>
          {ready ? "Ready when you are." : !consent ? "Tick the consent box and import an image to continue." : "Import an image to continue."}
        </p>
      </div>

      <div aria-live="polite" className={styles.results}>
        {result.kind === "searching" && <StateBlock kind="loading" title="Looking through the album" />}
        {result.kind === "not-connected" && (
          <div className="notice notice--warn">
            <Icon name="alert" />
            <span>
              <strong>The photo search isn&apos;t connected yet.</strong>
              Your image was not uploaded and no matching was done. This goes live once the event album is online.
            </span>
          </div>
        )}
        {result.kind === "retake" && (
          <div className="notice notice--warn">
            <Icon name="alert" />
            <span>
              <strong>We need a clearer photo.</strong>
              Use an image with exactly one face, well lit and facing the camera, then try again.
            </span>
          </div>
        )}
        {result.kind === "error" && (
          <StateBlock kind="error" title="The search didn't finish">
            Nothing was saved. Check your connection and try again.
          </StateBlock>
        )}
        {result.kind === "done" &&
          (result.photos.length > 0 ? (
            <>
              <h3 className={styles.found}>
                Found you in {result.photos.length} {result.photos.length === 1 ? "photo" : "photos"}
              </h3>
              <PhotoGrid photos={result.photos} label="Your photos" />
            </>
          ) : (
            <StateBlock kind="empty" title="No photos of you in this album yet">
              More photos may still be uploading. You can also browse the whole album.
            </StateBlock>
          ))}
      </div>

      {eventId && (
        <p className={styles.albumLink}>
          Rather browse everything?{" "}
          <Link href={`/photos/${eventId}`} className="text-link">
            Open the full event album
          </Link>
        </p>
      )}
    </div>
  );
}
