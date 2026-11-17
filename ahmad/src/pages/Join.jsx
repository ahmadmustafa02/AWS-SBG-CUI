import { useState } from "react";
import { joinRoles, programs, years } from "../data/content";
import { useTitle } from "../hooks";
import { Field, PageHeader } from "../components/Ui";

const empty = {
  name: "",
  email: "",
  reg: "",
  program: "",
  year: "",
  why: "",
  student: false,
};

const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function Join() {
  const [values, setValues] = useState(empty);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  useTitle(
    "Join the team",
    "Apply to AWS Student Builder Group at COMSATS University Islamabad."
  );

  function set(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function toggleRole(role) {
    setRoles((current) =>
      current.includes(role) ? current.filter((item) => item !== role) : [...current, role]
    );
  }

  function validate() {
    const next = {};
    if (values.name.trim().length < 2) next.name = "Enter your name.";
    if (!emailOk(values.email.trim())) next.email = "Enter a valid email so the team can reply.";
    if (values.reg.trim().length < 4) next.reg = "Enter your registration number.";
    if (!values.program) next.program = "Choose your program.";
    if (!values.year) next.year = "Choose your year.";
    if (!roles.length) next.roles = "Choose at least one team. “Not sure yet” is fine.";
    if (values.why.trim().length < 20) next.why = "Write a few sentences, at least a line or two.";
    if (!values.student) next.student = "This team is for COMSATS students. Confirm that you are one.";
    return next;
  }

  function onSubmit(event) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      const id = first === "roles" || first === "student" ? first : first;
      document.getElementById(id)?.focus();
      return;
    }
    setDone(true);
  }

  return (
    <div className="page join-page">
      <PageHeader
        kicker="Join"
        art={null}
        title="Join the team."
        lede="Pick a role: cloud, AI, data, graphics, media, social, PR, marketing, or operations. This form does not send email yet."
      />
      <div className="wrap form-layout">
        <div className="prose">
          <h2>What joining means</h2>
          <ul>
            <li>You help run events, not only attend them.</li>
            <li>A team lead will read this and reply once email is connected.</li>
            <li>You need to be a COMSATS student.</li>
          </ul>
          <p>Photos of the current team are on the team page. Read the roles before you choose one.</p>
        </div>
        {done ? (
          <div className="success-panel" role="status">
            <p className="kicker">Preview only</p>
            <h2>Nothing was sent.</h2>
            <p>
              {values.name.split(" ")[0]}, nothing was emailed. Your answers stayed on
              this page. When email is connected, a team lead will reply from this form.
              Until then, message the team on WhatsApp or Instagram.
            </p>
            <button
              className="btn btn-light"
              type="button"
              onClick={() => {
                setDone(false);
                setValues(empty);
                setRoles([]);
                setErrors({});
              }}
            >
              Start another
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit} noValidate>
            <Field id="name" label="Full name" required error={errors.name}>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={values.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                onChange={(event) => set("name", event.target.value)}
              />
            </Field>
            <Field id="email" label="Email" required error={errors.email} hint="A Gmail address is fine.">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={values.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : "email-hint"}
                onChange={(event) => set("email", event.target.value)}
              />
            </Field>
            <div className="form-row">
              <Field id="reg" label="Registration number" required error={errors.reg}>
                <input
                  id="reg"
                  name="reg"
                  autoComplete="off"
                  value={values.reg}
                  aria-invalid={Boolean(errors.reg)}
                  aria-describedby={errors.reg ? "reg-error" : undefined}
                  onChange={(event) => set("reg", event.target.value)}
                />
              </Field>
              <Field id="year" label="Year" required error={errors.year}>
                <select
                  id="year"
                  name="year"
                  value={values.year}
                  aria-invalid={Boolean(errors.year)}
                  aria-describedby={errors.year ? "year-error" : undefined}
                  onChange={(event) => set("year", event.target.value)}
                >
                  <option value="">Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field id="program" label="Program" required error={errors.program}>
              <select
                id="program"
                name="program"
                value={values.program}
                aria-invalid={Boolean(errors.program)}
                aria-describedby={errors.program ? "program-error" : undefined}
                onChange={(event) => set("program", event.target.value)}
              >
                <option value="">Select program</option>
                {programs.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </Field>
            <fieldset className={`choice-set${errors.roles ? " has-error" : ""}`}>
              <legend>
                Where do you want to work?
                <span aria-hidden="true"> *</span>
                <span className="sr"> (required)</span>
              </legend>
              <div className="choice-grid">
                {joinRoles.map((role) => (
                  <label key={role} className="choice">
                    <input
                      id={role === "Not sure yet" ? "roles" : undefined}
                      type="checkbox"
                      checked={roles.includes(role)}
                      onChange={() => toggleRole(role)}
                    />
                    <span>{role}</span>
                  </label>
                ))}
              </div>
              {errors.roles ? (
                <p className="error" id="roles-error" role="alert">
                  {errors.roles}
                </p>
              ) : null}
            </fieldset>
            <Field
              id="why"
              label="Why this team"
              required
              error={errors.why}
              hint="A short note is enough. What you have already made, hosted, or designed helps."
            >
              <textarea
                id="why"
                name="why"
                rows={5}
                maxLength={800}
                value={values.why}
                aria-invalid={Boolean(errors.why)}
                aria-describedby={errors.why ? "why-error" : "why-hint"}
                onChange={(event) => set("why", event.target.value)}
              />
            </Field>
            <label className={`check-line${errors.student ? " has-error" : ""}`}>
              <input
                id="student"
                type="checkbox"
                checked={values.student}
                onChange={(event) => set("student", event.target.checked)}
              />
              <span>I am a student at COMSATS University Islamabad.</span>
            </label>
            {errors.student ? (
              <p className="error" role="alert">
                {errors.student}
              </p>
            ) : null}
            <button className="btn btn-light" type="submit">
              Submit application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
