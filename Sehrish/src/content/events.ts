import type { EventItem } from "./types";

/**
 * Events are structured content. Anything the organizers have not confirmed
 * stays empty — the UI then shows "to be announced" and never renders a
 * countdown, agenda or speaker from guesses.
 */
export const EVENTS: EventItem[] = [
  {
    id: "evt-community-day",
    slug: "aws-community-day",
    title: "AWS Student Community Day Islamabad 2026",
    summary:
      "A day full of cloud, technology, learning and networking for students, developers, cloud enthusiasts and tech professionals.",
    // Date from the "Date update" poster: Tuesday 24 November 2026.
    // TODO(organizers): add the start time, then remove `dateOnly`.
    startsAt: "2026-11-24T00:00:00+05:00",
    endsAt: "2026-11-24T23:59:00+05:00",
    dateOnly: true,
    venue: "Islamabad (venue to be announced)",
    posterUrl: "/events/community-day-poster.webp",
    highlights: [
      "Hands-on workshops and practical sessions",
      "Expert panel talks and industry insights",
      "AWS and cloud technology learning",
      "Swag and goodies",
      "Networking with students and industry professionals",
      "Participation certificates",
      "New ideas, opportunities and community connections",
    ],
    capacity: undefined,
    agenda: undefined,
    // Add each speaker here as they are confirmed. Example:
    // { id: "jane-doe", name: "Jane Doe", designation: "Solutions Architect, AWS",
    //   topic: "Serverless in 30 minutes", topicIntro: "What the talk covers…",
    //   time: "11:30 AM – 12:15 PM", photoUrl: "/events/speakers/jane-doe.jpg",
    //   linkedInUrl: "https://www.linkedin.com/in/…" },
    speakers: [],
    // { name: "Ali Khan", university: "NUST Islamabad" },
    ambassadors: [],
    // { name: "Partner name", logoUrl: "/events/collaborators/partner.png", url: "https://…" },
    collaborators: [],
    registration: "open",
    registrationUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSe4CZlDEkul7mZD1DLB2wZxWIt2SgYuYO0cBw98hdmMS825ug/viewform",
    meetupEventUrl: undefined,
    featured: true,
  },
];
export function isPast(event: EventItem, now: Date = new Date()): boolean {
  if (event.registration === "completed") return true;
  const end = event.endsAt ?? event.startsAt;
  return end ? new Date(end).getTime() < now.getTime() : false;
}

/** Upcoming: soonest first, undated events last. */
export function upcomingEvents(events: EventItem[] = EVENTS, now: Date = new Date()): EventItem[] {
  return events
    .filter((e) => !isPast(e, now))
    .sort((a, b) => {
      if (!a.startsAt) return 1;
      if (!b.startsAt) return -1;
      return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();
    });
}

/** Past: most recent first. */
export function pastEvents(events: EventItem[] = EVENTS, now: Date = new Date()): EventItem[] {
  return events
    .filter((e) => isPast(e, now))
    .sort((a, b) => new Date(b.startsAt ?? 0).getTime() - new Date(a.startsAt ?? 0).getTime());
}

export function featuredEvent(events: EventItem[] = EVENTS): EventItem | undefined {
  return events.find((e) => e.featured) ?? upcomingEvents(events)[0];
}

export function eventBySlug(slug: string, events: EventItem[] = EVENTS): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}
