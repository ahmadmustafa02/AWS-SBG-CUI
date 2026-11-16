import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CameraBackdrop } from "@/components/CameraBackdrop";
import { EventAlbum } from "@/components/EventAlbum";
import { EVENTS } from "@/content/events";
import { formatEventDate } from "@/lib/format";

type Params = { params: Promise<{ eventId: string }> };

export function generateStaticParams() {
  return EVENTS.map((e) => ({ eventId: e.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const eventId = decodeURIComponent((await params).eventId);
  const event = EVENTS.find((e) => e.id === eventId);
  return event ? { title: `${event.title} album` } : {};
}

/** Every photo from one event. */
export default async function EventAlbumPage({ params }: Params) {
  const eventId = decodeURIComponent((await params).eventId);
  const event = EVENTS.find((e) => e.id === eventId);
  if (!event) notFound();

  return (
    <>
      <section className="band band--brand pixel-grid page-head">
        <CameraBackdrop />
        <div className="wrap">
          <Link href="/photos" className="eyebrow" style={{ textDecoration: "none" }}>
            ← Find My Photos
          </Link>
          <h1>{event.title} album</h1>
          <p className="lede">
            {formatEventDate(event.startsAt) ?? "Date to be announced"}
            {event.venue && <> · {event.venue}</>}
          </p>
          <div className="btn-row" style={{ marginTop: "1.75rem" }}>
            <Link href={`/photos?event=${event.id}`} className="btn">
              Find just my photos
            </Link>
          </div>
        </div>
      </section>

      <section className="band band--tight">
        <CameraBackdrop dense />
        <div className="wrap">
          <EventAlbum eventId={event.id} eventTitle={event.title} />
        </div>
      </section>
    </>
  );
}
