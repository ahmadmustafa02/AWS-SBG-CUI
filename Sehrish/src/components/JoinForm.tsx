"use client";

import { useRef, useState } from "react";
import { apiConfigured, submitApplication, type TeamApplication } from "@/lib/api";
import { Field, focusFirstError, isEmail, isHttpUrl } from "./Field";
import { Icon } from "./Icon";

const EMPTY: TeamApplication = {
  name: "",
  email: "",
  rollNumber: "",
  semester: "",
  department: "",
  preferredTeam: "",
  skills: "",
  portfolioUrl: "",
  linkedInUrl: "",
  motivation: "",
};

type Errors = Partial<Record<keyof TeamApplication, string>>;
type Result = "idle" | "sending" | "sent" | "preview" | "failed";

const SEMESTERS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const MIN_MOTIVATION = 40;

function validate(v: TeamApplication): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter your full name.";
  if (!v.email.trim()) e.email = "Enter your university email.";
  else if (!isEmail(v.email)) e.email = "That doesn't look like an email address. Check for typos.";
  if (!v.rollNumber.trim()) e.rollNumber = "Enter your roll number, e.g. FA23-BCS-001.";
  if (!v.semester) e.semester = "Choose your current semester.";
  if (!v.department.trim()) e.department = "Enter your department.";
  if (!v.preferredTeam) e.preferredTeam = "Choose the team you'd most like to join.";
  if (!v.skills.trim()) e.skills = "List a few skills, even ones you're still learning.";
  if (v.portfolioUrl.trim() && !isHttpUrl(v.portfolioUrl)) e.portfolioUrl = "Enter a full link starting with https://";
  if (v.linkedInUrl.trim() && !(isHttpUrl(v.linkedInUrl) && /linkedin\.com/i.test(v.linkedInUrl)))
    e.linkedInUrl = "Enter your full LinkedIn profile link, starting with https://";
  if (v.motivation.trim().length < MIN_MOTIVATION)
    e.motivation = `Tell us a bit more: at least ${MIN_MOTIVATION} characters.`;
  return e;
}

export function JoinForm({ teams }: { teams: string[] }) {
  const [values, setValues] = useState<TeamApplication>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<Result>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const bind = (key: keyof TeamApplication) => ({
    value: values[key],
    error: errors[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError(formRef.current, found);
      return;
    }
    if (!apiConfigured) {
      setResult("preview");
      return;
    }
    setResult("sending");
    try {
      await submitApplication(values);
      setResult("sent");
      setValues(EMPTY);
    } catch {
      setResult("failed");
    }
  }

  if (result === "sent") {
    return (
      <div className="notice notice--success" role="status">
        <Icon name="check" />
        <span>
          <strong>Application received.</strong>
          Thanks for applying. The team reviews every application and will contact you at the email you gave.
        </span>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
      {errorCount > 0 && (
        <div className="notice notice--error" role="alert">
          <Icon name="alert" />
          <span>
            <strong>
              {errorCount} {errorCount === 1 ? "field needs" : "fields need"} a fix.
            </strong>
            Each one is marked below.
          </span>
        </div>
      )}

      <div className="form-grid">
        <Field id="name" label="Full name" autoComplete="name" {...bind("name")} />
        <Field id="email" label="University email" type="email" autoComplete="email" hint="We use this to contact you about your application." {...bind("email")} />
        <Field id="rollNumber" label="Roll number" {...bind("rollNumber")} />
        <Field id="semester" as="select" label="Semester" options={SEMESTERS} placeholder="Choose semester" {...bind("semester")} />
        <Field id="department" label="Department" {...bind("department")} />
        <Field id="preferredTeam" as="select" label="Preferred team" options={teams} placeholder="Choose a team" {...bind("preferredTeam")} />
      </div>

      <Field id="skills" label="Skills" hint="Tools, languages or crafts. Separate with commas." {...bind("skills")} />

      <div className="form-grid">
        <Field id="portfolioUrl" label="Portfolio or GitHub" type="url" inputMode="url" placeholder="https://" optional {...bind("portfolioUrl")} />
        <Field id="linkedInUrl" label="LinkedIn" type="url" inputMode="url" placeholder="https://www.linkedin.com/in/…" optional {...bind("linkedInUrl")} />
      </div>

      <Field id="motivation" as="textarea" label="Why do you want to join?" hint="A few honest sentences beat a polished essay." {...bind("motivation")} />

      {result === "preview" && (
        <div className="notice notice--warn" role="status">
          <Icon name="alert" />
          <span>
            <strong>Nothing was sent.</strong>
            Your answers passed every check, but the application service isn't connected yet, so this form can't
            deliver them. Please check back soon.
          </span>
        </div>
      )}
      {result === "failed" && (
        <div className="notice notice--error" role="alert">
          <Icon name="alert" />
          <span>
            <strong>We couldn't send your application.</strong>
            Your answers are still here. Check your connection and try again.
          </span>
        </div>
      )}

      <div>
        <button type="submit" className="btn" disabled={result === "sending"}>
          {result === "sending" ? "Sending…" : "Submit application"}
        </button>
      </div>
    </form>
  );
}
