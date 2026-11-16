import type { Metadata } from "next";
import { CertificateLookup, VerifyById } from "@/components/CertificateLookup";
import { LogoOrnament } from "@/components/LogoOrnament";
import { FEATURES } from "@/content/site";
import styles from "../inner.module.css";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Find, download and verify certificates from AWS Student Builder Group CUI events.",
};

export default function CertificatesPage() {
  return (
    <>
      <section className="band band--brand pixel-grid page-head">
        <LogoOrnament size="22rem" right="-6rem" bottom="-10rem" duration={140} opacity={0.13} />
        <div className="wrap">
          <span className="eyebrow">Download / get certificate</span>
          <h1>You showed up. Here&apos;s the proof.</h1>
          <p className="lede">Find every certificate you&apos;ve earned at our events, download it, and let anyone verify it.</p>
        </div>
      </section>

      <section className="band band--tight">
        <div className="wrap">
          <div className={styles.block}>
            <h2>How it works</h2>
            <ol className={styles.steps}>
              <li>
                <h3>Enter your email</h3>
                <p>Use the address you registered for the event with.</p>
              </li>
              <li>
                <h3>Download the PDF</h3>
                <p>Each certificate you&apos;ve earned is listed with its own download.</p>
              </li>
              <li>
                <h3>Verify and share</h3>
                <p>Every certificate has a public verification page and can be added to your LinkedIn profile.</p>
              </li>
            </ol>
          </div>

          <div className={styles.block}>
            <h2>Find my certificates</h2>
            <CertificateLookup />
          </div>

          <div className={styles.block}>
            <h2>Verify a certificate</h2>
            <p>Checking someone else&apos;s certificate? Enter its ID to see whether we issued it.</p>
            <VerifyById />
          </div>

          <div className={styles.block}>
            <h2>Sharing on LinkedIn</h2>
            <p>
              {FEATURES.linkedInPosting
                ? "Post your certificate with the group tagged. Nothing is ever posted until you press Post yourself."
                : "One-tap posting with the group tagged is coming later. Nothing will ever be posted for you: you press Post, or it doesn't happen. Until then, add the certificate to your profile and tag the group yourself."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
