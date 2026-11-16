"use client";

import Image from "next/image";
import type { Speaker } from "@/content/types";
import { initials } from "@/lib/format";
import { Icon } from "./Icon";
import { LogoMark } from "./LogoMark";
import { useFlipCard } from "./useFlipCard";
import styles from "./TeamCard.module.css";

/**
 * Speaker flip card, the same build as the team cards.
 * Front: photo, name, designation and talk topic.
 * Back: short intro to the talk, its time slot and the speaker's LinkedIn.
 */
export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const { flipped, inView, cardRef, frontBtn, backBtn, toggle, hoverProps } = useFlipCard();

  return (
    <article ref={cardRef} className={`${styles.card} ${styles.speaker}`} data-flipped={flipped} data-inview={inView} {...hoverProps}>
      <div className={styles.inner}>
        <div className={`${styles.face} ${styles.front}`} inert={flipped}>
          <div className={styles.photo}>
            {speaker.photoUrl ? (
              <Image src={speaker.photoUrl} alt={`Portrait of ${speaker.name}`} fill sizes="(min-width: 40rem) 17rem, 90vw" loading="lazy" />
            ) : (
              <span className={styles.initials} role="img" aria-label="Photo coming soon">
                {initials(speaker.name)}
              </span>
            )}
          </div>

          <div className={styles.info}>
            <LogoMark size="9rem" variant="outline" color="currentColor" className={styles.spinMark} />
            <h3 className={styles.name}>{speaker.name}</h3>
            {speaker.designation && <p className={styles.role}>{speaker.designation}</p>}
            {speaker.topic && <p className={styles.topic}>{speaker.topic}</p>}
          </div>

          <button ref={frontBtn} type="button" className={styles.flip} onClick={toggle} aria-expanded={false}>
            <span className="visually-hidden">Show talk details for {speaker.name}</span>
          </button>
        </div>

        <div className={`${styles.face} ${styles.back}`} inert={!flipped}>
          <LogoMark size="11rem" variant="outline" color="currentColor" className={styles.backMark} />

          <p className={styles.backName}>{speaker.topic ?? speaker.name}</p>
          <p className={styles.backRole}>{speaker.name}</p>

          {speaker.topicIntro ? (
            <p className={styles.bio}>{speaker.topicIntro}</p>
          ) : (
            <p className={`${styles.bio} ${styles.pending}`}>Talk details coming soon.</p>
          )}

          <p className={styles.noLink}>
            <Icon name="calendar" size={18} />
            {speaker.time ?? "Time to be announced"}
          </p>

          {speaker.linkedInUrl && (
            <a className={styles.linkedin} href={speaker.linkedInUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="linkedin" size={18} />
              LinkedIn<span className="visually-hidden"> profile of {speaker.name} (opens in a new tab)</span>
            </a>
          )}

          <button ref={backBtn} type="button" className={styles.flip} onClick={toggle} aria-expanded={true}>
            <span className="visually-hidden">Hide talk details for {speaker.name}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
