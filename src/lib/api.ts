/**
 * Single seam between the frontend and the serverless API.
 *
 * Backend dev: every network call the UI makes is in this file. Set
 * NEXT_PUBLIC_API_BASE_URL and implement the routes below; no component needs
 * to change. Until then `apiConfigured` is false and the UI shows honest
 * "not connected yet" states instead of pretending.
 *
 * No secrets belong here. Rekognition, Certifier and LinkedIn are only ever
 * called by the API, never by the browser.
 */
import type { Leaderboard } from "@/content/types";

const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");

export const apiConfigured = BASE.length > 0;

export class ApiNotConnectedError extends Error {
  constructor() {
    super("The API is not connected yet.");
    this.name = "ApiNotConnectedError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!apiConfigured) throw new ApiNotConnectedError();
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as T;
}

export type TeamApplication = {
  name: string;
  email: string;
  rollNumber: string;
  semester: string;
  department: string;
  preferredTeam: string;
  skills: string;
  portfolioUrl: string;
  linkedInUrl: string;
  motivation: string;
};

/** POST /applications */
export function submitApplication(body: TeamApplication) {
  return request<{ id: string }>("/applications", { method: "POST", body: JSON.stringify(body) });
}

export type EventRegistration = {
  eventId: string;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  semester: string;
};

/** POST /events/:id/registrations — step 1 of 2. */
export function registerForEvent(body: EventRegistration) {
  return request<{ registrationId: string }>(`/events/${body.eventId}/registrations`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** POST /registrations/:id/meetup — step 2 of 2 (self-reported RSVP). */
export function confirmMeetupRsvp(registrationId: string, meetupProfile: string) {
  return request<{ status: string }>(`/registrations/${registrationId}/meetup`, {
    method: "POST",
    body: JSON.stringify({ meetupProfile }),
  });
}

/** GET /leaderboard?scope=all-time | <eventId> */
export function fetchLeaderboard(scope: string) {
  return request<Leaderboard>(`/leaderboard?scope=${encodeURIComponent(scope)}`);
}

export type CertificateSummary = {
  id: string;
  eventTitle: string;
  issuedAt: string;
  pdfUrl: string;
  verifyUrl: string;
  linkedInAddUrl?: string;
};

/** POST /certificates/lookup — email goes in the body, never the URL. */
export function lookupCertificates(email: string) {
  return request<{ certificates: CertificateSummary[] }>("/certificates/lookup", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export type CertificateVerification = {
  valid: boolean;
  recipientName?: string;
  eventTitle?: string;
  issuedAt?: string;
};

/** GET /certificates/:id/verify */
export function verifyCertificate(id: string) {
  return request<CertificateVerification>(`/certificates/${encodeURIComponent(id)}/verify`);
}

export type Photo = {
  id: string;
  /** Full-size image. For event albums this is a short-lived signed URL. */
  url: string;
  thumbUrl?: string;
  alt?: string;
};

/** GET /events/:id/photos — the whole album for one event (attendees only). */
export function fetchEventPhotos(eventId: string) {
  return request<{ photos: Photo[] }>(`/events/${encodeURIComponent(eventId)}/photos`);
}

/**
 * POST /events/:id/photos/search — Find My Photos.
 * Sends the selfie as multipart form data; the API runs the face match
 * (Rekognition) and deletes the selfie afterwards unless `remember` is set.
 */
export async function searchMyPhotos(eventId: string, selfie: File, remember = false) {
  if (!apiConfigured) throw new ApiNotConnectedError();
  const body = new FormData();
  body.append("selfie", selfie);
  body.append("remember", String(remember));
  const res = await fetch(`${BASE}/events/${encodeURIComponent(eventId)}/photos/search`, { method: "POST", body });
  if (res.status === 422) return { photos: [] as Photo[], retake: true };
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return { ...((await res.json()) as { photos: Photo[] }), retake: false };
}

export type GalleryAlbum = {
  id: string;
  title: string;
  year: number;
  photos: Photo[];
};

/** GET /gallery — public albums from previous years. */
export function fetchGallery() {
  return request<{ albums: GalleryAlbum[] }>("/gallery");
}