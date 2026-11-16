/**
 * Content model shared by the frontend and (later) the admin API.
 * Field names follow the PRD's core data entities so the backend can return
 * the same shapes without a mapping layer.
 */

export type TeamGroupName = "Faculty Advisor" | "Mentors" | "Core Team" | "Executives";

export type TeamDomain =
  | "Leadership"
  | "AI"
  | "Data Science"
  | "Cloud"
  | "Social Media"
  | "Media"
  | "Graphics"
  | "Marketing & Management"
  | "PR"
  | "Operations"
  | "Technical";

export type CardPattern = "petal" | "circuit" | "cloud" | "pixels" | "wave" | "nodes";

export type TeamMember = {
  /** Stable, unique. Never derive from array position. */
  id: string;
  name: string;
  /** Exactly as supplied by the organizers. */
  role: string;
  group: TeamGroupName;
  domain?: TeamDomain;
  photoUrl?: string;
  bio?: string;
  linkedInUrl?: string;
  pattern: CardPattern;
};

export type RegistrationStatus = "coming-soon" | "open" | "closed" | "completed";

export type AgendaItem = { time?: string; title: string; speaker?: string };
export type Speaker = {
  id: string;
  name: string;
  /** Job title and organisation, e.g. "Solutions Architect, AWS". */
  designation?: string;
  /** Title of the talk (front of the card). */
  topic?: string;
  photoUrl?: string;
  /** Short intro to the talk (back of the card). */
  topicIntro?: string;
  /** Slot as shown to attendees, e.g. "11:30 AM – 12:15 PM". */
  time?: string;
  linkedInUrl?: string;
};
export type Ambassador = { name: string; university: string };
export type Collaborator = { name: string; logoUrl?: string; url?: string };

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  /** ISO 8601 with offset. Leave undefined until the organizers confirm it. */
  startsAt?: string;
  endsAt?: string;
  /** True when only the day is confirmed: the time is hidden everywhere. */
  dateOnly?: boolean;
  venue?: string;
  onlineUrl?: string;
  bannerUrl?: string;
  /** Portrait poster shown in the featured-event panel and on the event page. */
  posterUrl?: string;
  /** What attendees can expect, as short bullet points. */
  highlights?: string[];
  capacity?: number;
  agenda?: AgendaItem[];
  speakers?: Speaker[];
  ambassadors?: Ambassador[];
  collaborators?: Collaborator[];
  /** External sign-up form. When set and registration is open, Register goes here. */
  registrationUrl?: string;
  registration: RegistrationStatus;
  /** The Register button stays hidden until this is set (PRD rule). */
  meetupEventUrl?: string;
  featured?: boolean;
  /** Past events only. */
  recap?: string;
  albumId?: string;
  certificatesAvailable?: boolean;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  university: string;
  points: number;
};

export type Leaderboard = {
  entries: LeaderboardEntry[];
  /** ISO time the board was frozen at, when a competition cut-off has passed. */
  frozenAt?: string;
};

export type Quest = {
  id: string;
  action: string;
  verifiedBy: string;
  points: number;
  limit: string;
};

export type QuestStatus = "not-started" | "pending-review" | "done";

export type Pathway = {
  id: string;
  name: string;
  blurb: string;
  icon: IconName;
};

export type IconName =
  | "cloud"
  | "brain"
  | "database"
  | "terminal"
  | "camera"
  | "pen"
  | "megaphone"
  | "people"
  | "compass"
  | "sliders"
  | "share"
  | "handshake"
  | "linkedin"
  | "meetup"
  | "rotate"
  | "arrow"
  | "calendar"
  | "pin"
  | "lock"
  | "check"
  | "alert"
  | "trophy"
  | "close";
