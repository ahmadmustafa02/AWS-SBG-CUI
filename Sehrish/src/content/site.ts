import type { Pathway, Quest } from "./types";

export const SITE = {
  name: "AWS Student Builder Group CUI",
  shortName: "AWS SBG · CUI",
  university: "COMSATS University Islamabad",
  description:
    "A student-led community at COMSATS University Islamabad for learning the cloud by building with it.",
  footerLine: "Made by students. Built for builders.",
  /** Only official links supplied by the team. Add an entry here to show it. */
  socials: [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/aws-cloud-club-comsats-university-islamabad/",
      icon: "linkedin" as const,
    },
    {
      id: "meetup",
      label: "Meetup",
      href: "https://www.meetup.com/aws-sbg-at-comsats-university-islamabad-islamabad-campus/",
      icon: "meetup" as const,
    },
  ],
  /** Shown in the footer only once the team provides one. */
  contactEmail: undefined as string | undefined,
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Our Team" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/join", label: "Join the Team" },
  { href: "/certificates", label: "Certificates" },
  { href: "/leaderboard", label: "Leaderboard" },
] as const;

/** Recruitment switch. Becomes admin-controlled once the API exists. */
export const RECRUITMENT = {
  // TODO(organizers): confirm whether applications are open right now.
  open: true,
  /** ISO date-time. Leave undefined until a deadline is published. */
  deadline: undefined as string | undefined,
  teams: [
    "AI",
    "Data Science",
    "Cloud",
    "Technical",
    "Social Media",
    "Media",
    "Graphics",
    "Marketing & Management",
    "PR",
    "Operations",
  ],
};

/** Which modules the backend has delivered. Flip these as they go live. */
export const FEATURES = {
  findMyPhotos: false,
  accounts: false,
  linkedInPosting: false,
};

export const PATHWAYS: Pathway[] = [
  { id: "cloud", name: "Cloud", icon: "cloud", blurb: "Spin things up on AWS, break them on purpose, and learn why they broke." },
  { id: "ai", name: "AI", icon: "brain", blurb: "From prompts to models: study sessions and builds that go past the demo." },
  { id: "data-science", name: "Data Science", icon: "database", blurb: "Messy datasets, honest charts, and the questions worth asking of them." },
  { id: "technical", name: "Technical projects", icon: "terminal", blurb: "The tools the group runs on, including this site, are built in-house." },
  { id: "media", name: "Media & storytelling", icon: "camera", blurb: "Photos, reels and write-ups, so what we build doesn't vanish after the event." },
  { id: "design", name: "Design & graphics", icon: "pen", blurb: "Posters, slides and interfaces that look like someone cared." },
  { id: "community", name: "Marketing, management & community", icon: "megaphone", blurb: "Filling the room, running the day, and keeping people coming back." },
];

/** Starting point values from the PRD. Admin-editable once the API exists. */
export const QUESTS: Quest[] = [
  { id: "check-in", action: "Check in at an event", verifiedBy: "Entry QR scan", points: 50, limit: "Once per event" },
  { id: "booth", action: "Visit a booth", verifiedBy: "Booth QR scan", points: 10, limit: "Once per booth" },
  { id: "quiz", action: "Answer a quiz question correctly", verifiedBy: "Timed in-site quiz", points: 5, limit: "Per question, one attempt" },
  { id: "photo-upload", action: "Upload an event photo", verifiedBy: "Moderator approval", points: 5, limit: "Max 5 per event" },
  { id: "find-photos", action: "Use Find My Photos", verifiedBy: "First successful selfie search", points: 10, limit: "Once per event" },
  { id: "linkedin-post", action: "Post on LinkedIn tagging AWS CUI", verifiedBy: "Post ID or approved post URL", points: 30, limit: "Once per event" },
  { id: "certificate", action: "Claim a certificate", verifiedBy: "Certificate claimed", points: 10, limit: "Once per certificate" },
  { id: "referral", action: "Refer a friend who checks in", verifiedBy: "Referral code at check-in", points: 15, limit: "Max 3 per event" },
];
