"use client";

import { useEffect, useState } from "react";
import { apiConfigured, verifyCertificate, type CertificateVerification } from "@/lib/api";
import { formatEventDate } from "@/lib/format";
import { Icon } from "./Icon";
import { StateBlock } from "./StateBlock";

type State = { kind: "loading" } | { kind: "error" } | { kind: "done"; result: CertificateVerification };

export function VerifyResult({ id }: { id: string }) {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (!apiConfigured) return;
    let cancelled = false;
    verifyCertificate(id)
      .then((result) => !cancelled && setState({ kind: "done", result }))
      .catch(() => !cancelled && setState({ kind: "error" }));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!apiConfigured) {
    return (
      <StateBlock kind="coming-soon" title="Verification isn't connected yet">
        This page can&apos;t confirm or deny any certificate until the verification service is live. Do not treat this
        page as proof either way.
      </StateBlock>
    );
  }
  if (state.kind === "loading") return <StateBlock kind="loading" title="Checking our records" />;
  if (state.kind === "error") {
    return (
      <StateBlock kind="error" title="We couldn't check this certificate">
        The lookup failed, which says nothing about the certificate itself. Please try again.
      </StateBlock>
    );
  }

  const { result } = state;
  return result.valid ? (
    <div className="notice notice--success" role="status">
      <Icon name="check" />
      <span>
        <strong>Valid certificate.</strong>
        Issued to {result.recipientName} for {result.eventTitle}
        {result.issuedAt && <> on {formatEventDate(result.issuedAt)}</>}.
      </span>
    </div>
  ) : (
    <div className="notice notice--error" role="status">
      <Icon name="alert" />
      <span>
        <strong>No certificate with this ID.</strong>
        We have no record of it. Check the ID for typos.
      </span>
    </div>
  );
}
