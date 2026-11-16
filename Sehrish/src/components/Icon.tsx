import type { IconName } from "@/content/types";

/** Small original line icons. 24px grid, 1.75 stroke, inherits currentColor. */
const PATHS: Record<IconName, React.ReactNode> = {
  cloud: <path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 9.2 4.4 4.4 0 0 1 17.5 18H7Z" />,
  brain: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 10h4v4h-4zM9 4v3M15 4v3M9 17v3M15 17v3M4 9h3M4 15h3M17 9h3M17 15h3" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.75" />
      <path d="M5 6v6c0 1.5 3.1 2.75 7 2.75s7-1.25 7-2.75V6M5 12v6c0 1.5 3.1 2.75 7 2.75s7-1.25 7-2.75v-6" />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <path d="m7 10 3 2.5L7 15M12.5 15H17" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3.2l1.5-2.5h6.6L16.8 8H20v11H4Z" />
      <circle cx="12" cy="13.2" r="3.2" />
    </>
  ),
  pen: (
    <>
      <path d="m12 3 5 9-3 5h-4l-3-5 5-9ZM12 3v8.5" />
      <circle cx="12" cy="12.5" r="1" />
      <path d="M9 17v4h6v-4" />
    </>
  ),
  megaphone: <path d="M4 10v4h3l8 4.5v-13L7 10H4ZM18 9.5a3.5 3.5 0 0 1 0 5M8 14.5l1 5h2.5" />,
  people: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19.5c.4-3.2 2.6-5 5.5-5s5.1 1.8 5.5 5M15.5 5.8a3 3 0 0 1 0 5.6M17.5 14.8c1.7.7 2.8 2.3 3 4.7" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  sliders: <path d="M4 7h9M17 7h3M4 12h3M11 12h9M4 17h11M19 17h1M13 5v4M7 10v4M15 15v4" />,
  share: (
    <>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="17.5" cy="6" r="2.5" />
      <circle cx="17.5" cy="18" r="2.5" />
      <path d="m8.2 10.8 7-3.6M8.2 13.2l7 3.6" />
    </>
  ),
  handshake: <path d="M3 8.5 7 7l4 1.5 2-1.5 4 .5 4 1.5v7l-3 .5-5 3.5-5-3.5-5-1V8.5ZM11 8.5 8.5 12l2 1.2 2.5-2.2 4 4" />,
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 10.5v6M8 7.6v.1M12 16.5v-6M12 13a2.4 2.4 0 0 1 4.5-1v4.5" />
    </>
  ),
  meetup: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8 15.5v-6l4 4 4-4v6" />
    </>
  ),
  rotate: <path d="M19.5 12a7.5 7.5 0 1 1-2.3-5.4M19.5 4v4h-4" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="1.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 0 0-13 0c0 5 6.500 11 6.500 11Z" />
      <circle cx="12" cy="10" r="2.25" />
    </>
  ),
  lock: (
    <>
      <rect x="5.500" y="10.500" width="13" height="9.500" rx="1.500" />
      <path d="M8.500 10.500V8a3.500 3.500 0 0 1 7 0v2.500" />
    </>
  ),
  check: <path d="m5 12.500 4.500 4.500L19 7.500" />,
  alert: (
    <>
      <path d="M12 4 3 19.500h18L12 4Z" />
      <path d="M12 10v4.500M12 17v.100" />
    </>
  ),
  trophy: <path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H4.500v1.500A3 3 0 0 0 8 10M16 6h3.500v1.500A3 3 0 0 1 16 10M12 13v4M8.500 20h7M10 17h4v3h-4z" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ flex: "none" }}
    >
      {PATHS[name]}
    </svg>
  );
}
