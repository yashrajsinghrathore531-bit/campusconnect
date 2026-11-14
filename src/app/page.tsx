"use client";

import { useMemo, useState } from "react";

type Tab =
  | "Overview"
  | "Campus Map"
  | "Report Issue"
  | "Labs & Classes"
  | "Announcements"
  | "Events"
  | "Lost & Found"
  | "Reviews"
  | "Find Teammates";

const initialEvents = [
  {
    title: "National Hackathon 2026",
    type: "Hackathon",
    date: "18 Nov 2026",
    place: "Innovation Hub",
    seats: "120 spots",
  },
  {
    title: "AI & Machine Learning Workshop",
    type: "Workshop",
    date: "20 Nov 2026",
    place: "Seminar Hall",
    seats: "45 spots",
  },
  {
    title: "Campus Startup Meetup",
    type: "Meetup",
    date: "23 Nov 2026",
    place: "Auditorium",
    seats: "60 spots",
  },
];

const initialLost = [
  {
    item: "Black wireless headphones",
    place: "Central Library",
    status: "Lost",
    date: "Today",
  },
  {
    item: "Blue water bottle",
    place: "Canteen",
    status: "Found",
    date: "Yesterday",
  },
  {
    item: "Student ID card",
    place: "Academic Block",
    status: "Found",
    date: "12 Nov",
  },
];

const initialPeople = [
  {
    name: "Aarav Sharma",
    skill: "React · UI/UX",
    looking: "Building a startup project",
    year: "2nd Year",
    initials: "AS",
  },
  {
    name: "Priya Mehta",
    skill: "Python · AI/ML",
    looking: "Looking for hackathon teammates",
    year: "3rd Year",
    initials: "PM",
  },
  {
    name: "Rohan Verma",
    skill: "Flutter · Firebase",
    looking: "Building a campus app",
    year: "2nd Year",
    initials: "RV",
  },
];

const initialIssues = [
  {
    title: "Wi-Fi not working",
    location: "Academic Block, Floor 2",
    category: "Internet",
    status: "In Progress",
  },
  {
    title: "Water cooler needs repair",
    location: "Hostel Block B",
    category: "Maintenance",
    status: "Reported",
  },
];

const rooms = [
  {
    name: "Computer Lab 01",
    block: "Tech Block",
    time: "10:00 AM – 12:00 PM",
    status: "Available",
    seats: "30 seats",
  },
  {
    name: "Computer Lab 02",
    block: "Tech Block",
    time: "11:00 AM – 1:00 PM",
    status: "Occupied",
    seats: "25 seats",
  },
  {
    name: "Seminar Hall",
    block: "Academic Block",
    time: "2:00 PM – 4:00 PM",
    status: "Available",
    seats: "100 seats",
  },
  {
    name: "Physics Lab",
    block: "Science Block",
    time: "9:00 AM – 11:00 AM",
    status: "Occupied",
    seats: "20 seats",
  },
];

const announcements = [
  {
    tag: "URGENT",
    title: "Scheduled campus network maintenance",
    body: "Campus Wi-Fi may be unavailable during the maintenance window. Check with IT support for updates.",
    time: "Today · 9:00 AM",
    color: "red",
  },
  {
    tag: "NOTICE",
    title: "Library hours extended",
    body: "The central library will remain open until 11 PM this week during examination preparation.",
    time: "Yesterday · 4:30 PM",
    color: "blue",
  },
  {
    tag: "UPDATE",
    title: "Sports registrations are open",
    body: "Register for inter-department sports events through the student activities office.",
    time: "12 Nov · 1:15 PM",
    color: "green",
  },
];

const navItems: { name: Tab; icon: string }[] = [
  { name: "Overview", icon: "⌂" },
  { name: "Campus Map", icon: "⌖" },
  { name: "Report Issue", icon: "＋" },
  { name: "Labs & Classes", icon: "▦" },
  { name: "Announcements", icon: "◉" },
  { name: "Events", icon: "▣" },
  { name: "Lost & Found", icon: "⌕" },
  { name: "Reviews", icon: "☆" },
  { name: "Find Teammates", icon: "♧" },
];

function Status({ children }: { children: string }) {
  const cls =
    children === "Available" || children === "Found"
      ? "green"
      : children === "Occupied" || children === "Lost"
        ? "amber"
        : children === "In Progress"
          ? "blue"
          : "slate";
  return <span className={`status ${cls}`}>{children}</span>;
}

function Header({
  title,
  subtitle,
  onSearch,
  query,
}: {
  title: string;
  subtitle: string;
  onSearch: (v: string) => void;
  query: string;
}) {
  return (
    <header className="topbar">
      <div>
        <div className="eyebrow">CAMPUSCONNECT / STUDENT PORTAL</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="top-actions">
        <label className="searchbox">
          <span>⌕</span>
          <input
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search anything..."
          />
          <kbd>⌘ K</kbd>
        </label>
        <button
          className="icon-btn"
          title="Notifications"
          onClick={() => alert("You’re all caught up!")}
        >
          ♧<i />
        </button>
        <div className="profile-avatar">YS</div>
      </div>
    </header>
  );
}

export default function Home() {
  const [active, setActive] = useState<Tab>("Overview");
  const [query, setQuery] = useState("");
  const [issues, setIssues] = useState(initialIssues);
  const [lostItems, setLostItems] = useState(initialLost);
  const [reviews, setReviews] = useState([
    {
      name: "Central Canteen",
      category: "Food & Dining",
      rating: 4.5,
      comment: "Good variety and affordable meals.",
    },
    {
      name: "Central Library",
      category: "Study Space",
      rating: 4.8,
      comment: "Quiet environment and helpful staff.",
    },
  ]);
  const [people] = useState(initialPeople);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueLocation, setIssueLocation] = useState("");
  const [issueCategory, setIssueCategory] = useState("Maintenance");
  const [issueDetails, setIssueDetails] = useState("");
  const [lostName, setLostName] = useState("");
  const [lostPlace, setLostPlace] = useState("");
  const [lostStatus, setLostStatus] = useState("Lost");
  const [reviewPlace, setReviewPlace] = useState("Central Canteen");
  const [reviewRating, setReviewRating] = useState("5");
  const [reviewText, setReviewText] = useState("");
  const [roomFilter, setRoomFilter] = useState("All");
  const [eventFilter, setEventFilter] = useState("All");
  const [joined, setJoined] = useState<string[]>([]);
  const [connected, setConnected] = useState<string[]>([]);

  const filteredPeople = useMemo(
    () =>
      people.filter((p) =>
        `${p.name} ${p.skill} ${p.looking}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [people, query],
  );

  const filteredRooms = rooms.filter(
    (r) =>
      (roomFilter === "All" || r.status === roomFilter) &&
      `${r.name} ${r.block}`.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredEvents = initialEvents.filter(
    (e) =>
      (eventFilter === "All" || e.type === eventFilter) &&
      `${e.title} ${e.place}`.toLowerCase().includes(query.toLowerCase()),
  );

  function submitIssue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!issueTitle.trim() || !issueLocation.trim()) return;
    setIssues([
      {
        title: issueTitle,
        location: issueLocation,
        category: issueCategory,
        status: "Reported",
      },
      ...issues,
    ]);
    setIssueTitle("");
    setIssueLocation("");
    setIssueDetails("");
    alert("Your issue has been added to the demo report list.");
    setActive("Report Issue");
  }

  function submitLost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!lostName.trim() || !lostPlace.trim()) return;
    setLostItems([
      {
        item: lostName,
        place: lostPlace,
        status: lostStatus,
        date: "Just now",
      },
      ...lostItems,
    ]);
    setLostName("");
    setLostPlace("");
  }

  function submitReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setReviews([
      {
        name: reviewPlace,
        category: "Student review",
        rating: Number(reviewRating),
        comment: reviewText,
      },
      ...reviews,
    ]);
    setReviewText("");
  }

  const pageMeta: Record<Tab, string> = {
    Overview: "Your campus, connected.",
    "Campus Map": "Explore important places around your campus.",
    "Report Issue": "Help make your campus a better place.",
    "Labs & Classes": "Find available learning spaces.",
    Announcements: "Stay updated with campus notices.",
    Events: "Discover what’s happening around campus.",
    "Lost & Found": "Reconnect people with their belongings.",
    Reviews: "See what students think about campus facilities.",
    "Find Teammates": "Meet students and build something great together.",
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActive("Overview");
          }}
        >
          <div className="brand-mark">
            C<span>+</span>
          </div>
          <div>
            <strong>
              Campus<span>Connect</span>
            </strong>
            <small>YOUR CAMPUS. ONE PLACE.</small>
          </div>
        </a>

        <div className="campus-switch">
          <div className="campus-symbol">⌂</div>
          <div>
            <b>My Campus</b>
            <small>Student workspace</small>
          </div>
          <span>⌄</span>
        </div>

        <div className="nav-label">WORKSPACE</div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${active === item.name ? "active" : ""}`}
              onClick={() => setActive(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
              {item.name === "Announcements" && <i className="nav-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">✦</div>
            <b>Need a hand?</b>
            <p>Have questions about CampusConnect?</p>
            <button
              onClick={() =>
                alert("Contact your campus administrator for support.")
              }
            >
              Get support <span>↗</span>
            </button>
          </div>
          <div className="user-row">
            <div className="profile-avatar">YS</div>
            <div>
              <b>Student User</b>
              <small>Campus member</small>
            </div>
            <span>•••</span>
          </div>
        </div>
      </aside>

      <section className="main-area">
        <Header
          title={active}
          subtitle={pageMeta[active]}
          onSearch={setQuery}
          query={query}
        />

        <div className="page-content">
          {active === "Overview" && (
            <>
              <section className="welcome-banner">
                <div className="welcome-copy">
                  <div className="welcome-pill">
                    <span /> YOUR CAMPUS, IN SYNC
                  </div>
                  <h2>
                    Good morning,
                    <br />
                    <em>Student!</em> <span>✦</span>
                  </h2>
                  <p>
                    Everything happening on campus, all in one place. Stay
                    informed, get involved, and make the most of your day.
                  </p>
                  <button
                    className="primary-btn"
                    onClick={() => setActive("Events")}
                  >
                    Explore campus <span>↗</span>
                  </button>
                </div>
                <div className="banner-art" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="art-sun">✦</div>
                  <div className="art-building">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                  <div className="art-base" />
                  <div className="art-label">CAMPUS LIFE / 2026</div>
                </div>
                <div className="banner-index">
                  01 <span>/ 04</span>
                </div>
              </section>

              <div className="section-heading">
                <div>
                  <div className="eyebrow">CAMPUS AT A GLANCE</div>
                  <h2>Your campus overview</h2>
                </div>
                <span className="live-label">
                  <i /> LIVE DEMO DATA
                </span>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-top">
                    <span>Campus events</span>
                    <b className="stat-icon violet">▣</b>
                  </div>
                  <strong>12</strong>
                  <small>
                    <span className="trend">↗ 3 new</span> this month
                  </small>
                  <div className="mini-bars">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-top">
                    <span>Open issue reports</span>
                    <b className="stat-icon orange">⚑</b>
                  </div>
                  <strong>{issues.length + 7}</strong>
                  <small>
                    <span className="trend">↘ 2 resolved</span> this week
                  </small>
                  <div className="mini-bars bars-orange">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-top">
                    <span>Available spaces</span>
                    <b className="stat-icon green">▦</b>
                  </div>
                  <strong>08</strong>
                  <small>
                    <span className="trend">↗ 2 open</span> right now
                  </small>
                  <div className="mini-bars bars-green">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-top">
                    <span>Upcoming events</span>
                    <b className="stat-icon blue">◷</b>
                  </div>
                  <strong>{initialEvents.length}</strong>
                  <small>
                    Next event in <span className="trend">4 days</span>
                  </small>
                  <div className="mini-bars bars-blue">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>

              <div className="content-grid">
                <section className="panel activity-panel">
                  <div className="panel-heading">
                    <div>
                      <div className="eyebrow">WHAT&apos;S HAPPENING</div>
                      <h3>Latest announcements</h3>
                    </div>
                    <button
                      className="text-btn"
                      onClick={() => setActive("Announcements")}
                    >
                      View all ↗
                    </button>
                  </div>
                  {announcements.slice(0, 2).map((a) => (
                    <div className="announcement-row" key={a.title}>
                      <div className={`announcement-symbol ${a.color}`}>◈</div>
                      <div className="announcement-copy">
                        <div className="tag-line">
                          <span className={`tag ${a.color}`}>{a.tag}</span>
                          <small>{a.time}</small>
                        </div>
                        <b>{a.title}</b>
                        <p>{a.body}</p>
                      </div>
                    </div>
                  ))}
                </section>
                <section className="panel events-panel">
                  <div className="panel-heading">
                    <div>
                      <div className="eyebrow">SAVE THE DATE</div>
                      <h3>Upcoming events</h3>
                    </div>
                    <button
                      className="text-btn"
                      onClick={() => setActive("Events")}
                    >
                      See all ↗
                    </button>
                  </div>
                  {initialEvents.slice(0, 2).map((event, i) => (
                    <div className="event-row" key={event.title}>
                      <div className="date-tile">
                        <b>{i === 0 ? "18" : "20"}</b>
                        <small>NOV</small>
                      </div>
                      <div>
                        <b>{event.title}</b>
                        <p>
                          {event.place} · {event.type}
                        </p>
                      </div>
                      <span className="event-arrow">↗</span>
                    </div>
                  ))}
                </section>
              </div>

              <div className="quick-actions">
                <div>
                  <div className="eyebrow">MAKE IT HAPPEN</div>
                  <h3>Quick actions</h3>
                </div>
                <button onClick={() => setActive("Report Issue")}>
                  <span className="quick-icon orange">＋</span>
                  <span>
                    <b>Report an issue</b>
                    <small>Tell us what needs fixing</small>
                  </span>
                  <i>↗</i>
                </button>
                <button onClick={() => setActive("Campus Map")}>
                  <span className="quick-icon blue">⌖</span>
                  <span>
                    <b>Explore campus</b>
                    <small>Find places and facilities</small>
                  </span>
                  <i>↗</i>
                </button>
                <button onClick={() => setActive("Find Teammates")}>
                  <span className="quick-icon violet">♧</span>
                  <span>
                    <b>Find teammates</b>
                    <small>Meet your next collaborator</small>
                  </span>
                  <i>↗</i>
                </button>
              </div>
            </>
          )}

          {active === "Campus Map" && (
            <div className="two-col">
              <section className="panel map-panel">
                <div className="panel-heading">
                  <div>
                    <div className="eyebrow">CAMPUS DIRECTORY</div>
                    <h3>Explore your campus</h3>
                  </div>
                  <span className="live-label">DEMO MAP</span>
                </div>
                <div className="campus-map">
                  <div className="map-road road-a" />
                  <div className="map-road road-b" />
                  <div className="map-green green-a" />
                  <div className="map-green green-b" />
                  <div className="map-building b-one">
                    <span>⌂</span>
                    <b>Academic Block</b>
                  </div>
                  <div className="map-building b-two">
                    <span>▦</span>
                    <b>Library</b>
                  </div>
                  <div className="map-building b-three">
                    <span>♧</span>
                    <b>Canteen</b>
                  </div>
                  <div className="map-building b-four">
                    <span>⚙</span>
                    <b>Tech Block</b>
                  </div>
                  <div className="map-building b-five">
                    <span>⚽</span>
                    <b>Sports Ground</b>
                  </div>
                  <div className="map-pin">
                    ●<small>YOU ARE HERE</small>
                  </div>
                  <div className="map-compass">
                    N<br />↑
                  </div>
                </div>
                <div className="map-legend">
                  <span>
                    <i className="legend-blue" /> Academic
                  </span>
                  <span>
                    <i className="legend-green" /> Facilities
                  </span>
                  <span>
                    <i className="legend-orange" /> Sports
                  </span>
                </div>
              </section>
              <section className="panel places-panel">
                <div className="eyebrow">CAMPUS LOCATIONS</div>
                <h3>Popular places</h3>
                {[
                  ["⌂", "Academic Block", "Classes · Administration"],
                  ["▦", "Central Library", "Study · Reading"],
                  ["♧", "Central Canteen", "Food · Refreshments"],
                  ["⚙", "Technology Block", "Labs · Innovation"],
                  ["⚽", "Sports Ground", "Sports · Recreation"],
                ].map((p) => (
                  <div className="place-row" key={p[1]}>
                    <div>{p[0]}</div>
                    <span>
                      <b>{p[1]}</b>
                      <small>{p[2]}</small>
                    </span>
                    <i>↗</i>
                  </div>
                ))}
              </section>
            </div>
          )}

          {active === "Report Issue" && (
            <div className="two-col form-layout">
              <section className="panel form-panel">
                <div className="eyebrow">CAMPUS CARE</div>
                <h3>Report a campus issue</h3>
                <p className="muted">
                  Spotted something that needs attention? Let the campus team
                  know.
                </p>
                <form onSubmit={submitIssue}>
                  <label>
                    Issue title
                    <input
                      required
                      value={issueTitle}
                      onChange={(e) => setIssueTitle(e.target.value)}
                      placeholder="e.g. Projector not working"
                    />
                  </label>
                  <label>
                    Location
                    <input
                      required
                      value={issueLocation}
                      onChange={(e) => setIssueLocation(e.target.value)}
                      placeholder="e.g. Academic Block, Room 204"
                    />
                  </label>
                  <label>
                    Category
                    <select
                      value={issueCategory}
                      onChange={(e) => setIssueCategory(e.target.value)}
                    >
                      <option>Maintenance</option>
                      <option>Internet</option>
                      <option>Cleanliness</option>
                      <option>Electrical</option>
                      <option>Safety</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label>
                    Description
                    <textarea
                      value={issueDetails}
                      onChange={(e) => setIssueDetails(e.target.value)}
                      placeholder="Tell us a little more about the issue..."
                      rows={4}
                    />
                  </label>
                  <button className="primary-btn" type="submit">
                    Submit report <span>↗</span>
                  </button>
                </form>
              </section>
              <section className="panel">
                <div className="eyebrow">TRACK YOUR REPORTS</div>
                <h3>Recent issues</h3>
                {issues.map((issue, i) => (
                  <div className="issue-row" key={`${issue.title}-${i}`}>
                    <div className="issue-symbol">⚑</div>
                    <div>
                      <b>{issue.title}</b>
                      <small>
                        {issue.location} · {issue.category}
                      </small>
                    </div>
                    <Status>{issue.status}</Status>
                  </div>
                ))}
              </section>
            </div>
          )}

          {active === "Labs & Classes" && (
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <div className="eyebrow">SPACE FINDER</div>
                  <h3>Labs & classroom availability</h3>
                  <p className="muted">
                    Check demo room schedules and availability.
                  </p>
                </div>
                <select
                  className="filter-select"
                  value={roomFilter}
                  onChange={(e) => setRoomFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>Available</option>
                  <option>Occupied</option>
                </select>
              </div>
              <div className="room-grid">
                {filteredRooms.map((room) => (
                  <div className="room-card" key={room.name}>
                    <div className="room-card-top">
                      <span className="room-icon">▦</span>
                      <Status>{room.status}</Status>
                    </div>
                    <h3>{room.name}</h3>
                    <p>{room.block}</p>
                    <div className="room-meta">
                      <span>◷ {room.time}</span>
                      <span>♧ {room.seats}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="demo-note">
                Availability shown here is sample data and is not connected to
                live campus timetables.
              </p>
            </section>
          )}

          {active === "Announcements" && (
            <section className="panel">
              <div className="eyebrow">CAMPUS BULLETIN</div>
              <h3>Announcements & notices</h3>
              <p className="muted">Important updates from around campus.</p>
              {announcements.map((a) => (
                <div className="full-announcement" key={a.title}>
                  <div className={`announcement-symbol ${a.color}`}>◈</div>
                  <div>
                    <div className="tag-line">
                      <span className={`tag ${a.color}`}>{a.tag}</span>
                      <small>{a.time}</small>
                    </div>
                    <h3>{a.title}</h3>
                    <p>{a.body}</p>
                  </div>
                </div>
              ))}
            </section>
          )}

          {active === "Events" && (
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <div className="eyebrow">CAMPUS CALENDAR</div>
                  <h3>Events & opportunities</h3>
                  <p className="muted">
                    Find your next opportunity to learn, build and connect.
                  </p>
                </div>
                <select
                  className="filter-select"
                  value={eventFilter}
                  onChange={(e) => setEventFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>Hackathon</option>
                  <option>Workshop</option>
                  <option>Meetup</option>
                </select>
              </div>
              <div className="event-grid">
                {filteredEvents.map((event) => (
                  <div className="event-card" key={event.title}>
                    <div className="event-cover">
                      <span>{event.type.toUpperCase()}</span>
                      <b>✳</b>
                    </div>
                    <div className="event-card-body">
                      <small>
                        {event.date} · {event.place}
                      </small>
                      <h3>{event.title}</h3>
                      <p>{event.seats} available · Demo listing</p>
                      <button
                        className={
                          joined.includes(event.title)
                            ? "secondary-btn"
                            : "primary-btn"
                        }
                        onClick={() =>
                          setJoined(
                            joined.includes(event.title)
                              ? joined.filter((x) => x !== event.title)
                              : [...joined, event.title],
                          )
                        }
                      >
                        {joined.includes(event.title)
                          ? "Interested ✓"
                          : "I'm interested ↗"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {active === "Lost & Found" && (
            <div className="two-col">
              <section className="panel form-panel">
                <div className="eyebrow">COMMUNITY BOARD</div>
                <h3>Post a lost or found item</h3>
                <p className="muted">
                  Help belongings find their way back to their owners.
                </p>
                <form onSubmit={submitLost}>
                  <label>
                    Item name
                    <input
                      required
                      value={lostName}
                      onChange={(e) => setLostName(e.target.value)}
                      placeholder="e.g. Black backpack"
                    />
                  </label>
                  <label>
                    Last seen / found at
                    <input
                      required
                      value={lostPlace}
                      onChange={(e) => setLostPlace(e.target.value)}
                      placeholder="e.g. Library entrance"
                    />
                  </label>
                  <label>
                    Post type
                    <select
                      value={lostStatus}
                      onChange={(e) => setLostStatus(e.target.value)}
                    >
                      <option>Lost</option>
                      <option>Found</option>
                    </select>
                  </label>
                  <button className="primary-btn">Publish post ↗</button>
                </form>
              </section>
              <section className="panel">
                <div className="eyebrow">COMMUNITY LISTINGS</div>
                <h3>Recent posts</h3>
                {lostItems.map((item, i) => (
                  <div className="lost-row" key={`${item.item}-${i}`}>
                    <div className="lost-icon">⌕</div>
                    <div>
                      <b>{item.item}</b>
                      <small>
                        {item.place} · {item.date}
                      </small>
                    </div>
                    <Status>{item.status}</Status>
                  </div>
                ))}
              </section>
            </div>
          )}

          {active === "Reviews" && (
            <div className="two-col">
              <section className="panel form-panel">
                <div className="eyebrow">STUDENT VOICES</div>
                <h3>Share a review</h3>
                <p className="muted">
                  Your feedback helps other students discover campus facilities.
                </p>
                <form onSubmit={submitReview}>
                  <label>
                    Facility
                    <select
                      value={reviewPlace}
                      onChange={(e) => setReviewPlace(e.target.value)}
                    >
                      <option>Central Canteen</option>
                      <option>Central Library</option>
                      <option>Sports Complex</option>
                      <option>Computer Labs</option>
                      <option>Hostel Facilities</option>
                    </select>
                  </label>
                  <label>
                    Rating
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(e.target.value)}
                    >
                      <option value="5">★★★★★ · Excellent</option>
                      <option value="4">★★★★ · Good</option>
                      <option value="3">★★★ · Average</option>
                      <option value="2">★★ · Needs improvement</option>
                      <option value="1">★ · Poor</option>
                    </select>
                  </label>
                  <label>
                    Your review
                    <textarea
                      required
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience..."
                    />
                  </label>
                  <button className="primary-btn">Post review ↗</button>
                </form>
              </section>
              <section className="panel">
                <div className="eyebrow">CAMPUS FEEDBACK</div>
                <h3>Student reviews</h3>
                {reviews.map((r, i) => (
                  <div className="review-row" key={`${r.name}-${i}`}>
                    <div className="review-stars">
                      {"★".repeat(Math.round(r.rating))}
                      <span>{"★".repeat(5 - Math.round(r.rating))}</span>
                      <b>{r.rating.toFixed(1)}</b>
                    </div>
                    <b>{r.name}</b>
                    <small>{r.category}</small>
                    <p>{r.comment}</p>
                  </div>
                ))}
              </section>
            </div>
          )}

          {active === "Find Teammates" && (
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <div className="eyebrow">BUILD TOGETHER</div>
                  <h3>Find your people</h3>
                  <p className="muted">
                    Connect with students who share your interests and skills.
                  </p>
                </div>
                <span className="live-label">STUDENT COMMUNITY</span>
              </div>
              <div className="people-grid">
                {filteredPeople.map((person) => (
                  <div className="person-card" key={person.name}>
                    <div className="person-top">
                      <div className="person-avatar">{person.initials}</div>
                      <span className="person-online">● OPEN TO CONNECT</span>
                    </div>
                    <h3>{person.name}</h3>
                    <small>{person.year}</small>
                    <div className="skill-pill">{person.skill}</div>
                    <p>{person.looking}</p>
                    <button
                      className={
                        connected.includes(person.name)
                          ? "secondary-btn"
                          : "primary-btn"
                      }
                      onClick={() =>
                        setConnected(
                          connected.includes(person.name)
                            ? connected.filter((x) => x !== person.name)
                            : [...connected, person.name],
                        )
                      }
                    >
                      {connected.includes(person.name)
                        ? "Request sent ✓"
                        : "Connect ↗"}
                    </button>
                  </div>
                ))}
              </div>
              <p className="demo-note">
                Profiles and connection actions are demo-only. No real messages
                or requests are sent.
              </p>
            </section>
          )}
          <footer className="footer">
            <span>© 2026 CampusConnect</span>
            <span>
              MADE FOR CAMPUS LIFE <b>✦</b>
            </span>
            <span>Demo experience · Sample data</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
