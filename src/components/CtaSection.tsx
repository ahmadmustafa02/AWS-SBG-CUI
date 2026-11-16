import Link from "next/link";
import { Icon } from "./Icon";
import { LogoOrnament } from "./LogoOrnament";
import styles from "./CtaSection.module.css";

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  label: string;
};

/** Light, full-bleed call-to-action band. */
export function CtaSection({ eyebrow, title, body, href, label }: Props) {
  return (
    <section className="band band--paper">
      <LogoOrnament size="26rem" right="-7rem" top="-9rem" duration={140} opacity={0.14} drift />
      <div className={`wrap ${styles.cta}`}>
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p className={styles.body}>{body}</p>
        </div>
        <Link href={href} className="btn btn--violet">
          {label} <Icon name="arrow" size={18} />
        </Link>
      </div>
    </section>
  );
}
