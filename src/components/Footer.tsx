import Link from "next/link";
import { NAV_LINKS, SITE } from "@/content/site";
import { Icon } from "./Icon";
import { LogoMark } from "./LogoMark";
import { LogoOrnament } from "./LogoOrnament";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`band band--tight ${styles.footer}`}>
      <LogoOrnament size="20rem" right="-6rem" bottom="-8rem" duration={160} reverse opacity={0.1} />
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.about}>
          <div className={styles.brand}>
            <LogoMark size={44} title={`${SITE.name} logo`} />
            <p className={styles.name}>
              AWS Student Builder Group
              <span>{SITE.university}</span>
            </p>
          </div>
          <p className={styles.desc}>{SITE.description}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className={styles.heading}>Explore</h2>
          <ul className={styles.list}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/photos">Find My Photos</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>Find us</h2>
          <ul className={styles.list}>
            {SITE.socials.map((s) => (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  <Icon name={s.icon} size={18} />
                  {s.label}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
            {SITE.contactEmail && (
              <li>
                <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className={`wrap ${styles.base}`}>
        <p className="pixel">{SITE.footerLine}</p>
        <p>
          A student-run community. Not an official Amazon Web Services website.
        </p>
      </div>
    </footer>
  );
}
