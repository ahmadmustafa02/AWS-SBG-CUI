import type { Metadata } from "next";
import Link from "next/link";
import { VerifyResult } from "@/components/VerifyResult";

type Params = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Verify certificate",
  robots: { index: false },
};

export default async function VerifyPage({ params }: Params) {
  const id = decodeURIComponent((await params).id);

  return (
    <>
      <section className="band band--brand pixel-grid page-head">
        <div className="wrap">
          <Link href="/certificates" className="eyebrow" style={{ textDecoration: "none" }}>
            ← Certificates
          </Link>
          <h1>Certificate check</h1>
          <p className="lede">
            ID <span className="mono">{id}</span>
          </p>
        </div>
      </section>
      <section className="band band--tight">
        <div className="wrap" style={{ maxWidth: "46rem" }}>
          <VerifyResult id={id} />
        </div>
      </section>
    </>
  );
}
