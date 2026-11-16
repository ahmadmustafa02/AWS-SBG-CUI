import type { Metadata } from "next";
import Link from "next/link";
import { CameraBackdrop } from "@/components/CameraBackdrop";
import { Icon } from "@/components/Icon";
import { PhotoFinder } from "@/components/PhotoFinder";
import { EVENTS } from "@/content/events";
import { formatEventDate } from "@/lib/format";
import styles from "../inner.module.css";

export const metadata: Metadata = {
  title: "Find My Photos",
  description: "Opt-in selfie search for your photos from AWS Student Builder Group CUI events.",
};

type Props = { searchParams: Promise<{ event?: string }> };

/**
 * Find My Photos. The matching itself is a backend module (Amazon Rekognition
 * behind the API): this page collects consent and the image, and shows results.
 */
export default async function PhotosPage({ searchParams }: Props) {
  const { event } = await searchParams;
  const events = EVENTS.map((e) => ({ id: e.id, title: e.title }));

  return (
    <>
      <section className="band band--brand pixel-grid page-head">
        <CameraBackdrop />
        <div className="wrap">
          <span className="eyebrow">Find My Photos</span>
          <h1>Every photo you&apos;re in, without the scrolling.</h1>
          <p className="lede">
            Import one photo of your face and get back the event photos you appear in. Entirely optional, and built to
            forget you afterwards.
          </p>
        </div>
      </section>

      <section className="band band--tight">
        <CameraBackdrop dense />
        <div className="wrap">
          <div className={styles.block}>
            <h2>Find yourself in an album</h2>
            <PhotoFinder events={events} initialEventId={event} />
          </div>

          <div className={styles.block}>
            <h2>Event albums</h2>
            <p>Every photo from an event, in one place. Open to signed-in attendees of that event.</p>
            <ul className={styles.albums}>
              {EVENTS.map((e) => (
                <li key={e.id}>
                  <Link href={`/photos/${e.id}`}>
                    <span className={styles.albumIcon} aria-hidden="true">
                      <Icon name="camera" size={26} />
                    </span>
                    <span>
                      <strong>{e.title}</strong>
                      <small>{formatEventDate(e.startsAt) ?? "Date to be announced"}</small>
                    </span>
                    <Icon name="arrow" size={20} />
                  </Link>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: "1.5rem" }}>
              Looking for older photos?{" "}
              <Link href="/gallery" className="text-link">
                Visit the gallery
              </Link>
            </p>
          </div>

          <div className={styles.block}>
            <h2>What we promise about your face</h2>
            <ul className={styles.checks}>
              <li>
                <Icon name="check" />
                <span>
                  <strong>Opt-in only.</strong> No face search happens unless you start one.
                </span>
              </li>
              <li>
                <Icon name="check" />
                <span>
                  <strong>Your image is deleted right after matching</strong>, unless you separately choose to be
                  remembered for future events.
                </span>
              </li>
              <li>
                <Icon name="check" />
                <span>
                  <strong>Delete on request.</strong> You can have your face data, or any photo of you, removed.
                </span>
              </li>
              <li>
                <Icon name="check" />
                <span>
                  <strong>Albums are for attendees.</strong> Only signed-in attendees of an event can open its album,
                  and download links expire quickly.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
