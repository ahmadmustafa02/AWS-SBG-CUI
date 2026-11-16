"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, SITE } from "@/content/site";
import { LogoMark } from "./LogoMark";
import styles from "./SiteNav.module.css";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav({ eventHref }: { eventHref: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the menu and hands focus back to the toggle. The menu is a
  // plain disclosure, not a modal, so focus is never trapped.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label={`${SITE.name} — home`}>
          <LogoMark size={34} />
          <span className={styles.brandText}>
            <span className={styles.brandTop}>AWS Student Builder Group</span>
            <span className={styles.brandSub}>COMSATS University Islamabad</span>
          </span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.toggleIcon} data-open={open} aria-hidden="true" />
          <span>{open ? "Close" : "Menu"}</span>
        </button>

        <nav id="site-menu" className={styles.menu} data-open={open} aria-label="Main">
          <ul>
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={styles.link}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href={eventHref} className={`btn btn--small ${styles.cta}`}>
            Community Day
          </Link>
        </nav>
      </div>
    </header>
  );
}
