import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { links } from "../data/content";
import { bindMotion } from "../motion";
import { Mark } from "./Marks";
import Splash from "./Splash";

function SocialIcon({ name }) {
  const props = {
    viewBox: "0 0 24 24",
    width: 20,
    height: 20,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (name === "instagram") {
    return (
      <svg {...props}>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5 3.5h14a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5zM8.2 10.1H6.5V17h1.7v-6.9zM7.35 6.7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM17.5 17h-1.7v-3.4c0-.9-.3-1.5-1.1-1.5-.6 0-1 .4-1.1 1.2-.1.2-.1.6-.1.9V17H12v-6.9h1.6v.9c.3-.5 1-1.1 2.1-1.1 1.5 0 2.8 1 2.8 3.2V17z"
        />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10z" />
      <circle cx="12" cy="11" r="1.8" fill="currentColor" />
    </svg>
  );
}

const nav = [
  { to: "/events", label: "Events" },
  { to: "/community-day", label: "Community Day" },
  { to: "/team", label: "Team" },
  { to: "/gallery", label: "Gallery" },
  { to: "/quests", label: "Leaderboard" },
  { to: "/certificates", label: "Certificates" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      const top = target ? target.getBoundingClientRect().top + window.scrollY - 80 : 0;
      const behavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, top);
      document.documentElement.style.scrollBehavior = behavior;
    } else {
      const behavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = behavior;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const main = document.getElementById("main");
    const ctx = bindMotion(main);
    ScrollTrigger.refresh();
    return () => ctx?.revert?.();
  }, [pathname, hash]);

  useEffect(() => {
    const main = document.getElementById("main");
    if (main) main.focus({ preventScroll: true });
  }, [pathname, hash]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const first = panelRef.current?.querySelector("a, button");
    first?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Splash />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap header-inner">
          <NavLink to="/" className="brand" end>
            <span className="brand-mark">
              <Mark />
            </span>
            <span className="brand-copy">
              <span className="brand-full">AWS Student Builder Group</span>
              <span className="brand-short">AWS SBG</span>
              <span className="brand-sub">COMSATS Islamabad</span>
            </span>
          </NavLink>
          <nav className="nav-links" aria-label="Primary">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <NavLink className="btn btn-light btn-small" to="/join">
              Join the team
            </NavLink>
            <button
              className="nav-toggle"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      {open ? (
        <div className="nav-panel" id="mobile-nav" ref={panelRef}>
          <nav aria-label="Mobile">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/join">Join the team</NavLink>
          </nav>
        </div>
      ) : null}
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <span className="brand-mark">
              <Mark />
            </span>
            <p className="footer-name">AWS Student Builder Group</p>
            <p>COMSATS University Islamabad. Learn. Build. Grow.</p>
            <div className="footer-social">
              <a href={links.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <SocialIcon name="instagram" />
              </a>
              <a href={links.meetup} target="_blank" rel="noreferrer" aria-label="Meetup">
                <SocialIcon name="meetup" />
              </a>
              <span className="footer-icon" role="img" aria-label="LinkedIn">
                <SocialIcon name="linkedin" />
              </span>
            </div>
          </div>
          <div>
            <p className="footer-label">Visit</p>
            <ul className="footer-links">
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              <li>
                <NavLink to="/community-day">Community Day</NavLink>
              </li>
              <li>
                <NavLink to="/team">Team</NavLink>
              </li>
              <li>
                <NavLink to="/gallery">Gallery</NavLink>
              </li>
              <li>
                <NavLink to="/quests">Leaderboard</NavLink>
              </li>
              <li>
                <NavLink to="/certificates">Certificates</NavLink>
              </li>
              <li>
                <NavLink to="/join">Join the team</NavLink>
              </li>
              <li>
                <a href={links.program} target="_blank" rel="noreferrer">
                  The program
                  <span className="sr"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
