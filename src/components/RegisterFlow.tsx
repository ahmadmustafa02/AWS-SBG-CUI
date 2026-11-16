"use client";

import { useRef, useState } from "react";
import { SITE } from "@/content/site";
import type { EventItem } from "@/content/types";
import { apiConfigured, confirmMeetupRsvp, registerForEvent } from "@/lib/api";
import { Field, focusFirstError, isEmail } from "./Field";
import { Icon } from "./Icon";

type Details = { name: string; email: string; rollNumber: string; department: string; semester: string };
type Errors = Partial<Record<keyof Details | "meetupProfile", string>>;

const EMPTY: Details = { name: "", email: "", rollNumber: "", department: "", semester: "" };
const SEMESTERS = ["1", "2", "3", "4", "5", "6", "7", "8"];
/** PRD: a meetup.com members URL; the member number is the matching key. */
const MEETUP_MEMBER = /^https?:\/\/(www\.)?meetup\.com\/(?:[a-z-]+\/)?members\/\d+\/?/i;

/**
 * Two-step registration from the PRD: website form, then RSVP on Meetup.
 * Without the API this runs as a clearly-labelled preview and issues nothing.
 */
export function RegisterFlow({ event }: { event: EventItem }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [values, setValues] = useState<Details>(EMPTY);
  const [meetupProfile, setMeetupProfile] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const meetupGroup = SITE.socials.find((s) => s.id === "meetup")?.href;

  const bind = (key: keyof Details) => ({
    value: values[key],
    error: errors[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
    },
  });

  async function submitDetails(e: React.FormEvent) {
    e.preventDefault();
    const found: Errors = {};
    if (!values.name.trim()) found.name = "Enter your full name.";
    if (!isEmail(values.email)) found.email = "Enter a valid university email address.";
    if (!values.rollNumber.trim()) found.rollNumber = "Enter your roll number.";
    if (!values.department.trim()) found.department = "Enter your department.";
    if (!values.semester) found.semester = "Choose your semester.";
    setErrors(found);
    if (Object.keys(found).length) {
      focusFirstError(formRef.current, found);
      return;
    }
    setFailed(false);
    if (apiConfigured) {
      setBusy(true);
      try {
        const res = await registerForEvent({ eventId: event.id, ...values });
        setRegistrationId(res.registrationId);
      } catch {
        setFailed(true);
        setBusy(false);
        return;
      }
      setBusy(false);
    }
    setStep(2);
  }

  async function confirmRsvp(e: React.FormEvent) {
    e.preventDefault();
    const value = meetupProfile.trim();
    const looksLikeUrl = /^https?:\/\//i.test(value);
    if (!value) {
      setErrors({ meetupProfile: "Paste your Meetup profile link, or type your Meetup display name." });
      return;
    }
    if (looksLikeUrl && !MEETUP_MEMBER.test(value)) {
      setErrors({ meetupProfile: "That link isn't a Meetup profile. It should look like meetup.com/members/123456789" });
      return;
    }
    setErrors({});
    setFailed(false);
    if (apiConfigured && registrationId) {
      setBusy(true);
      try {
        await confirmMeetupRsvp(registrationId, value);
      } catch {
        setFailed(true);
        setBusy(false);
        return;
      }
      setBusy(false);
    }
    setStep(3);
  }

  const failure = failed && (
    <div className="notice notice--error" role="alert">
      <Icon name="alert" />
      <span>
        <strong>That didn&apos;t go through.</strong>
        Nothing was lost. Check your connection and try again.
      </span>
    </div>
  );

  return (
    <div className="stack" style={{ "--stack": "1.75rem" } as React.CSSProperties}>
      <p className="pixel" aria-live="polite" style={{ color: "var(--color-orange)", fontSize: "0.85rem" }}>
        Step {Math.min(step, 2)} of 2 {step === 3 && "· done"}
      </p>

      {!apiConfigured && (
        <div className="notice notice--warn">
          <Icon name="alert" />
          <span>
            <strong>Preview only.</strong>
            The registration service isn&apos;t connected yet, so this walkthrough saves nothing and issues no ticket.
          </span>
        </div>
      )}

      {step === 1 && (
        <form ref={formRef} className="form" onSubmit={submitDetails} noValidate>
          <h2>Your details</h2>
          <div className="form-grid">
            <Field id="name" label="Full name" autoComplete="name" {...bind("name")} />
            <Field id="email" label="University email" type="email" autoComplete="email" {...bind("email")} />
            <Field id="rollNumber" label="Roll number" {...bind("rollNumber")} />
            <Field id="department" label="Department" {...bind("department")} />
            <Field id="semester" as="select" label="Semester" options={SEMESTERS} placeholder="Choose semester" {...bind("semester")} />
          </div>
          <p className="hint">
            Photos are taken at our events and an opt-in face search (Find My Photos) is offered afterwards. You can
            ask to be left out of the album.
          </p>
          {failure}
          <div>
            <button type="submit" className="btn" disabled={busy}>
              {busy ? "Saving…" : "Continue to step 2"}
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form className="form" onSubmit={confirmRsvp} noValidate>
          <h2>Confirm on Meetup</h2>
          <p>
            AWS counts attendance through Meetup, so your ticket unlocks after you RSVP there. It opens in a new tab;
            come back here when you&apos;re done.
          </p>
          <div className="btn-row">
            <a className="btn" href={event.meetupEventUrl} target="_blank" rel="noopener noreferrer">
              RSVP on Meetup <Icon name="arrow" size={18} />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
          <p className="hint">
            No Meetup account? Signing up takes about a minute.
            {meetupGroup && (
              <>
                {" "}
                <a className="text-link" href={meetupGroup} target="_blank" rel="noopener noreferrer">
                  Join our Meetup group
                </a>{" "}
                while you&apos;re there.
              </>
            )}
          </p>
          <Field
            id="meetupProfile"
            label="Your Meetup profile link or display name"
            hint="Profile link looks like meetup.com/members/123456789"
            value={meetupProfile}
            error={errors.meetupProfile}
            onChange={(e) => setMeetupProfile(e.target.value)}
          />
          {failure}
          <div className="btn-row">
            <button type="submit" className="btn btn--violet" disabled={busy}>
              {busy ? "Confirming…" : "I have RSVP'd"}
            </button>
            <button type="button" className="btn btn--secondary" onClick={() => setStep(1)}>
              Back
            </button>
          </div>
        </form>
      )}

      {step === 3 &&
        (apiConfigured ? (
          <div className="notice notice--success" role="status">
            <Icon name="check" />
            <span>
              <strong>You&apos;re registered.</strong>
              Your QR entry ticket is on its way by email. Bring it on the day to check in and collect your first
              points.
            </span>
          </div>
        ) : (
          <div className="notice notice--warn" role="status">
            <Icon name="alert" />
            <span>
              <strong>End of the preview.</strong>
              That&apos;s the full flow, but you are not registered and no ticket exists. Real registration opens once
              the service is connected.
            </span>
          </div>
        ))}
    </div>
  );
}
