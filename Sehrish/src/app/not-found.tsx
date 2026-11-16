import Link from "next/link";

export default function NotFound() {
  return (
    <section className="band band--brand pixel-grid page-head">
      <div className="wrap">
        <span className="eyebrow">Error 404</span>
        <h1>This level doesn&apos;t exist.</h1>
        <p className="lede">The page may have moved, or the link had a typo.</p>
        <div className="btn-row" style={{ marginTop: "2rem" }}>
          <Link href="/" className="btn">
            Back to home
          </Link>
          <Link href="/events" className="btn btn--secondary">
            See events
          </Link>
        </div>
      </div>
    </section>
  );
}
