"use client";

import Image from "next/image";
import type { IconName, TeamDomain, TeamMember } from "@/content/types";
import { initials } from "@/lib/format";
import { Icon } from "./Icon";
import { LogoMark } from "./LogoMark";
import { useFlipCard } from "./useFlipCard";
import styles from "./TeamCard.module.css";

/** Icon reflects the member's domain only — never implies a title. */
const DOMAIN_ICON: Record<TeamDomain, IconName> = {
  Leadership: "compass",
  AI: "brain",
  "Data Science": "database",
  Cloud: "cloud",
  "Social Media": "share",
  Media: "camera",
  Graphics: "pen",
  "Marketing & Management": "megaphone",
  PR: "handshake",
  Operations: "sliders",
  Technical: "terminal",
};

/**
 * Team flip card.
 * - Mouse: the card flips while the pointer is over it.
 * - Touch: tap to flip, tap again to flip back.
 * - Keyboard: Enter / Space on the card flips it.
 * The face that is turned away is `inert`, so its links can't be reached.
 */
export function TeamCard({ member }: { member: TeamMember }) {
  const { flipped, inView, cardRef, frontBtn, backBtn, toggle, hoverProps } = useFlipCard();

  const icon = member.domain ? DOMAIN_ICON[member.domain] : undefined;

  return (
    <article
      ref={cardRef}
      className={styles.card}
      data-flipped={flipped}
      data-inview={inView}
      data-pattern={member.pattern}
      {...hoverProps}
    >
      <div className={styles.inner}>
        {/* ---------- Front: photo on the top half, name and position below ---------- */}
        <div className={`${styles.face} ${styles.front}`} inert={flipped}>
          <div className={styles.photo}>
            {member.photoUrl ? (
              <Image
                src={member.photoUrl}
                alt={`Portrait of ${member.name}`}
                fill
                sizes="(min-width: 40rem) 17rem, 90vw"
                loading="lazy"
              />
            ) : (
              <span className={styles.initials} role="img" aria-label="Photo coming soon">
                {initials(member.name)}
              </span>
            )}
            {icon && (
              <span className={styles.chip}>
                <Icon name={icon} size={16} />
                <span className="visually-hidden">{member.domain}</span>
              </span>
            )}
          </div>

          <div className={styles.info}>
            <LogoMark size="9rem" variant="outline" color="currentColor" className={styles.spinMark} />
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.role}>{member.role}</p>
          </div>

          <button ref={frontBtn} type="button" className={styles.flip} onClick={toggle} aria-expanded={false}>
            <span className="visually-hidden">Show intro for {member.name}</span>
          </button>
        </div>

        {/* ---------- Back: intro and LinkedIn ---------- */}
        <div className={`${styles.face} ${styles.back}`} inert={!flipped}>
          <LogoMark size="11rem" variant="outline" color="currentColor" className={styles.backMark} />

          <p className={styles.backName}>{member.name}</p>
          <p className={styles.backRole}>{member.role}</p>

          {member.bio ? (
            <p className={styles.bio}>{member.bio}</p>
          ) : (
            <p className={`${styles.bio} ${styles.pending}`}>Intro coming soon.</p>
          )}

          {member.linkedInUrl ? (
            <a className={styles.linkedin} href={member.linkedInUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="linkedin" size={18} />
              LinkedIn<span className="visually-hidden"> profile of {member.name} (opens in a new tab)</span>
            </a>
          ) : (
            <p className={styles.noLink}>
              <Icon name="linkedin" size={18} />
              LinkedIn profile coming soon
            </p>
          )}

          <button ref={backBtn} type="button" className={styles.flip} onClick={toggle} aria-expanded={true}>
            <span className="visually-hidden">Hide intro for {member.name}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
