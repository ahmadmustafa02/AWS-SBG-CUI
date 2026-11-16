"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiConfigured, lookupCertificates, type CertificateSummary } from "@/lib/api";
import { formatEventDate } from "@/lib/format";
import { Field, isEmail } from "./Field";
import { Icon } from "./Icon";
import { StateBlock } from "./StateBlock";
import styles from "@/app/inner.module.css";

type State = { kind: "idle" } | { kind: "loading" } | { kind: "error" } | { kind: "done"; items: CertificateSummary[] };

export function CertificateLookup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("Enter the email address you registered with.");
      return;
    }
    setError(undefined);
    setState({ kind: "loading" });
    try {
      const res = await lookupCertificates(email.trim());
      setState({ kind: "done", items: res.certificates });
    } catch {
      setState({ kind: "error" });
    }
  }

  if (!apiConfigured) {
    return (
      <StateBlock kind="coming-soon" title="Certificate lookup isn't connected yet">
        Certificates are issued after an event. Once the service is live you&apos;ll enter your registered email here and
        see every certificate you&apos;ve earned.
      </StateBlock>
    );
  }

  return (
    <div>
      <form className={styles.inline} onSubmit={onSubmit} noValidate>
        <Field id="cert-email" label="Registered email" type="email" autoComplete="email" value={email} error={error} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" className="btn" disabled={state.kind === "loading"}>
          Find my certificates
        </button>
      </form>

      <div aria-live="polite" style={{ marginTop: "1.5rem" }}>
        {state.kind === "loading" && <StateBlock kind="loading" title="Looking up your certificates" />}
        {state.kind === "error" && (
          <StateBlock kind="error" title="We couldn't check right now">
            Try again in a moment. If it keeps failing, tell a team member at the help desk.
          </StateBlock>
        )}
        {state.kind === "done" && state.items.length === 0 && (
          <StateBlock kind="empty" title="No certificates under that email">
            Double-check the address, or use the one you registered with. Certificates appear after the event closes.
          </StateBlock>
        )}
        {state.kind === "done" && state.items.length > 0 && (
          <ul className={styles.certList}>
            {state.items.map((c) => (
              <li key={c.id}>
                <div>
                  <h3>{c.eventTitle}</h3>
                  <p>
                    Issued {formatEventDate(c.issuedAt)} · ID <span className="mono">{c.id}</span>
                  </p>
                </div>
                <div className="btn-row">
                  <a className="btn btn--small" href={c.pdfUrl} download>
                    Download PDF
                  </a>
                  <a className="btn btn--secondary btn--small" href={c.verifyUrl}>
                    Verify
                  </a>
                  {c.linkedInAddUrl && (
                    <a className="btn btn--secondary btn--small" href={c.linkedInAddUrl} target="_blank" rel="noopener noreferrer">
                      <Icon name="linkedin" size={16} /> Add to LinkedIn profile
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** Jump to the public verification page for a certificate ID. */
export function VerifyById() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [error, setError] = useState<string>();

  return (
    <form
      className={styles.inline}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const clean = id.trim();
        if (!/^[A-Za-z0-9_-]{4,64}$/.test(clean)) {
          setError("Enter the certificate ID printed on the certificate (letters, numbers and dashes).");
          return;
        }
        router.push(`/certificates/verify/${encodeURIComponent(clean)}`);
      }}
    >
      <Field id="cert-id" label="Certificate ID" value={id} error={error} onChange={(e) => setId(e.target.value)} autoComplete="off" />
      <button type="submit" className="btn btn--secondary">
        Verify
      </button>
    </form>
  );
}
