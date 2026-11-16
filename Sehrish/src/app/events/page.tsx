import type { Metadata } from "next";
import { EventSpotlight } from "@/components/EventSpotlight";
import { EventTabs } from "@/components/EventTabs";
import { LogoOrnament } from "@/components/LogoOrnament";
import { featuredEvent, pastEvents, upcomingEvents } from "@/content/events";
import styles from "./events.module.css";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events from AWS Student Builder Group CUI.",
};

export default function EventsPage() {
  const featured = featuredEvent();

  return (
    <>
      <section className="band band--brand pixel-grid page-head">
        <LogoOrnament size="26rem" left="-9rem" bottom="-12rem" duration={170} opacity={0.12} />
        <div className={`wrap ${styles.head}`}>
          <div>
            <span className="eyebrow">Events</span>
            <h1>Your next checkpoint is on the calendar.</h1>
            <p className="lede">Talks, workshops and build days. Come for the session, stay for the people.</p>
          </div>
          {featured && <EventSpotlight event={featured} />}
        </div>
      </section>

      <section className="band band--tight" aria-label="All events">
        <div className="wrap">
          <EventTabs upcoming={upcomingEvents()} past={pastEvents()} />
        </div>
      </section>
    </>
  );
}
