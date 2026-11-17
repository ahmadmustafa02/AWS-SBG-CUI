/**
 * Site content for AWS SBG at COMSATS Islamabad.
 *
 * CONFIRM before you treat these as final:
 * - Kickoff is listed as "Tuesday 6, 2026" with no month. Sorted as an early-year kickoff.
 *   Tuesday the 6th in 2026 is 6 January and 6 October.
 * - Name spellings follow the fuller intro when two spellings appeared.
 * - Auditorium photos are paired with the architecture workshop (the demo was online).
 * - Leaderboard names, quest scores, certificate sample, and the Community Day run-of-show are DUMMY.
 */

export const links = {
  program: "https://builder.aws.com/community/student-builder-groups",
  meetup:
    "https://www.meetup.com/aws-sbg-at-comsats-university-islamabad-islamabad-campus/",
  instagram: "https://www.instagram.com/awsstudentbuildergroupcui/",
  instagramHandle: "@awsstudentbuildergroupcui",
  formerHandle: "@awscloudclubcui",
  linkedinHandle: "AWS Student Builder Group at CUI",
  whatsapp: "https://chat.whatsapp.com/KbTlNAa97NS5XfjgvCZI3Z?s=cl&p=a&iam=2",
  register: "https://lnkd.in/d8g3a6xU",
  sponsors: "https://lnkd.in/dz33PnCD",
  partners: "https://lnkd.in/d9jjaNFh",
  quizMeetup:
    "https://www.meetup.com/aws-sbg-at-comsats-university-islamabad-islamabad-campus/events/317355547/",
};

export const communityDayStart = "2026-11-24T09:30:00+05:00";

const shot = (src, alt, caption) => ({ src, alt, caption });

const quizPhotos = [
  shot(
    "/images/quiz-stage.jpg",
    "Dania Taj receiving first place at the CS Quiz, with faculty and organizers on stage.",
    "First place, Dania Taj."
  ),
  shot(
    "/images/quiz-lab.jpg",
    "A packed computer lab during the CS Quiz, students at rows of desktops.",
    "The lab during the quiz."
  ),
  shot(
    "/images/quiz-board.jpg",
    "A decorated board reading CS Quiz, with purple and black balloons.",
    "Quiz board."
  ),
  shot(
    "/images/quiz-crew.jpg",
    "The CS Quiz crew posing together in a computer lab.",
    "The crew that ran the quiz."
  ),
  shot(
    "/images/banners.jpg",
    "Standee for the CS Quiz at CUI Tech Fest beside the AWS Student Builder Group banner.",
    "Banners outside the lab."
  ),
  shot(
    "/images/winner-cheque.jpg",
    "Winner cheque presentation for Dania Taj at the CS Quiz closing.",
    "Champion’s cheque."
  ),
  shot(
    "/images/runner-up.jpg",
    "Runner-up cheque presentation for Hammad Rasool at the CS Quiz.",
    "Runner-up presentation."
  ),
];

const kickoffPhotos = [
  shot(
    "/images/kickoff-crowd.jpg",
    "Students seated facing a stage with purple balloons at the community kickoff.",
    "Kickoff, under the covered court."
  ),
  shot(
    "/images/icebreaking.jpg",
    "Organizers on stage beside an Icebreaking banner and purple balloons.",
    "Icebreaking on the same stage."
  ),
];

const architecturePhotos = [
  shot(
    "/images/lecture.jpg",
    "A speaker at the podium in a COMSATS auditorium, audience seated in blue chairs.",
    "Architecture session in the auditorium."
  ),
  shot(
    "/images/audience.jpg",
    "Students in an auditorium listening, laptops open on the desks.",
    "The room during the session."
  ),
  shot(
    "/images/session-crew.jpg",
    "A group of students posing in the auditorium after a session.",
    "Session crew."
  ),
];

export const events = [
  {
    slug: "community-day",
    title: "AWS Student Community Day Islamabad",
    kicker: "Flagship day",
    status: "upcoming",
    date: "2026-11-24",
    dateLabel: "24 Nov 2026",
    sort: "2026-11-24",
    time: "Morning onward",
    venue: "Islamabad",
    format: "In person",
    summary:
      "A full day of workshops, talks, booths, and swag. Rescheduled from 11 November to 24 November 2026.",
    cover: "/images/poster-community-day.jpg",
    coverAlt: "Poster for AWS Student Community Day Islamabad.",
  },
  {
    slug: "cs-quiz-2026",
    title: "CS Quiz",
    kicker: "CUI Tech Fest FA’26",
    status: "past",
    date: "2026-11-10",
    dateLabel: "10 Nov 2026",
    sort: "2026-11-10",
    time: "11:00 AM",
    venue: "COMSATS University Islamabad · computer lab",
    format: "On campus",
    attendees: 64,
    host: "Maham Abbas",
    summary:
      "Three rounds, 180 multiple-choice questions, and a champion’s prize at CUI Tech Fest.",
    cover: "/images/quiz-stage.jpg",
    coverAlt: "CS Quiz first-place moment on stage.",
    paragraphs: [
      "AWS Student Builder Group ran the CS Quiz during CUI Tech Fest FA’26. It was an individual contest for students in computing courses: start with the basics, then intermediate, then a final round.",
      "The set was 180 questions across machine learning, artificial intelligence, data structures and algorithms, object-oriented programming, operating systems, cloud computing, information security, and computer networks.",
      "The closing named three COMSATS students. Dania Taj took first. Hammad Rasool Khattak was first runner-up. Aman Malik was second runner-up.",
    ],
    topics: [
      "Machine learning",
      "Artificial intelligence",
      "Data structures & algorithms",
      "Object-oriented programming",
      "Operating systems",
      "Cloud computing",
      "Information security",
      "Computer networks",
    ],
    winners: [
      { place: "Winner", name: "Dania Taj" },
      { place: "1st runner-up", name: "Hammad Rasool Khattak" },
      { place: "2nd runner-up", name: "Aman Malik" },
    ],
    links: [
      { label: "Meetup listing", href: links.quizMeetup },
      { label: "WhatsApp community", href: links.whatsapp },
    ],
    photos: quizPhotos,
  },
  {
    slug: "architecture-demo",
    title: "Architecture & Scaling Demo",
    kicker: "Follow-up session",
    status: "past",
    date: null,
    dateLabel: "2026",
    sort: "2026-10-20",
    time: "Online",
    venue: "Online",
    format: "Online",
    attendees: 25,
    host: "Maham Abbas",
    dateNote:
      "Exact date was not in the notes we were given. Add it when you have the calendar line.",
    summary:
      "A live demo after the scaling workshop: services, integration, and how an architecture behaves once it is more than slides.",
    cover: null,
    paragraphs: [
      "This session picked up after From 1 to 1 Million Users. The point was demonstration: how AWS services sit together, and how scaling decisions show up in a running system.",
      "It was open to students, developers, and anyone curious about cloud architecture. No separate photo set — the session was online.",
    ],
    expect: [
      "Live demonstrations of a real-world AWS architecture",
      "How services connect, not only what they are called",
      "Scalability and infrastructure choices",
      "Room to ask about real scenarios",
    ],
    photos: [],
  },
  {
    slug: "beyond-localhost",
    title: "Beyond Localhost",
    kicker: "Online workshop",
    status: "past",
    date: "2026-10-18",
    dateLabel: "18 Oct 2026",
    sort: "2026-10-18",
    time: "8:00 PM PKT",
    venue: "Online",
    format: "Online",
    host: "Farheen Anwar and two co-hosts",
    summary:
      "Your app works on localhost. Then real users show up. This workshop was about getting it onto AWS.",
    cover: "/images/beyond-localhost.png",
    coverAlt: "Poster for the Beyond Localhost workshop.",
    paragraphs: [
      "Beyond Localhost was a beginner-friendly online workshop on 18 October 2026. No prior AWS experience was required. The link went to people who registered.",
      "The arc was simple: why a single server falls over, which AWS pieces a developer actually needs, and a live pass from local code to a cloud deployment.",
    ],
    expect: [
      "Why apps break under load, and what the cloud changes",
      "Core AWS services worth knowing first",
      "A live deployment from a laptop to the cloud",
    ],
    photos: [
      shot(
        "/images/beyond-localhost.png",
        "Dark poster for Beyond Localhost Workshop, 18 October 2026, 8:00 PM, online.",
        "Workshop poster."
      ),
    ],
  },
  {
    slug: "one-to-one-million",
    title: "From 1 to 1 Million Users",
    kicker: "Architecture workshop",
    status: "past",
    date: null,
    dateLabel: "2026",
    sort: "2026-10-05",
    time: "On campus",
    venue: "COMSATS University Islamabad",
    format: "On campus",
    host: "Guest session with Daoud Hussain",
    dateNote:
      "Exact date was not in the notes we were given. The online demo was the follow-up to this workshop.",
    summary:
      "A workshop on what changes between one user and a million: Auto Scaling, containers, DNS, CDN, and the database.",
    cover: "/images/lecture.jpg",
    coverAlt: "Speaker addressing a full auditorium at COMSATS.",
    paragraphs: [
      "From 1 to 1 Million Users looked at real scaling on AWS with Daoud Hussain. The session covered Auto Scaling, Docker and Kubernetes, Route 53, CloudFront, and database scaling.",
      "The hall photographs from campus are filed here. Move them if they belong to a different day.",
    ],
    expect: [
      "Auto Scaling",
      "Docker and Kubernetes",
      "Route 53 and CloudFront",
      "Database scaling",
    ],
    photos: architecturePhotos,
  },
  {
    slug: "orientation-2026",
    title: "Cloud Club Orientation",
    kicker: "Campus orientation",
    status: "past",
    date: "2026-02-28",
    dateLabel: "28 Feb 2026",
    sort: "2026-02-28",
    time: "12:00 – 1:30 PM",
    venue: "Haier Lab, CS Department",
    format: "On campus",
    attendees: 35,
    host: "Iqra Khan",
    summary:
      "The 2026 orientation: cloud fundamentals, AWS, certifications, and how to join the team. COMSATS students.",
    cover: "/images/orientation.jpg",
    coverAlt: "Orientation graphic for 28 February 2026 at Haier Lab.",
    paragraphs: [
      "Orientation on 28 February 2026 introduced cloud computing, Amazon Web Services, and the year’s roadmap. It was held in Haier Lab for COMSATS students.",
      "People left with a clearer path toward certifications, mentorship, and the bootcamps that followed. The group was still introducing itself as AWS Cloud Club, the name Student Builder Group grew out of.",
    ],
    photos: [
      shot(
        "/images/orientation.jpg",
        "Graphic announcing AWS Cloud Club Orientation on 28 February 2026 at Haier Lab.",
        "Orientation graphic."
      ),
    ],
  },
  {
    slug: "kickoff-2026",
    title: "Community Kickoff",
    kicker: "Opening session",
    status: "past",
    date: "2026-01-06",
    dateLabel: "Tuesday 6, 2026",
    sort: "2026-01-06",
    time: "11:30 AM",
    venue: "COMSATS University Islamabad",
    format: "On campus",
    attendees: 23,
    host: "Maham Abbas",
    dateNote:
      "The original note says Tuesday the 6th, 2026, and does not name the month. Tuesday the 6th falls on 6 January and 6 October.",
    summary:
      "The session that opened the year: who the group is, the roadmap, and a first icebreaker.",
    cover: "/images/kickoff-crowd.jpg",
    coverAlt: "Crowd facing the kickoff stage with purple balloons.",
    paragraphs: [
      "Community Kickoff brought COMSATS students into the 2026 plan: workshops, bootcamps, and ways to join the team. It was on campus at 11:30, with icebreakers and time to actually meet people.",
      "The listing names Tuesday the 6th without a month. The page keeps that wording until the month is confirmed.",
    ],
    expect: [
      "Introduction to AWS SBG CUI",
      "The 2026 roadmap",
      "Icebreakers",
      "How to get involved",
    ],
    photos: kickoffPhotos,
  },
];

export const gallery = [
  ...kickoffPhotos,
  ...quizPhotos,
  ...architecturePhotos,
  shot(
    "/images/executives-team.jpg",
    "The AWS SBG CUI executive team posed on outdoor steps at COMSATS.",
    "Executives, on campus."
  ),
  shot(
    "/images/poster-community-day.jpg",
    "Poster reading AWS Student Community Day Islamabad over a city skyline.",
    "Community Day poster."
  ),
  shot(
    "/images/poster-register.jpg",
    "Poster announcing that registration for Community Day is open, with a phone and QR code.",
    "Registration poster."
  ),
];

export const advisor = {
  name: "Inayat Ur Rehman",
  role: "Faculty Advisor",
  line: "Faculty advisor. The society’s work on campus sits with his guidance.",
  photo: "/team/inayat-ur-rehman.jpg",
  linkedin: "https://www.linkedin.com/in/inayat-ur-rehman-phd-38235733/",
};

export const mentors = [
  {
    name: "Iqra Khan",
    role: "Mentor",
    line: "Mentor, and the host of Cloud Club Orientation 2026.",
    photo: "/team/iqra-khan.jpg",
    linkedin: "https://www.linkedin.com/in/iqrakhan--/",
  },
  {
    name: "Mohammad Saad",
    role: "Mentor",
    line: "Mentors members who are turning curiosity into projects and sharper skills.",
    photo: "/team/mohammad-saad.jpg",
    linkedin: "https://www.linkedin.com/in/mohammad-saad-iqbal-/",
  },
];

export const core = [
  {
    name: "Maham Batool",
    role: "President",
    line: "Leads the society: learning in public, events with a point, and a team that can carry both.",
    photo: "/team/maham-batool.jpg",
    linkedin: "https://www.linkedin.com/in/maham-batool",
  },
  {
    name: "Hashim Ali Khan",
    role: "Vice President",
    line: "Works with the presidency on the environment students walk into: skills, people, and plans.",
    photo: "/team/hashim-ali-khan.jpg",
    linkedin: "https://www.linkedin.com/in/hashim-ali-92009627a",
  },
  {
    name: "Iman Shahid",
    role: "Vice President",
    line: "Shares leadership of a community built around technology and collaboration.",
    photo: "/team/iman-shahid.jpg",
    linkedin: "https://www.linkedin.com/in/imansshahid/",
  },
  {
    name: "Fatima Waseem",
    role: "General Secretary",
    line: "Holds communication and coordination together so the rest of the team can move.",
    photo: "/team/fatima-waseem.jpg",
  },
  {
    name: "Farheen Anwar",
    role: "Operations Director",
    line: "Turns the calendar into a running event. Co-hosted Beyond Localhost.",
    photo: "/team/farheen-anwar.jpg",
    linkedin: "https://www.linkedin.com/in/farheen-anwar-122004fh/",
  },
  {
    name: "Maaz Malik",
    role: "Technical Director",
    line: "Sets technical direction across cloud, AI, data, and the things members actually build.",
    photo: "/team/maaz-malik.jpg",
  },
];

export const departments = [
  {
    name: "Artificial intelligence",
    people: [
      {
        name: "Ahmed Mustafa",
        role: "AI Lead",
        line: "Leads the AI track: concepts, tools, and student projects that try something.",
        photo: "/team/ahmed-mustafa.jpg",
        linkedin: "https://www.linkedin.com/in/ahmadmustafabutt/",
      },
      {
        name: "Zuha Ahmed",
        role: "AI Co-Lead",
        line: "Co-leads the AI community and helps members test ideas together.",
        photo: "/team/zuha-ahmed.jpg",
        linkedin: "https://www.linkedin.com/in/zuhaahmad",
      },
      {
        name: "Zahra Noor",
        role: "AI Co-Lead",
        line: "Co-leads AI sessions and the experiments around them.",
        photo: "/team/zahra-noor.jpg",
      },
    ],
  },
  {
    name: "Data science",
    people: [
      {
        name: "Muhammad Umar",
        role: "Data Science Lead",
        line: "Leads data science work: patterns, questions, and insight students can defend.",
        photo: "/team/muhammad-umar.jpg",
        linkedin: "https://www.linkedin.com/in/muhammad-umar-a-1105bb246/",
      },
      {
        name: "Muhammad Taha",
        role: "Data Science Co-Lead",
        line: "Co-leads the data track and the problems it takes on.",
        photo: "/team/muhammad-taha.jpg",
      },
    ],
  },
  {
    name: "Cloud",
    people: [
      {
        name: "Ali Haider",
        role: "Cloud Lead",
        line: "Leads the cloud track, from fundamentals to systems that deploy and scale.",
        photo: "/team/ali-haider.jpg",
      },
      {
        name: "Sehrish Fatima",
        role: "Cloud Co-Lead",
        line: "Supports the cloud community and the workshops that make AWS concrete.",
        photo: "/team/sehrish-fatima.jpg",
        linkedin: "https://www.linkedin.com/in/syeda-sehrish-fatima-34800a387/",
      },
    ],
  },
  {
    name: "Social media",
    people: [
      {
        name: "Humna Mushtaq",
        role: "Social Media Lead",
        line: "Leads the public feed: what the society is doing, in the students’ own channels.",
        photo: "/team/humna-mushtaq.jpg",
        linkedin: "https://www.linkedin.com/in/hamna-mushtaq-220505373",
      },
      {
        name: "Noman Sharif",
        role: "Social Media Co-Lead",
        line: "Co-leads social content and the day-to-day voice of the group.",
        photo: "/team/noman-sharif.jpg",
        linkedin: "https://www.linkedin.com/in/noman-sharif-008-/",
      },
    ],
  },
  {
    name: "Media",
    people: [
      {
        name: "Samreen Azhar",
        role: "Media Co-Lead",
        line: "Co-leads coverage and the stories that come out of each event.",
        photo: "/team/samreen-azhar.jpg",
      },
    ],
  },
  {
    name: "Graphics",
    people: [
      {
        name: "Laiq",
        role: "Graphics Lead",
        line: "Leads the visual identity, from posters to the way an event looks in a room.",
        photo: "/team/laiq-v2.jpg",
      },
      {
        name: "Hasham Rustam",
        role: "Graphics Co-Lead",
        line: "Co-leads graphics and the pieces that carry a session’s message.",
        photo: "/team/hasham-rustam.jpg",
        linkedin: "https://www.linkedin.com/in/hasham-rustam-93778741a",
      },
    ],
  },
  {
    name: "Marketing & management",
    people: [
      {
        name: "Fareena Noor",
        role: "Marketing & Management Lead",
        line: "Leads planning and the message that gets an event in front of the right students.",
      },
      {
        name: "Ahmed Zarrar",
        role: "Marketing & Management Lead",
        line: "Leads marketing and management with a bias for execution.",
        linkedin: "https://www.linkedin.com/in/ahmad-zarrar-jawad",
      },
      {
        name: "Ahmed Azlan",
        role: "Marketing & Management Co-Lead",
        line: "Co-leads campaigns that connect society work with the campus.",
        photo: "/team/ahmed-azlan.jpg",
        linkedin: "https://www.linkedin.com/in/ahmad-azlan-07b382373",
      },
      {
        name: "Abubakar Umar",
        role: "Marketing & Management Co-Lead",
        line: "Co-leads coordination, outreach, and the plan behind a launch.",
        photo: "/team/abubakar-umar.jpg",
        linkedin: "https://www.linkedin.com/in/abubakar-devs",
      },
    ],
  },
  {
    name: "Public relations",
    people: [
      {
        name: "Musfira Javaid",
        role: "PR Lead",
        line: "Leads relationships between the society and the wider community.",
        photo: "/team/musfira-javaid.jpg",
        linkedin: "https://www.linkedin.com/in/musfirajavaid/",
      },
      {
        name: "Saram Khalid",
        role: "PR Co-Lead",
        line: "Co-leads outreach and the conversations that bring people in.",
        photo: "/team/saram-khalid.jpg",
        linkedin: "https://www.linkedin.com/in/saram-khalid-57134832b",
      },
    ],
  },
];

export const tracks = [
  {
    n: "01",
    title: "Cloud",
    text: "Fundamentals, architecture, and the AWS services a project needs once it leaves a laptop.",
  },
  {
    n: "02",
    title: "Artificial intelligence",
    text: "Concepts, tools, and student projects that try something.",
  },
  {
    n: "03",
    title: "Data science",
    text: "Questions, patterns, and a result you can explain.",
  },
  {
    n: "04",
    title: "Graphics",
    text: "Posters, and the way an event looks in the room.",
  },
  {
    n: "05",
    title: "Media",
    text: "Photo and video, so a session still exists after the room empties.",
  },
  {
    n: "06",
    title: "Social media",
    text: "The public feed, in the students’ own channels.",
  },
  {
    n: "07",
    title: "Public relations",
    text: "The link between the society and the wider community.",
  },
  {
    n: "08",
    title: "Marketing & management",
    text: "The plan, and the message that gets an event in front of students.",
  },
  {
    n: "09",
    title: "Operations",
    text: "The calendar, turned into an event that actually runs.",
  },
];

export const agenda = [
  { time: "09:30", title: "Doors and check-in", detail: "Badges, quest card, first points." },
  { time: "10:15", title: "Opening", detail: "What the day is, and how the board works." },
  { time: "11:00", title: "Workshop block", detail: "Hands-on. Laptops useful, not a test of who arrived knowing AWS." },
  { time: "13:00", title: "Panel", detail: "Industry conversation. Questions from the room." },
  { time: "14:30", title: "Booths and build time", detail: "Partners, demos, and the photo and booth quests." },
  { time: "16:00", title: "Quiz and leaderboard", detail: "A short competitive block. Scores hit the board." },
  { time: "17:15", title: "Close", detail: "Swag for the top of the board, certificates to follow after check-in is verified." },
];

export const sponsorPerks = [
  "Brand presence in the room and on the society’s channels",
  "Time with students, developers, and people from industry",
  "A place to show a product, a role, or a service",
  "A path to a talk, a workshop, or a demo",
  "Connections that outlast the day",
];

export const partnerPerks = [
  "Two event tickets",
  "Workshops, sessions, and speaker talks",
  "Recognition for the community you bring",
  "Networking with the AWS community and industry guests",
  "A discounted ticket code you can share",
  "A door to collaborate again",
];

export const quests = [
  {
    id: "session",
    title: "Attend a session",
    points: 50,
    detail: "Check in at a talk or workshop and stay for it.",
  },
  {
    id: "booth",
    title: "Visit a booth",
    points: 30,
    detail: "Stop at a partner or project booth and get it marked.",
  },
  {
    id: "photo",
    title: "Upload a photo",
    points: 40,
    detail: "Send the media team a frame from the day.",
  },
  {
    id: "quiz",
    title: "Answer a quiz",
    points: 80,
    detail: "Finish a quiz block. Speed and accuracy both count.",
  },
  {
    id: "social",
    title: "Post and tag AWS",
    points: 60,
    detail: "Publish a post and tag the society’s AWS channels.",
  },
  {
    id: "lab",
    title: "Finish a hands-on lab",
    points: 100,
    detail: "Complete the workshop exercise before the block ends.",
  },
];

/** DUMMY standings for the design. Replace with live scores later. */
export const leaderboard = [
  { name: "Hiba Rehman", points: 860, tags: ["Lab", "Quiz"] },
  { name: "Zain Abbas", points: 790, tags: ["Booths", "Social"] },
  { name: "Noor Fatima", points: 740, tags: ["Events", "Quiz"] },
  { name: "Hamza Qureshi", points: 690, tags: ["Photos", "Lab"] },
  { name: "Areeba Shah", points: 640, tags: ["Social", "Events"] },
  { name: "Bilal Ahmed", points: 610, tags: ["Booths", "Quiz"] },
  { name: "Maryam Siddiqui", points: 580, tags: ["Quiz"] },
  { name: "Usman Tariq", points: 540, tags: ["Lab", "Photos"] },
];

export const joinRoles = [
  "Cloud",
  "Artificial intelligence",
  "Data science",
  "Graphics",
  "Media",
  "Social media",
  "Public relations",
  "Marketing & management",
  "Operations",
  "Not sure yet",
];

export const programs = [
  "Computer Science",
  "Software Engineering",
  "Artificial Intelligence",
  "Computer Engineering",
  "Electrical Engineering",
  "Business Administration",
  "Other",
];

export const years = ["1st year", "2nd year", "3rd year", "4th year", "Postgraduate"];

export function teamSize() {
  return (
    1 +
    mentors.length +
    core.length +
    departments.reduce((sum, dept) => sum + dept.people.length, 0)
  );
}

export function listedAttendees() {
  return events.reduce((sum, event) => sum + (event.attendees || 0), 0);
}

export function pastCount() {
  return events.filter((event) => event.status === "past").length;
}
