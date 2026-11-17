import { useState } from "react";
import { events } from "../data/content";
import { useTitle } from "../hooks";
import { Field, PageHeader, SampleNote } from "../components/Ui";
import { Mark } from "../components/Marks";

const choices = events.filter((event) => event.status === "past");
const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function Certificate({ name, eventTitle, when }) {
  return (
    <article className="certificate" aria-label="Sample participation certificate">
      <div className="sample-ribbon">Sample</div>
      <div className="cert-mark">
        <Mark size={36} />
      </div>
      <p className="cert-org">AWS Student Builder Group · COMSATS University Islamabad</p>
      <h2>Certificate of participation</h2>
      <p className="cert-given">This recognizes</p>
      <p className="cert-name">{name}</p>
      <p className="cert-for">
        for taking part in <strong>{eventTitle}</strong>
      </p>
      <p className="cert-when">{when}</p>
      <div className="cert-signs">
        <div>
          <span className="sig">Maham Batool</span>
          <span>President</span>
        </div>
        <div>
          <span className="sig">Inayat Ur Rehman</span>
          <span>Faculty Advisor</span>
        </div>
      </div>
    </article>
  );
}

export default function Certificates() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    reg: "",
    event: choices[0]?.slug || "",
    attended: false,
  });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  useTitle(
    "Certificates",
    "Request a participation certificate from AWS Student Builder Group at COMSATS Islamabad."
  );

  const selected = choices.find((event) => event.slug === values.event) || choices[0];

  function set(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function printSample() {
    document.body.classList.add("print-cert");
    window.print();
    window.addEventListener(
      "afterprint",
      () => document.body.classList.remove("print-cert"),
      { once: true }
    );
  }

  function onSubmit(event) {
    event.preventDefault();
    const next = {};
    if (values.name.trim().length < 2) next.name = "Enter the name that should appear on the certificate.";
    if (!emailOk(values.email.trim())) next.email = "Enter the Gmail address where a PDF should go.";
    if (values.reg.trim().length < 4) next.reg = "Enter your registration number.";
    if (!values.event) next.event = "Choose the session you attended.";
    if (!values.attended) next.attended = "Confirm that you attended this session.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    setDone(true);
  }

  return (
    <div className="page cert-page">
      <PageHeader
        kicker="Certificates"
        art={null}
        title="A certificate you can actually hold."
        lede="Participation certificates are checked against attendance, then sent as a PDF. Automatic generation is a later step. The card on this page is a sample, and the request form does not send email yet."
      >
        <SampleNote>
          Sample certificate. It is not proof of attendance. A real PDF goes out only
          after someone on the team verifies the request.
        </SampleNote>
      </PageHeader>

      <div className="wrap cert-layout">
        <div>
          <Certificate
            name="Ayesha Noor"
            eventTitle="CS Quiz"
            when="10 November 2026"
          />
          <button className="btn btn-ghost print-btn" type="button" onClick={printSample}>
            Print this sample
          </button>
        </div>

        {done ? (
          <div className="success-panel" role="status">
            <p className="kicker">Preview only</p>
            <h2>Request kept on this page.</h2>
            <p>
              {values.name}, nothing was emailed. When verification is live, a teammate
              will check your name, registration number, and {selected?.title}, then send
              the PDF to {values.email}.
            </p>
            <button className="btn btn-light" type="button" onClick={() => setDone(false)}>
              Edit the request
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit} noValidate>
            <h2>Request a certificate</h2>
            <Field id="name" label="Full name" required error={errors.name} hint="As it should be printed.">
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={values.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : "name-hint"}
                onChange={(event) => set("name", event.target.value)}
              />
            </Field>
            <Field id="email" label="Gmail" required error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={values.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                onChange={(event) => set("email", event.target.value)}
              />
            </Field>
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
            <Field id="event" label="Session you attended" required error={errors.event}>
              <select
                id="event"
                name="event"
                value={values.event}
                aria-invalid={Boolean(errors.event)}
                aria-describedby={errors.event ? "event-error" : undefined}
                onChange={(event) => set("event", event.target.value)}
              >
                {choices.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.title} · {item.dateLabel}
                  </option>
                ))}
              </select>
            </Field>
            <label className="check-line">
              <input
                id="attended"
                type="checkbox"
                checked={values.attended}
                onChange={(event) => set("attended", event.target.checked)}
              />
              <span>I attended this session.</span>
            </label>
            {errors.attended ? (
              <p className="error" role="alert">
                {errors.attended}
              </p>
            ) : null}
            <button className="btn btn-light" type="submit">
              Request certificate
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
