import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { RegisterFlow } from "@/components/RegisterFlow";
import { StateBlock } from "@/components/StateBlock";
import { eventBySlug, EVENTS, isPast } from "@/content/events";
import styles from "../../../inner.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const event = eventBySlug((await params).slug);
  return event ? { title: `Register · ${event.title}` } : {};
}

export default async function RegisterPage({ params }: Params) {
  const event = eventBySlug((await params).slug);
  if (!event) notFound();
  // An external sign-up form replaces the built-in two-step flow.
  if (event.registrationUrl && event.registration === "open" && !isPast(event)) redirect(event.registrationUrl);

  const open = !isPast(event) && event.registration === "open" && Boolean(event.meetupEventUrl);

  return (
    <>
      <section className="band band--brand pixel-grid page-head">
        <div className="wrap">
          <Link href={`/events/${event.slug}`} className="eyebrow" style={{ textDecoration: "none" }}>
            ← {event.title}
          </Link>
          <h1>Register in two steps.</h1>
          <p className="lede">A short form here, then an RSVP on Meetup. Your QR entry ticket unlocks after both.</p>
        </div>
      </section>

      <section className="band band--tight">
        <div className="wrap" style={{ maxWidth: "46rem" }}>
          {open ? (
            <RegisterFlow event={event} />
          ) : (
            <div className={styles.block}>
              <StateBlock
                kind="coming-soon"
                title={event.registration === "closed" || isPast(event) ? "Registration has closed" : "Registration isn't open yet"}
                action={
                  <Link href={`/events/${event.slug}`} className="btn btn--secondary btn--small">
                    Back to event details
                  </Link>
                }
              >
                {event.registration === "closed" || isPast(event)
                  ? "This event is no longer taking registrations."
                  : "We'll switch this on as soon as the event's Meetup page is live. Here is what to expect:"}
              </StateBlock>
              <ol className={styles.steps} style={{ "--cols": 2, marginTop: "2rem" } as React.CSSProperties}>
                <li>
                  <h3>Fill in the website form</h3>
                  <p>Name, university email, roll number, department and semester.</p>
                </li>
                <li>
                  <h3>RSVP on Meetup</h3>
                  <p>Confirm on the event&apos;s Meetup page, come back, and your QR ticket unlocks.</p>
                </li>
              </ol>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
