import type { TeamGroupName, TeamMember } from "./types";

/**
 * Official roster, exactly as supplied by the organizers.
 * - Do not rename, merge or reorder people without organizer approval.
 * - `photoUrl`, `bio` and `linkedInUrl` are intentionally empty until each
 *   person supplies them. The card shows an honest placeholder meanwhile.
 * - When the admin API exists this file becomes the fallback / seed data.
 */
export const TEAM: TeamMember[] = [
  // Faculty Advisor
  { id: "inayat-ur-rehman", linkedInUrl: "https://www.linkedin.com/in/inayat-ur-rehman-phd-38235733/", photoUrl: "/team/inayat-ur-rehman.jpg", name: "Sir Inayat Ur Rehman", role: "Faculty Advisor", group: "Faculty Advisor", pattern: "petal" },

  // Mentors
  { id: "iqra-khan", linkedInUrl: "https://www.linkedin.com/in/iqrakhan--/", photoUrl: "/team/iqra-khan.jpg", name: "Iqra Khan", role: "Mentor", group: "Mentors", pattern: "nodes" },
  { id: "mohammad-saad", linkedInUrl: "https://www.linkedin.com/in/mohammad-saad-iqbal-/", photoUrl: "/team/mohammad-saad.jpg", name: "Mohammad Saad", role: "Mentor", group: "Mentors", pattern: "nodes" },

  // Core Team
  { id: "maham-batool", linkedInUrl: "https://www.linkedin.com/in/maham-batool", photoUrl: "/team/maham-batool.jpg", name: "Maham Batool", role: "President", group: "Core Team", domain: "Leadership", pattern: "petal" },
  { id: "hashim-ali-khan", linkedInUrl: "https://www.linkedin.com/in/hashim-ali-92009627a", photoUrl: "/team/hashim-ali-khan.jpg", name: "Hashim Ali Khan", role: "Vice President", group: "Core Team", domain: "Leadership", pattern: "petal" },
  { id: "iman-shahid", linkedInUrl: "https://www.linkedin.com/in/imansshahid/", photoUrl: "/team/iman-shahid.jpg", name: "Iman Shahid", role: "Vice President", group: "Core Team", domain: "Leadership", pattern: "petal" },
  { id: "fatima-waseem", photoUrl: "/team/fatima-waseem.jpg", name: "Fatima Waseem", role: "General Secretary", group: "Core Team", domain: "Leadership", pattern: "petal" },
  { id: "farheen-anwar", linkedInUrl: "https://www.linkedin.com/in/farheen-anwar-122004fh/", photoUrl: "/team/farheen-anwar.jpg", name: "Farheen Anwar", role: "Operation Director", group: "Core Team", domain: "Operations", pattern: "pixels" },
  { id: "maaz-malik", photoUrl: "/team/maaz-malik.jpg", name: "Maaz Malik", role: "Technical Director", group: "Core Team", domain: "Technical", pattern: "circuit" },

  // Executives — Leads & Co-Leads
  { id: "ahmed-mustafa", linkedInUrl: "https://www.linkedin.com/in/ahmadmustafabutt/", photoUrl: "/team/ahmed-mustafa.jpg", name: "Ahmed Mustafa", role: "AI Lead", group: "Executives", domain: "AI", pattern: "circuit" },
  { id: "zuha-ahmed", linkedInUrl: "https://www.linkedin.com/in/zuhaahmad", photoUrl: "/team/zuha-ahmed.jpg", name: "Zuha Ahmed", role: "AI Co-Lead", group: "Executives", domain: "AI", pattern: "circuit" },
  { id: "zahra-noor", photoUrl: "/team/zahra-noor.jpg", name: "Zahra Noor", role: "AI Co-Lead", group: "Executives", domain: "AI", pattern: "circuit" },
  { id: "muhammad-umar", linkedInUrl: "https://www.linkedin.com/in/muhammad-umar-a-1105bb246/", photoUrl: "/team/muhammad-umar.jpg", name: "Muhammad Umar", role: "Data Science Lead", group: "Executives", domain: "Data Science", pattern: "nodes" },
  { id: "muhammad-taha", photoUrl: "/team/muhammad-taha.jpg", name: "Muhammad Taha", role: "Data Science Co-Lead", group: "Executives", domain: "Data Science", pattern: "nodes" },
  { id: "ali-haider", photoUrl: "/team/ali-haider.jpg", name: "Ali Haider", role: "Cloud Lead", group: "Executives", domain: "Cloud", pattern: "cloud" },
  { id: "sehrish-fatima", linkedInUrl: "https://www.linkedin.com/in/syeda-sehrish-fatima-34800a387/", photoUrl: "/team/sehrish-fatima.jpg", name: "Sehrish Fatima", role: "Cloud Co-Lead", group: "Executives", domain: "Cloud", pattern: "cloud" },
  { id: "humna-mushtaq", linkedInUrl: "https://www.linkedin.com/in/hamna-mushtaq-220505373", photoUrl: "/team/humna-mushtaq.jpg", name: "Humna Mushtaq", role: "Social Media Lead", group: "Executives", domain: "Social Media", pattern: "wave" },
  { id: "noman-sharif", linkedInUrl: "https://www.linkedin.com/in/noman-sharif-008-/", photoUrl: "/team/noman-sharif.jpg", name: "Noman Sharif", role: "Social Media Co-Lead", group: "Executives", domain: "Social Media", pattern: "wave" },
  { id: "samreen-azhar", photoUrl: "/team/samreen-azhar.jpg", name: "Samreen Azhar", role: "Media Co-Lead", group: "Executives", domain: "Media", pattern: "wave" },
  { id: "laiq", photoUrl: "/team/laiq-v2.jpg", name: "Laiq", role: "Graphics Lead", group: "Executives", domain: "Graphics", pattern: "pixels" },
  { id: "hasham-rustam", linkedInUrl: "https://www.linkedin.com/in/hasham-rustam-93778741a", photoUrl: "/team/hasham-rustam.jpg", name: "Hasham Rustam", role: "Graphics Co-Lead", group: "Executives", domain: "Graphics", pattern: "pixels" },
  { id: "fareena-noor", name: "Fareena Noor", role: "Marketing & Management Lead", group: "Executives", domain: "Marketing & Management", pattern: "petal" },
  { id: "ahmed-zarrar", linkedInUrl: "https://www.linkedin.com/in/ahmad-zarrar-jawad", name: "Ahmed Zarrar", role: "Marketing & Management Lead", group: "Executives", domain: "Marketing & Management", pattern: "petal" },
  { id: "ahmed-azlan", linkedInUrl: "https://www.linkedin.com/in/ahmad-azlan-07b382373", photoUrl: "/team/ahmed-azlan.jpg", name: "Ahmed Azlan", role: "Marketing & Management Co-Lead", group: "Executives", domain: "Marketing & Management", pattern: "petal" },
  { id: "abubakar-umar", linkedInUrl: "https://www.linkedin.com/in/abubakar-devs", photoUrl: "/team/abubakar-umar.jpg", name: "Abubakar Umar", role: "Marketing & Management Co-Lead", group: "Executives", domain: "Marketing & Management", pattern: "petal" },
  { id: "musfira-javaid", linkedInUrl: "https://www.linkedin.com/in/musfirajavaid/", photoUrl: "/team/musfira-javaid.jpg", name: "Musfira Javaid", role: "PR Lead", group: "Executives", domain: "PR", pattern: "cloud" },
  { id: "saram-khalid", linkedInUrl: "https://www.linkedin.com/in/saram-khalid-57134832b", photoUrl: "/team/saram-khalid.jpg", name: "Saram Khalid", role: "PR Co-Lead", group: "Executives", domain: "PR", pattern: "cloud" },
];

export const TEAM_GROUPS: { name: TeamGroupName; anchor: string; heading: string; note: string }[] = [
  { name: "Faculty Advisor", anchor: "faculty-advisor", heading: "Faculty Advisor", note: "The steady hand that keeps the group pointed in the right direction." },
  { name: "Mentors", anchor: "mentors", heading: "Mentors", note: "The people we ask when the docs run out." },
  { name: "Core Team", anchor: "core-team", heading: "Core Team", note: "Sets the direction and keeps every moving part moving." },
  { name: "Executives", anchor: "executives", heading: "Executives — Leads & Co-Leads", note: "Each one runs a domain, from model training to the poster on the notice board." },
];

/** Expected head-count per group. The page refuses to build if these drift. */
const EXPECTED: Record<TeamGroupName, number> = {
  "Faculty Advisor": 1,
  Mentors: 2,
  "Core Team": 6,
  Executives: 18,
};
const EXPECTED_TOTAL = 27;

export function membersIn(group: TeamGroupName, roster: TeamMember[] = TEAM): TeamMember[] {
  return roster.filter((m) => m.group === group);
}

/**
 * Roster completeness check. Called by the Our Team page, so a missing or
 * duplicated person fails `next build` instead of shipping.
 */
export function assertRosterComplete(roster: TeamMember[] = TEAM): void {
  const problems: string[] = [];

  if (roster.length !== EXPECTED_TOTAL) {
    problems.push(`expected ${EXPECTED_TOTAL} people, found ${roster.length}`);
  }
  for (const group of Object.keys(EXPECTED) as TeamGroupName[]) {
    const count = membersIn(group, roster).length;
    if (count !== EXPECTED[group]) {
      problems.push(`${group}: expected ${EXPECTED[group]}, found ${count}`);
    }
  }
  const seen = new Set<string>();
  for (const m of roster) {
    if (seen.has(m.id)) problems.push(`duplicate id "${m.id}"`);
    seen.add(m.id);
    if (!m.name.trim() || !m.role.trim()) problems.push(`"${m.id}" is missing a name or role`);
  }

  if (problems.length > 0) {
    throw new Error(`Team roster check failed:\n- ${problems.join("\n- ")}`);
  }
}
