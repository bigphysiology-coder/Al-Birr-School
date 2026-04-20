const { useState, useEffect } = React;

// =============================================
//  DATA
// =============================================

const pages = ["Home", "About", "Programs", "News", "Staff", "Contact"];


const programs = [
  { icon: "🎨", name: "Nursery School", desc: "Literacy (English/Letter work), Numeracy (Number work), Science and Health habits, Cultural and Creative Arts, Social habits, Rhymes/Poems, and Practical Life skills (fine motor development).", tag: "Ages 2–5" },
  { icon: "📚", name: "Primary School", desc: "English Studies, Mathematics, One Nigerian Language (Yoruba), Basic Science & Technology, Physical & Health Education, Civic/Social Studies, Cultural & Creative Arts (CCA), IRS, Basic Digital Literacy, Pre-vocational Studies (Agricultural Science/Home Economics), and Qur'an Memorization", tag: "Ages 6–12" },
  { icon: "🔬", name: "Secondary School", desc: "English, Mathematics, Nigerian Languages, Basic Science, Physical/Health Education, Digital Technology, Social Studies, Business Studies, Creative/Cultural Arts, and Qur'an Memorization.", tag: "Ages 13–15" },
];


const avatarColors = [
  "#1e3a8a", "#166534", "#7c2d12", "#4a1d96",
  "#1e40af", "#065f46", "#9a3412", "#581c87",
];

// const quickLinks = [
//   { icon: "📋", label: "Apply Online",    sub: "Enrollment 2026–27" },
//   { icon: "📅", label: "School Calendar", sub: "Dates & holidays" },
//   { icon: "🍽️", label: "Lunch Menu",     sub: "Weekly menus" },
//   { icon: "🚌", label: "Transportation",  sub: "Bus routes & schedules" },
// ];

// const accreditations = [
//   "🏅 National Blue Ribbon School",
//   "⭐ Top 1% in State Rankings",
//   "🎓 AP Capstone Program",
//   "🔬 STEM Certified School",
//   "🌍 IB World School Candidate",
// ];

const coreValues = [
  { title: "Academic Rigor",  desc: "High standards, critical thinking, and a love for learning." },
  { title: "Islamic Teachings",     desc: "Strong Tahfeedh/Qur'an Memorization Sessions." },
];

const contactDetails = [
  { icon: "📍", title: "Address",      text: "Al-Birr Estate\nOwode Ilesa Road, Osogbo, Osun State" },
  { icon: "📞", title: "Phone",        text: "+2348012345678\nMon–Fri, 7:30am–3:30pm" },
  { icon: "✉️", title: "Email",        text: "info@albirr.sch.ng\nAdmissions: admissions@albirr.sch.ng" },
  { icon: "🕐", title: "Office Hours", text: "Monday–Friday: 7:30am–4:30pm\nSaturday: 9am–6pm (Madrasah)" },
];

const footerCols = [
  {
    title: "Quick Links",
    links: [
      { label: "Home",             page: "Home"     },
      { label: "About Us",         page: "About"    },
      { label: "Academic Programs",page: "Programs" },
      { label: "News & Events",    page: "News"     },
      { label: "Our Staff",        page: "Staff"    },
      { label: "Contact Us",       page: "Contact"  },
    ],
  },
  {
    title: "Academics",
    links: [
      { label: "Nursery School",   page: "Programs" },
      { label: "Primary School",   page: "Programs" },
      { label: "Secondary School", page: "Programs" },
      { label: "Qur'an Memorization", page: "Programs" },
    ],
  },
  {
    title: "Get In Touch",
    links: [
      { label: "Enroll My Child",  page: "Contact"  },
      { label: "Send a Message",   page: "Contact"  },
      { label: "Meet the Staff",   page: "Staff"    },
      { label: "Latest News",      page: "News"     },
    ],
  },
];

const socials = ["📘", "📸", "🐦", "▶️"];


// =============================================
//  SHARED COMPONENTS
// =============================================

function AlertBanner({ onNav }) {
  return (
    <div className="alert-banner">
      🎓 Enrollment open for 2026–2027 school year —{" "}
      <span
        style={{ textDecoration: "underline", cursor: "pointer" }}
        onClick={() => onNav("Contact")}
      >
        Apply Now
      </span>
    </div>
  );
}

function NavBar({ page, onNav, isAdmin, onAdminClick, logo, whatsapp }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => { onNav("Home"); setMenuOpen(false); }}>
          <div className="nav-logo-icon" style={{ background: "#00b7ff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {logo ? <img src={logo} alt="School Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "🦅"}
          </div>
          <div className="nav-logo-text">
            <h1>AL-BIRR ISLAMIC MODEL SCHOOL</h1>
            <p>For Righteousness and Piety</p>
          </div>
        </div>

        <div className="nav-links">
          {pages.map((p) => (
            <button
              key={p}
              className={`nav-link${page === p ? " active" : ""}`}
              onClick={() => onNav(p)}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Hamburger button - mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`ham-line ${menuOpen ? "open" : ""}`}></span>
          <span className={`ham-line ${menuOpen ? "open" : ""}`}></span>
          <span className={`ham-line ${menuOpen ? "open" : ""}`}></span>
        </button>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button
            className="nav-cta desktop-only"
            onClick={() => {
              const phone = whatsapp?.phone || "2348012345678";
              const message = encodeURIComponent(whatsapp?.message || "Hello! I want to enroll my child.");
              window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
            }}
          >
            Enroll Now
          </button>
          <button
            className="desktop-only"
            onClick={onAdminClick}
            style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.3)",
              color: "rgba(255,255,255,0.7)", padding: "0.5rem 1rem",
              borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem",
              fontFamily: "'Source Sans 3', sans-serif", transition: "all 0.2s",
            }}
          >
            {isAdmin ? "⚙️ Dashboard" : "🔒 Admin"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {pages.map((p) => (
            <button
              key={p}
              className={`mobile-link${page === p ? " active" : ""}`}
              onClick={() => { onNav(p); setMenuOpen(false); }}
            >
              {p}
            </button>
          ))}
          <button
            className="mobile-link"
            onClick={() => { onAdminClick(); setMenuOpen(false); }}
          >
            🔒 Admin
          </button>
          <button
            className="btn-primary mobile-enroll"
            onClick={() => {
              const phone = whatsapp?.phone || "2348012345678";
              const message = encodeURIComponent(whatsapp?.message || "Hello! I want to enroll my child.");
              window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
              setMenuOpen(false);
            }}
          >
            Enroll Now
          </button>
        </div>
      )}
    </nav>
  );
}

function Footer({ onNav, logo }) {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ width: "2.5rem", height: "2.5rem", background: "#00b7ff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                {logo ? <img src={logo} alt="School Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "🦅"}
              </div>
              <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>Al-Birr Islamic Model School</h2>
            </div>
            <p style={{ color: "#00b7ff", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase" }}>
              For Righteousness and Piety
            </p>
            <p>
              Inspiring generations of students to think boldly, lead with
              integrity, and achieve beyond what they imagined possible.
            </p>
          </div>

          {footerCols.map((col, i) => (
            <div className="footer-col" key={i}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l, j) => (
                  <li key={j} onClick={() => onNav(l.page)}>
                    {l.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© 2026 Al-Birr Islamic Model School. All rights reserved.</p>
          <div className="footer-socials">
            {socials.map((s, i) => (
              <div key={i} className="social-btn">{s}</div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// =============================================
//  PAGE: HOME
// =============================================

function HomePage({ onNav, newsItems, events }) {
  return (
    <div className="fade-in">

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-shapes">
          <div className="hero-circle" style={{ width: 600, height: 600, top: -200, right: -200 }} />
          <div className="hero-circle" style={{ width: 300, height: 300, bottom: -100, left: 100 }} />
        </div>

        <div className="hero-inner">
          <div>
            <div className="hero-badge">⭐ Islamic Private School</div>
            <h1 className="hero-title">
              Where <span>Excellence</span><br />Meets Opportunity
            </h1>
            <p className="hero-subtitle">
              Al-Birr Nursery & Primary School has inspired generations of students to think
              boldly, lead with integrity, and achieve more than they imagined
              possible.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => onNav("Programs")}>Explore Programs</button>
              <button className="btn-secondary" onClick={() => onNav("About")}>Our Story →</button>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-num">10+</div>
                <div className="hero-stat-label">Years</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">120+</div>
                <div className="hero-stat-label">Students</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">100%</div>
                <div className="hero-stat-label">Quality Education</div>
              </div>
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="hero-card slide-in">
            <div className="hero-card-header">
              <span>📅</span>
              <h3>Upcoming Events</h3>
            </div>
            <div className="event-list">
             {events.map((e, i) => {
                const dateObj = new Date(e.event_date);
                const day     = dateObj.getUTCDate();
                const month   = dateObj.toLocaleString("default", { month: "short", timeZone: "UTC" });

                return (
                  <div className="event-item" key={i}>
                    <div className="event-date">
                      <div className="event-date-num">{day}</div>
                      <div className="event-date-mon">{month}</div>
                    </div>
                    <div className="event-info">
                      <h4>{e.title}</h4>
                      <p>{e.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links
      <section className="section" style={{ background: "white", padding: "2.5rem 2rem" }}>
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {quickLinks.map((q, i) => (
              <div
                key={i}
                onClick={() => onNav("Contact")}
                style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  padding: "1.2rem", background: "#F3F4F6", borderRadius: "12px",
                  cursor: "pointer", transition: "all 0.2s", border: "2px solid transparent",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#00b7ff"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
              >
                <span style={{ fontSize: "2rem" }}>{q.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#0B1F4B", fontSize: "0.95rem" }}>{q.label}</div>
                  <div style={{ color: "#6B7280", fontSize: "0.8rem" }}>{q.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Programs Preview */}
      <section className="section programs-bg">
        <div className="section-inner">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p className="section-label" style={{ color: "#00b7ff" }}>What We Offer</p>
              <h2 className="section-title" style={{ color: "white" }}>Our Academic Programs</h2>
            </div>
            <button className="btn-secondary" onClick={() => onNav("Programs")}>View All →</button>
          </div>
          <div className="programs-grid">
            {programs.slice(0, 3).map((p, i) => (
              <div className="program-card" key={i}>
                <div className="program-icon">{p.icon}</div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <span className="program-tag">{p.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="section">
        <div className="section-inner">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
            <div>
              <p className="section-label">Latest</p>
              <h2 className="section-title">School News</h2>
            </div>
            <button className="btn-primary" onClick={() => onNav("News")} style={{ background: "#0B1F4B", color: "white" }}>
              All News →
            </button>
          </div>
          <div className="news-grid">
            <div className="news-featured" onClick={() => onNav("News")}>
              <div className="news-featured-img">🏆</div>
              <div className="news-featured-body">
                <span className="news-cat">{newsItems.length > 0 ? newsItems[0].cat : "News"}</span>
                <h3>{newsItems.length > 0 ? newsItems[0].title : "Latest News"}</h3>
                <p>{newsItems.length > 0 ? newsItems[0].desc : "Stay updated with school announcements and events."}</p>
                <p className="news-date">{newsItems.length > 0 ? newsItems[0].date : "Soon"}</p>
              </div>
            </div>
            <div className="news-list">
              {newsItems.slice(1, 4).map((n, i) => (
                <div className="news-item" key={i} onClick={() => onNav("News")}>
                  <span className="news-item-icon">{n.icon}</span>
                  <div>
                    <h4>{n.title}</h4>
                    <p>{n.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// =============================================
//  PAGE: ABOUT
// =============================================

function AboutPage({ whatsapp }) {
  return (
    <div className="fade-in">
      <section className="section">
        <div className="section-inner">
          <p className="section-label">Who We Are</p>
          <h2 className="section-title">A Legacy of Excellence</h2>
          <p className="section-subtitle">
            Founded in 2016, Al-Birr Islamic Model School has grown into one of the
            region's respected schools, combining rigorous academics with
            a deep commitment to Islamic education and values.
          </p>

          <div className="about-grid">
            <div className="about-img-wrap">
              <div className="about-img">
                🏫
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(11,31,75,0.6), rgba(37,99,235,0.4))" }} />
              </div>
              <div className="about-img-badge">
                <span className="num">10</span>
                <span className="txt">Years Strong</span>
              </div>
            </div>

            <div>
              <p className="section-label">Our Mission</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#0B1F4B", marginBottom: "1rem" }}>
                Empowering Every Student to Thrive
              </h3>
              <p style={{ color: "#6B7280", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                We believe every child deserves an education that challenges them
                academically, supports them spiritually, and prepares them fully for
                the world ahead. Our faculty of dedicated educators brings passion,
                expertise, and care to every classroom.
              </p>
              <p style={{ color: "#6B7280", lineHeight: 1.8, marginBottom: "2rem" }}>
                From kindergarten through grade 9, we offer a continuum of
                learning that grows with each student — building not just
                knowledge, but righteousness and piety that lasts a lifetime.
              </p>

              <div className="about-values">
                {coreValues.map((v, i) => (
                  <div className="value-card" key={i}>
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Join Our School */}
      <section className="join-section">
        <div className="join-glow join-glow--tl" />
        <div className="join-glow join-glow--br" />
        <div className="join-content">
          <div className="join-badge">✨ Admissions Open 2026–2027</div>
          <h2 className="join-heading">Ready to Join Our School?</h2>
          <p className="join-subtext">
            Start your child's educational journey with us today — where excellence meets righteousness.
          </p>
          <button
            className="join-btn"
            onClick={() => {
              const phone = whatsapp?.phone || "2348012345678";
              const message = encodeURIComponent(whatsapp?.message || "Hello! I am interested in enrolling my child at Al-Birr Islamic Model School.");
              window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.962-1.417A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.049-1.107l-.29-.173-3.004.858.859-3.088-.19-.3A7.96 7.96 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" fill="currentColor"/>
            </svg>
            Apply Now via WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}

// =============================================
//  PAGE: PROGRAMS
// =============================================

function ProgramsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Nursery School", "Primary School", "Secondary School"];

  const tabMap = {
    "Nursery School":       ["Nursery School"],
    "Primary School":       ["Primary School"],
    "Secondary School":  ["Secondary School"],
  };

  const filteredPrograms = activeTab === "All"
    ? programs
    : programs.filter(p => tabMap[activeTab].includes(p.name));

  return (
    <div className="fade-in">
      <section className="section programs-bg" style={{ paddingBottom: "3rem" }}>
        <div className="section-inner">
          <p className="section-label" style={{ color: "#00b7ff" }}>Curriculum</p>
          <h2 className="section-title" style={{ color: "white" }}>Academic Programs</h2>
          <p className="section-subtitle" style={{ color: "rgba(255,255,255,0.65)" }}>
            Comprehensive, challenging, and designed to unlock every student's potential.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="section-inner">
          <div className="tabs">
            {tabs.map((t) => (
              <button
                key={t}
                className={`tab${activeTab === t ? " active" : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Program count */}
          <p style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            Showing <strong>{filteredPrograms.length}</strong> of {programs.length} programs
          </p>

          {filteredPrograms.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem", color: "#6B7280" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
              <p>No programs found for this category.</p>
            </div>
          ) : (
            <div className="programs-grid">
              {filteredPrograms.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: "white", borderRadius: "16px", padding: "2rem",
                    border: "2px solid #e5e7eb", transition: "all 0.3s",
                    cursor: "default", animation: "fadeIn 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#00b7ff";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{p.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#0B1F4B", marginBottom: "0.75rem" }}>{p.name}</h3>
                  <p style={{ color: "#6B7280", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.2rem" }}>{p.desc}</p>
                  <span style={{ display: "inline-block", background: "#E8EEF9", color: "#0B1F4B", borderRadius: "20px", padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontWeight: 700 }}>{p.tag}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// =============================================
//  PAGE: NEWS
// =============================================

function NewsPage({ newsItems, events }) {
  return (
    <div className="fade-in">
      <section className="section">
        <div className="section-inner">
          <p className="section-label">What is Happening?</p>
          <h2 className="section-title">School News & Announcements</h2>

          <div className="news-grid" style={{ marginTop: "2.5rem" }}>
            {newsItems.length > 0 && (
              <>
                <div className="news-featured">
                  <div className="news-featured-img">🏆</div>
                  <div className="news-featured-body">
                    <span className="news-cat">{newsItems[0].cat}</span>
                    <h3>{newsItems[0].title}</h3>
                    <p>{newsItems[0].description}</p>
                    <p className="news-date">{newsItems[0].date}</p>
                  </div>
                </div>

                <div className="news-list">
                  {newsItems.slice(1).map((n, i) => (
                    <div className="news-item" key={i}>
                      <span className="news-item-icon">{n.icon}</span>
                      <div>
                        <h4>{n.title}</h4>
                        <p style={{ color: "#00b7ff", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>{n.cat}</p>
                        <p style={{ color: "#6B7280", fontSize: "0.8rem", marginTop: "0.2rem" }}>{n.description}</p>
                        <p style={{ color: "#6B7280", fontSize: "0.75rem", marginTop: "0.4rem" }}>{n.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {newsItems.length === 0 && (
              <div style={{ textAlign: "center", padding: "4rem", color: "#6B7280" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📰</div>
                <p>No news available at the moment.</p>
              </div>
            )}
          </div>

            {/* Calendar */}
            <div style={{ marginTop: "4rem" }}>
              <p className="section-label">On The Calendar</p>
              <h2 className="section-title" style={{ marginBottom: "2rem" }}>Upcoming Events</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                
                {events.length === 0 ? (
                  <p style={{ color: "#6B7280" }}>No events found.</p>
                ) : (
                  events.map((e, i) => {
                    // Fix date formatting
                    const rawDate = e.event_date;
                    const dateObj = new Date(rawDate);
                    const day     = dateObj.getUTCDate();
                    const month   = dateObj.toLocaleString("default", { month: "short", timeZone: "UTC" });

                    return (
                      <div key={i} style={{
                        display: "flex", gap: "1.5rem", alignItems: "center",
                        background: "white", border: "2px solid #e5e7eb",
                        borderRadius: "12px", padding: "1.2rem 1.5rem",
                      }}>
                        <div style={{
                          background: "#0B1F4B", color: "#00b7ff", borderRadius: "10px",
                          padding: "0.6rem 1rem", textAlign: "center", minWidth: "60px",
                        }}>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 900, lineHeight: 1 }}>
                            {day}
                          </div>
                          <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                            {month}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: "#0B1F4B" }}>{e.title}</div>
                          <div style={{ color: "#6B7280", fontSize: "0.85rem" }}>{e.description}</div>
                        </div>
                      </div>
                    );
                  })
                )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// =============================================
//  PAGE: STAFF
// =============================================

function StaffPage({ onNav, staff }) {
  return (
    <div className="fade-in">
      <section className="section">
        <div className="section-inner">
          <p className="section-label">Our People</p>
          <h2 className="section-title">Meet the Team</h2>
          <p className="section-subtitle">
            Passionate educators committed to every student's success —
            inside the classroom and beyond.
          </p>

          <div className="staff-grid">
            {staff.map((s, i) => (
              <div className="staff-card" key={i}>
                <div
                  className="staff-avatar"
                  style={{
                    background: avatarColors[i % avatarColors.length],
                    overflow: "hidden",
                    padding: 0,
                  }}
                >
                  {s.photo ? (
                    <img
                      src={`http://localhost:5000${s.photo}`}
                      alt={s.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    s.emoji || "👤"
                  )}
                </div>
                <h3>{s.name}</h3>
                <p>{s.role}</p>
                <small>{s.bio}</small>
              </div>
            ))}
          </div>

          {/* Join CTA */}
          <div style={{
            background: "#0B1F4B", borderRadius: "20px",
            padding: "3rem", textAlign: "center", marginTop: "4rem",
          }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "2rem", marginBottom: "1rem" }}>
              Join Our Team
            </h3>
            <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "2rem", maxWidth: 500, margin: "0 auto 2rem" }}>
              We're always looking for passionate, dedicated educators who share
              our commitment to student success.
            </p>
            <button className="btn-primary" onClick={() => onNav("Contact")}>
              Send Us A Message
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// =============================================
//  PAGE: CONTACT
// =============================================

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: ""
  });
  const [showToast, setShowToast]   = useState(false);
  const [toastMsg, setToastMsg]     = useState("");
  const [toastType, setToastType]   = useState("success");
  const [loading, setLoading]       = useState(false);

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setToastMsg("❌ Please fill in all fields.");
      setToastType("error");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setToastMsg("✅ Message sent! We'll be in touch soon.");
        setToastType("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setToastMsg("❌ Failed to send. Please try again.");
        setToastType("error");
      }

    } catch (error) {
      setToastMsg("❌ Server error. Make sure backend is running.");
      setToastType("error");
    }

    setLoading(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="fade-in">
      <section className="section contact-bg">
        <div className="section-inner">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Contact Al-Birr Islamic Model School</h2>
          <p className="section-subtitle">
            We'd love to hear from you — whether you're a prospective family,
            current student, or community partner.
          </p>

          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              {contactDetails.map((c, i) => (
                <div className="contact-item" key={i}>
                  <div className="contact-icon">{c.icon}</div>
                  <div>
                    <h4>{c.title}</h4>
                    <p style={{ whiteSpace: "pre-line" }}>{c.text}</p>
                  </div>
                </div>
              ))}

              {/* Google Maps Embed */}
              <div style={{ borderRadius: "16px", overflow: "hidden", height: "280px", border: "3px solid #0B1F4B" }}>
                <iframe
                  title="School Location"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d126497.66962396522!2d4.480299572239763!3d7.7842931390885095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1775946434523!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h3>Send Us a Message</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Yusuf Afolabi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="afolabi@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="">Select a topic...</option>
                  <option>Admissions Inquiry</option>
                  <option>Academic Programs</option>
                  <option>Tahfeedh</option>
                  <option>Employment</option>
                  <option>General Question</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                className="btn-primary"
                style={{ width: "100%", opacity: loading ? 0.7 : 1 }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {showToast && (
        <div className="success-toast" style={{
          background: toastType === "success" ? "#10b981" : "#ef4444"
        }}>
          {toastMsg}
        </div>
      )}
    </div>
  );
}

// =============================================
//  ADMIN LOGIN PAGE
// =============================================

function AdminLoginPage({ onLogin , logo }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success) {
        onLogin(data.token);
      } else {
        setError(data.message || "Invalid credentials.");
      }

    } catch (err) {
      setError("Server error. Make sure backend is running.");
    }

    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0B1F4B",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{
        background: "white", borderRadius: "20px", padding: "3rem",
        width: "100%", maxWidth: "420px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "70px", height: "70px", background: "#00b7ff",
            borderRadius: "16px", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "2rem", margin: "0 auto 1rem",
            overflow: "hidden",
          }}>
            {logo
              ? <img src={logo} alt="School Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span>🦅</span>
            }
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.8rem", color: "#0B1F4B", marginBottom: "0.5rem",
          }}>
            Admin Login
          </h2>
          <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>
            Al-Birr Islamic Model School
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca",
            borderRadius: "8px", padding: "0.75rem 1rem",
            color: "#dc2626", fontSize: "0.85rem", marginBottom: "1.5rem",
          }}>
            ❌ {error}
          </div>
        )}

        {/* Form */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        <button
          className="btn-primary"
          style={{ width: "100%", marginTop: "0.5rem", opacity: loading ? 0.7 : 1 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login →"}
        </button>

        <p style={{ textAlign: "center", color: "#6B7280", fontSize: "0.8rem", marginTop: "1.5rem" }}>
          🔒 Secure admin access only
        </p>
      </div>
    </div>
  );
}

// =============================================
//  ADMIN DASHBOARD
// =============================================
function AdminDashboard({ token, onLogout, adminPage, setAdminPage, newsItems, events, staff, setNews, setEvents, setStaff, logo, setLogo, whatsapp, setWhatsapp })  {

  // ── Shared fetch helper ──
  const authFetch = (url, options = {}) => {
  const isFormData = options.body instanceof FormData;
  return fetch(url, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
};

  // ── Edit states ──
  const [editingNews, setEditingNews] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  // ── News form state ──
  const [newsForm, setNewsForm] = useState({
    title: "", category: "Announcement", description: "", icon: "📰"
  });

  // ── Event form state ──
  const [eventForm, setEventForm] = useState({
    title: "", description: "", event_date: ""
  });

  // ── Staff form state ──
  const [staffForm, setStaffForm] = useState({
    name: "", role: "", bio: "", photo: null, photoPreview: null
  });

  // ── Contacts & Enrollments ──
  const [contacts,    setContacts]    = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  // ── Toast ──
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };
  
  // ── WhatsApp Settings State ──
  const [waForm, setWaForm] = useState({
    phone:   whatsapp?.phone   || "2348012345678",
    message: whatsapp?.message || "Hello! I am interested in enrolling my child at Al-Birr Islamic Model School.",
  });

  const handleUpdateWhatsapp = async () => {
    if (!waForm.phone || !waForm.message) {
      showToast("❌ Phone and message are required.", "error"); return;
    }
    try {
      const res = await authFetch("http://localhost:5000/api/whatsapp", {
        method: "PUT",
        body: JSON.stringify(waForm),
      });
      const data = await res.json();
      if (data.success) {
        setWhatsapp(data.data);
        showToast("✅ WhatsApp settings updated!");
      } else {
        showToast("❌ " + (data.message || "Failed to update."), "error");
      }
    } catch (err) {
      showToast("❌ Server error. Check backend is running.", "error");
    }
  };

  // ── Delete Contact ──
const handleDeleteContact = async (id) => {
  if (!window.confirm("Delete this message? This cannot be undone.")) return;
  try {
    const res  = await authFetch(`http://localhost:5000/api/contacts/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      setContacts(prev => prev.filter(c => c.id !== id));
      showToast("✅ Message deleted.");
    } else {
      showToast("❌ Failed to delete message.", "error");
    }
  } catch (err) {
    showToast("❌ Server error. Check backend is running.", "error");
  }
};

  // ── Fetch contacts & enrollments ──
  useEffect(() => {
    if (adminPage === "contacts") {
      authFetch("http://localhost:5000/api/contacts")
        .then(r => r.json())
        .then(d => { if (d.success) setContacts(d.data); });
    }
    if (adminPage === "enrollments") {
      authFetch("http://localhost:5000/api/enrollments")
        .then(r => r.json())
        .then(d => { if (d.success) setEnrollments(d.data); });
    }
  }, [adminPage]);

  // ── Add News ──
  const handleAddNews = async () => {
  if (!newsForm.title || !newsForm.description) {
    showToast("❌ Title and description are required.", "error"); return;
  }
  try {
    const res = await authFetch("http://localhost:5000/api/news", {
      method: "POST",
      body: JSON.stringify(newsForm),
    });
    const data = await res.json();
    if (data.success) {
      setNews(prev => [data.data, ...prev]);
      setNewsForm({ title: "", category: "Announcement", description: "", icon: "📰" });
      showToast("✅ News added successfully!");
    } else {
      showToast("❌ " + (data.message || "Failed to add news."), "error");
    }
  } catch (err) {
    showToast("❌ Server error. Check backend is running.", "error");
  }
};

  // ── Delete News ──
  const handleDeleteNews = async (id) => {
    const res = await authFetch(`http://localhost:5000/api/news/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      setNews(prev => prev.filter(n => n.id !== id));
      showToast("✅ News deleted.");
    } else {
      showToast("❌ Failed to delete news.", "error");
    }
  };

  // ── Add Event ──
  const handleAddEvent = async () => {
  if (!eventForm.title || !eventForm.description || !eventForm.event_date) {
    showToast("❌ All fields are required.", "error"); return;
  }
  try {
    const res = await authFetch("http://localhost:5000/api/events", {
      method: "POST",
      body: JSON.stringify(eventForm),
    });
    const data = await res.json();
    if (data.success) {
      setEvents(prev => [...prev, data.data]);
      setEventForm({ title: "", description: "", event_date: "" });
      showToast("✅ Event added successfully!");
    } else {
      showToast("❌ " + (data.message || "Failed to add event."), "error");
    }
  } catch (err) {
    showToast("❌ Server error. Check backend is running.", "error");
  }
};

  // ── Delete Event ──
  const handleDeleteEvent = async (id) => {
    const res  = await authFetch(`http://localhost:5000/api/events/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      setEvents(prev => prev.filter(e => e.id !== id));
      showToast("✅ Event deleted.");
    } else {
      showToast("❌ Failed to delete event.", "error");
    }
  };

  // ── Add Staff ──
  const handleAddStaff = async () => {
  if (!staffForm.name || !staffForm.role) {
    showToast("❌ Name and role are required.", "error"); return;
  }
  try {
    const formData = new FormData();
    formData.append("name", staffForm.name);
    formData.append("role", staffForm.role);
    formData.append("bio", staffForm.bio || "");
    if (staffForm.photo) formData.append("photo", staffForm.photo);

    const res = await authFetch("http://localhost:5000/api/staff", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      setStaff(prev => [...prev, data.data]);
      setStaffForm({ name: "", role: "", bio: "", photo: null, photoPreview: null });
      showToast("✅ Staff added successfully!");
    } else {
      showToast("❌ " + (data.message || "Failed to add staff."), "error");
    }
  } catch (err) {
    showToast("❌ Server error. Check backend is running.", "error");
  }
};

  // ── Delete Staff ──
  const handleDeleteStaff = async (id) => {
    const res  = await authFetch(`http://localhost:5000/api/staff/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      setStaff(prev => prev.filter(s => s.id !== id));
      showToast("✅ Staff deleted.");
    } else {
      showToast("❌ Failed to delete staff.", "error");
    }
  };

  // ── Edit News ──
  const handleEditNews = (n) => {
    setEditingNews(n);
    setNewsForm({ title: n.title, category: n.category, description: n.description, icon: n.icon });
  };

  const handleUpdateNews = async () => {
  if (!newsForm.title || !newsForm.description) {
    showToast("❌ Title and description are required.", "error"); return;
  }
  try {
    const res = await authFetch(`http://localhost:5000/api/news/${editingNews.id}`, {
      method: "PUT",
      body: JSON.stringify(newsForm),
    });
    const data = await res.json();
    if (data.success) {
      setNews(prev => prev.map(n => n.id === editingNews.id ? data.data : n));
      setEditingNews(null);
      setNewsForm({ title: "", category: "Announcement", description: "", icon: "📰" });
      showToast("✅ News updated successfully!");
    } else {
      showToast("❌ " + (data.message || "Failed to update news."), "error");
    }
  } catch (err) {
    showToast("❌ Server error. Check backend is running.", "error");
  }
};

  // ── Edit Event ──
  const handleEditEvent = (e) => {
    setEditingEvent(e);
    setEventForm({ title: e.title, description: e.description, event_date: e.event_date.split('T')[0] });
  };

  const handleUpdateEvent = async () => {
  if (!eventForm.title || !eventForm.description || !eventForm.event_date) {
    showToast("❌ All fields are required.", "error"); return;
  }
  try {
    const res = await authFetch(`http://localhost:5000/api/events/${editingEvent.id}`, {
      method: "PUT",
      body: JSON.stringify(eventForm),
    });
    const data = await res.json();
    if (data.success) {
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? data.data : e));
      setEditingEvent(null);
      setEventForm({ title: "", description: "", event_date: "" });
      showToast("✅ Event updated successfully!");
    } else {
      showToast("❌ " + (data.message || "Failed to update event."), "error");
    }
  } catch (err) {
    showToast("❌ Server error. Check backend is running.", "error");
  }
};

  // ── Edit Staff ──
  const handleEditStaff = (s) => {
    setEditingStaff(s);
    setStaffForm({ name: s.name, role: s.role, bio: s.bio, photo: null, photoPreview: s.photo });
  };

  const handleUpdateStaff = async () => {
    if (!staffForm.name || !staffForm.role) {
      showToast("❌ Name and role are required.", "error"); return;
    }
    const formData = new FormData();
    formData.append("name", staffForm.name);
    formData.append("role", staffForm.role);
    formData.append("bio", staffForm.bio);
    if (staffForm.photo) formData.append("photo", staffForm.photo);

    const res = await authFetch(`http://localhost:5000/api/staff/${editingStaff.id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      setStaff(prev => prev.map(s => s.id === editingStaff.id ? data.data : s));
      setEditingStaff(null);
      setStaffForm({ name: "", role: "", bio: "", photo: null, photoPreview: null });
      showToast("✅ Staff updated successfully!");
    } else {
      showToast("❌ Failed to update staff.", "error");
    }
  };

  // ── Logo Upload ──
  const handleLogoUpload = async () => {
    if (!logoFile) {
      showToast("❌ Please select a logo file.", "error");
      return;
    }
    const formData = new FormData();
    formData.append("logo", logoFile);

    try {
      const res = await authFetch("http://localhost:5000/api/logo", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setLogoFile(null);
        showToast("✅ Logo uploaded successfully!");

        // Force update all favicon elements
        const logoUrl = "http://localhost:5000/uploads/logo.png?t=" + Date.now();

        // Update logo state so all components refresh
        setLogo(logoUrl);

        // Remove all old favicon links
        document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(link => {
          link.remove();
        });

        // Create new favicon link with image/png type
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        favicon.href = logoUrl;
        document.head.appendChild(favicon);

        // Create apple-touch-icon for iOS
        const appleTouchIcon = document.createElement('link');
        appleTouchIcon.rel = 'apple-touch-icon';
        appleTouchIcon.type = 'image/png';
        appleTouchIcon.href = logoUrl;
        document.head.appendChild(appleTouchIcon);

        // Force chrome to refresh favicon
        window.location.reload();

        console.log("✅ Favicon updated:", logoUrl);
      } else {
        showToast("❌ Failed to upload logo.", "error");
      }
    } catch (error) {
      showToast("❌ Error uploading logo.", "error");
    }
  };

  // ── Sidebar links ──
  const sideLinks = [
    { id: "dashboard",   label: "📊 Dashboard",   },
    { id: "news",        label: "📰 News",         },
    { id: "events",      label: "📅 Events",       },
    { id: "staff",       label: "👥 Staff",        },
    { id: "contacts",    label: "✉️ Messages",     },
    { id: "enrollments", label: "📋 Enrollments",  },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false); // Close sidebar on desktop
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F3F4F6", overflow: "hidden" }}>

      {/* ── Mobile overlay (behind sidebar, above content) ── */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 99,
          }}
        />
      )}

      {/* ── Sidebar ── always in DOM, slide via transform ── */}
      <div style={{
        width: "240px",
        minWidth: "240px",
        background: "#0B1F4B",
        display: "flex",
        flexDirection: "column",
        position: isMobile ? "fixed" : "sticky",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: isMobile ? 100 : 1,
        transform: isMobile && !sidebarOpen ? "translateX(-240px)" : "translateX(0)",
        transition: "transform 0.3s ease",
        overflowY: "auto",
        flexShrink: 0,
      }}>
        {/* Sidebar Header */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "2.75rem", height: "2.75rem", background: "#00b7ff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
            {logo ? <img src={logo} alt="School Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "🦅"}
          </div>
          <div>
            <h2 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", lineHeight: 1.3, margin: 0 }}>
              Al-Birr Admin
            </h2>
            <p style={{ color: "#00b7ff", fontSize: "0.7rem", marginTop: "0.2rem" }}>Control Panel</p>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "1rem 0" }}>
          {sideLinks.map(link => (
            <button key={link.id} onClick={() => { setAdminPage(link.id); setSidebarOpen(false); }}
              style={{
                width: "100%", textAlign: "left", padding: "0.85rem 1.5rem",
                background: adminPage === link.id ? "rgba(0,183,255,0.15)" : "transparent",
                borderLeft: adminPage === link.id ? "3px solid #00b7ff" : "3px solid transparent",
                borderRight: "none", borderTop: "none", borderBottom: "none",
                color: adminPage === link.id ? "#00b7ff" : "rgba(255,255,255,0.7)",
                cursor: "pointer", fontSize: "0.9rem",
                fontFamily: "'Source Sans 3', sans-serif", transition: "all 0.2s",
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button onClick={() => { onLogout(); setSidebarOpen(false); }}
            style={{
              width: "100%", padding: "0.75rem", background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px",
              color: "#f87171", cursor: "pointer", fontSize: "0.9rem",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, minWidth: 0, padding: isMobile ? "4.5rem 1rem 1rem" : "2rem", overflowY: "auto" }} className="admin-main">

        {/* ── Hamburger (top-left, fixed, mobile only) ── */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
            style={{
              position: "fixed", top: "0.85rem", right: "1rem",
              zIndex: 150, background: "#0B1F4B", border: "none",
              borderRadius: "8px", padding: "0.55rem 0.65rem",
              cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
              display: "flex", flexDirection: "column",
              gap: "5px", alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{
              display: "block", width: "20px", height: "2px",
              background: "white", borderRadius: "2px",
              transition: "transform 0.25s ease, opacity 0.25s ease",
              transform: sidebarOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }} />
            <span style={{
              display: "block", width: "20px", height: "2px",
              background: "white", borderRadius: "2px",
              transition: "transform 0.25s ease, opacity 0.25s ease",
              opacity: sidebarOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: "20px", height: "2px",
              background: "white", borderRadius: "2px",
              transition: "transform 0.25s ease, opacity 0.25s ease",
              transform: sidebarOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }} />
          </button>
        )}


        {/* ── DASHBOARD ── */}
        {adminPage === "dashboard" && (
          <div className="fade-in">
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0B1F4B", marginBottom: "0.5rem" }}>
              Welcome back, Admin 👋
            </h1>
            <p style={{ color: "#6B7280", marginBottom: "2rem" }}>
              Here is an overview of Al-Birr Website.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "2rem" }}>
              {[
                { label: "News Articles",   value: newsItems.length,   icon: "📰", color: "#3b82f6" },
                { label: "Events",          value: events.length,      icon: "📅", color: "#10b981" },
                { label: "Staff Members",   value: staff.length,       icon: "👥", color: "#f59e0b" },
                { label: "Total Content",   value: newsItems.length + events.length + staff.length, icon: "📊", color: "#8b5cf6" },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: "16px", padding: "1.5rem",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)", borderTop: `4px solid ${stat.color}`,
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{stat.icon}</div>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#0B1F4B", fontFamily: "'Playfair Display', serif" }}>
                    {stat.value}
                  </div>
                  <div style={{ color: "#6B7280", fontSize: "0.85rem" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {/* Recent News */}
              <div style={{ background: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#0B1F4B", marginBottom: "1rem" }}>
                  Recent News
                </h3>
                {newsItems.slice(0, 4).map((n, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "0.75rem", alignItems: "center",
                    padding: "0.6rem 0", borderBottom: "1px solid #f3f4f6",
                  }}>
                    <span style={{ fontSize: "1.2rem" }}>{n.icon}</span>
                    <span style={{ fontSize: "0.85rem", color: "#0B1F4B", fontWeight: 600 }}>{n.title}</span>
                  </div>
                ))}
              </div>

              {/* Upcoming Events */}
              <div style={{ background: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#0B1F4B", marginBottom: "1rem" }}>
                  Upcoming Events
                </h3>
                {events.slice(0, 4).map((e, i) => {
                  const dateObj = new Date(e.event_date);
                  const day     = dateObj.getUTCDate();
                  const month   = dateObj.toLocaleString("default", { month: "short", timeZone: "UTC" });
                  return (
                    <div key={i} style={{
                      display: "flex", gap: "0.75rem", alignItems: "center",
                      padding: "0.6rem 0", borderBottom: "1px solid #f3f4f6",
                    }}>
                      <div style={{
                        background: "#0B1F4B", color: "#00b7ff", borderRadius: "6px",
                        padding: "0.2rem 0.5rem", fontSize: "0.75rem", fontWeight: 700, minWidth: "45px", textAlign: "center",
                      }}>
                        {day} {month}
                      </div>
                      <span style={{ fontSize: "0.85rem", color: "#0B1F4B", fontWeight: 600 }}>{e.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── NEWS MANAGEMENT ── */}
        {adminPage === "news" && (
          <div className="fade-in">
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0B1F4B", marginBottom: "2rem" }}>
              📰 Manage News
            </h1>

            {/* Edit News Modal */}
            {editingNews && (
              <div style={{
                position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
              }}>
                <div style={{
                  background: "white", borderRadius: "16px", padding: "2rem",
                  width: "90%", maxWidth: "500px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                }}>
                  <h3 style={{ color: "#0B1F4B", marginBottom: "1.5rem", fontWeight: 700 }}>Edit Article</h3>
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label>Title</label>
                    <input type="text" value={newsForm.title}
                      onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} />
                  </div>
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label>Category</label>
                    <select value={newsForm.category} onChange={e => setNewsForm({ ...newsForm, category: e.target.value })}>
                      <option>Announcement</option>
                      <option>Achievement</option>
                      <option>Community</option>
                      <option>Sports</option>
                      <option>Arts</option>
                      <option>Academic</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label>Description</label>
                    <textarea value={newsForm.description}
                      onChange={e => setNewsForm({ ...newsForm, description: e.target.value })} />
                  </div>
                  <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                    <label>Icon (emoji)</label>
                    <input type="text" value={newsForm.icon}
                      onChange={e => setNewsForm({ ...newsForm, icon: e.target.value })} />
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button className="btn-primary" onClick={handleUpdateNews} style={{ flex: 1 }}>
                      Save Changes
                    </button>
                    <button style={{
                      flex: 1, padding: "0.75rem", background: "#f3f4f6", border: "1px solid #e5e7eb",
                      borderRadius: "8px", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
                    }} onClick={() => setEditingNews(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add News Form */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
              <h3 style={{ color: "#0B1F4B", marginBottom: "1.5rem", fontWeight: 700 }}>Add New Article</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" placeholder="Article title..." value={newsForm.title}
                    onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={newsForm.category} onChange={e => setNewsForm({ ...newsForm, category: e.target.value })}>
                    <option>Announcement</option>
                    <option>Achievement</option>
                    <option>Community</option>
                    <option>Sports</option>
                    <option>Arts</option>
                    <option>Academic</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Description</label>
                  <textarea placeholder="Article description..." value={newsForm.description}
                    onChange={e => setNewsForm({ ...newsForm, description: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Icon (emoji)</label>
                  <input type="text" placeholder="📰" value={newsForm.icon}
                    onChange={e => setNewsForm({ ...newsForm, icon: e.target.value })} />
                </div>
              </div>
              <button className="btn-primary" onClick={handleAddNews}>Add Article →</button>
            </div>

            {/* News List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {newsItems.map((n, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: "12px", padding: "1.2rem 1.5rem",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)", flexWrap: "wrap", gap: "1rem",
                }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", flex: 1 }}>
                    <span style={{ fontSize: "1.5rem" }}>{n.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: "#0B1F4B" }}>{n.title}</div>
                      <div style={{ fontSize: "0.8rem", color: "#00b7ff", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{n.category}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => handleEditNews(n)}
                      style={{
                        background: "#E8EEF9", border: "1px solid #d1daf9", color: "#0B1F4B",
                        padding: "0.4rem 1rem", borderRadius: "8px", cursor: "pointer",
                        fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.85rem",
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDeleteNews(n.id)}
                      style={{
                        background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626",
                        padding: "0.4rem 1rem", borderRadius: "8px", cursor: "pointer",
                        fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.85rem",
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── EVENTS MANAGEMENT ── */}
        {adminPage === "events" && (
          <div className="fade-in">
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0B1F4B", marginBottom: "2rem" }}>
              📅 Manage Events
            </h1>

            {/* Edit Event Modal */}
            {editingEvent && (
              <div style={{
                position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
              }}>
                <div style={{
                  background: "white", borderRadius: "16px", padding: "2rem",
                  width: "90%", maxWidth: "500px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                }}>
                  <h3 style={{ color: "#0B1F4B", marginBottom: "1.5rem", fontWeight: 700 }}>Edit Event</h3>
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label>Event Title</label>
                    <input type="text" value={eventForm.title}
                      onChange={e => setEventForm({ ...eventForm, title: e.target.value })} />
                  </div>
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label>Date</label>
                    <input type="date" value={eventForm.event_date}
                      onChange={e => setEventForm({ ...eventForm, event_date: e.target.value })} />
                  </div>
                  <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                    <label>Description</label>
                    <input type="text" value={eventForm.description}
                      onChange={e => setEventForm({ ...eventForm, description: e.target.value })} />
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button className="btn-primary" onClick={handleUpdateEvent} style={{ flex: 1 }}>
                      Save Changes
                    </button>
                    <button style={{
                      flex: 1, padding: "0.75rem", background: "#f3f4f6", border: "1px solid #e5e7eb",
                      borderRadius: "8px", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
                    }} onClick={() => setEditingEvent(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add Event Form */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
              <h3 style={{ color: "#0B1F4B", marginBottom: "1.5rem", fontWeight: 700 }}>Add New Event</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Event Title</label>
                  <input type="text" placeholder="Event name..." value={eventForm.title}
                    onChange={e => setEventForm({ ...eventForm, title: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" value={eventForm.event_date}
                    onChange={e => setEventForm({ ...eventForm, event_date: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" placeholder="Location · Time..." value={eventForm.description}
                  onChange={e => setEventForm({ ...eventForm, description: e.target.value })} />
              </div>
              <button className="btn-primary" onClick={handleAddEvent}>Add Event →</button>
            </div>

            {/* Events List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {events.map((e, i) => {
                const dateObj = new Date(e.event_date);
                const day     = dateObj.getUTCDate();
                const month   = dateObj.toLocaleString("default", { month: "short", timeZone: "UTC" });
                return (
                  <div key={i} style={{
                    background: "white", borderRadius: "12px", padding: "1.2rem 1.5rem",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)", flexWrap: "wrap", gap: "1rem",
                  }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", flex: 1 }}>
                      <div style={{
                        background: "#0B1F4B", color: "#00b7ff", borderRadius: "8px",
                        padding: "0.4rem 0.75rem", textAlign: "center", minWidth: "55px",
                      }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 900, lineHeight: 1 }}>{day}</div>
                        <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "1px" }}>{month}</div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: "#0B1F4B" }}>{e.title}</div>
                        <div style={{ fontSize: "0.85rem", color: "#6B7280" }}>{e.description}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button onClick={() => handleEditEvent(e)}
                        style={{
                          background: "#E8EEF9", border: "1px solid #d1daf9", color: "#0B1F4B",
                          padding: "0.4rem 1rem", borderRadius: "8px", cursor: "pointer",
                          fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.85rem",
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDeleteEvent(e.id)}
                        style={{
                          background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626",
                          padding: "0.4rem 1rem", borderRadius: "8px", cursor: "pointer",
                          fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.85rem",
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STAFF MANAGEMENT ── */}
        {adminPage === "staff" && (
          <div className="fade-in">
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0B1F4B", marginBottom: "2rem" }}>
              👥 Manage Staff
            </h1>

            {/* Edit Staff Modal */}
            {editingStaff && (
              <div style={{
                position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
                overflow: "auto",
              }}>
                <div style={{
                  background: "white", borderRadius: "16px", padding: "2rem",
                  width: "90%", maxWidth: "500px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  margin: "2rem auto",
                }}>
                  <h3 style={{ color: "#0B1F4B", marginBottom: "1.5rem", fontWeight: 700 }}>Edit Staff</h3>
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label>Full Name</label>
                    <input type="text" value={staffForm.name}
                      onChange={e => setStaffForm({ ...staffForm, name: e.target.value })} />
                  </div>
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label>Role</label>
                    <input type="text" value={staffForm.role}
                      onChange={e => setStaffForm({ ...staffForm, role: e.target.value })} />
                  </div>
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label>Bio</label>
                    <input type="text" value={staffForm.bio}
                      onChange={e => setStaffForm({ ...staffForm, bio: e.target.value })} />
                  </div>
                  <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                    <label>Passport Photo</label>
                    {staffForm.photoPreview && (
                      <div style={{ marginBottom: "0.5rem", textAlign: "center" }}>
                        <img src={staffForm.photoPreview} alt="Preview" style={{
                          width: "100px", height: "100px", borderRadius: "8px", objectFit: "cover",
                        }} />
                      </div>
                    )}
                    <input type="file" accept="image/*"
                      onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          setStaffForm({ ...staffForm, photo: file, photoPreview: URL.createObjectURL(file) });
                        }
                      }} />
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button className="btn-primary" onClick={handleUpdateStaff} style={{ flex: 1 }}>
                      Save Changes
                    </button>
                    <button style={{
                      flex: 1, padding: "0.75rem", background: "#f3f4f6", border: "1px solid #e5e7eb",
                      borderRadius: "8px", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
                    }} onClick={() => setEditingStaff(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Logo Upload Section */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
              <h3 style={{ color: "#0B1F4B", marginBottom: "1.5rem", fontWeight: 700 }}>Upload School Logo</h3>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label>Logo Image (will be used as favicon)</label>
                <input type="file" accept="image/*"
                  onChange={e => setLogoFile(e.target.files[0])} />
              </div>
              <button className="btn-primary" onClick={handleLogoUpload}>Upload Logo →</button>
            </div>

            {/* Add Staff Form */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
              <h3 style={{ color: "#0B1F4B", marginBottom: "1.5rem", fontWeight: 700 }}>Add New Staff</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Dr. Kamal Ayyub"
                    value={!editingNews && !editingEvent && !editingStaff ? staffForm.name : ""}
                    onChange={e => setStaffForm({ ...staffForm, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" placeholder="Head of Science"
                    value={!editingNews && !editingEvent && !editingStaff ? staffForm.role : ""}
                    onChange={e => setStaffForm({ ...staffForm, role: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Bio</label>
                  <input type="text" placeholder="Short biography..."
                    value={!editingNews && !editingEvent && !editingStaff ? staffForm.bio : ""}
                    onChange={e => setStaffForm({ ...staffForm, bio: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Passport Photo</label>
                  <input type="file" accept="image/*"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        setStaffForm({ ...staffForm, photo: file });
                      }
                    }} />
                </div>
              </div>
              <button className="btn-primary" onClick={handleAddStaff}>Add Staff →</button>
            </div>

            {/* Staff List */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
              {staff.map((s, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: "12px", padding: "1.5rem",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)", textAlign: "center",
                }}>
                  <div style={{
                    width: "80px", height: "80px", borderRadius: "50%",
                    background: avatarColors[i % avatarColors.length],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "2rem", border: "4px solid #F5A623", margin: "0 auto 1rem",
                    overflow: "hidden",
                  }}>
                    {s.photo ? (
                      <img src={`http://localhost:5000${s.photo}`} alt={s.name} style={{
                        width: "100%", height: "100%", objectFit: "cover",
                      }} />
                    ) : s.emoji}
                  </div>
                  <div style={{ fontWeight: 700, color: "#0B1F4B", fontSize: "1rem", marginBottom: "0.25rem" }}>{s.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "#00b7ff", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>{s.role}</div>
                  <small style={{ color: "#6B7280", lineHeight: 1.4 }}>{s.bio}</small>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", justifyContent: "center" }}>
                    <button onClick={() => handleEditStaff(s)}
                      style={{
                        background: "#E8EEF9", border: "1px solid #d1daf9", color: "#0B1F4B",
                        padding: "0.4rem 0.75rem", borderRadius: "8px", cursor: "pointer",
                        fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.8rem", flex: 1,
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDeleteStaff(s.id)}
                      style={{
                        background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626",
                        padding: "0.4rem 0.75rem", borderRadius: "8px", cursor: "pointer",
                        fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.8rem", flex: 1,
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CONTACTS ── */}
        {adminPage === "contacts" && (
          <div className="fade-in">
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0B1F4B", marginBottom: "2rem" }}>
              ✉️ Contact Messages
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {contacts.length === 0 && (
                <div style={{ textAlign: "center", padding: "4rem", color: "#6B7280" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
                  <p>No messages yet.</p>
                </div>
              )}
              {contacts.map((c, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: "12px", padding: "1.5rem",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 700, color: "#0B1F4B" }}>{c.name}</span>
                      <span style={{ color: "#6B7280", fontSize: "0.85rem", marginLeft: "0.75rem" }}>{c.email}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                      <span style={{
                        background: "#E8EEF9", color: "#0B1F4B", borderRadius: "20px",
                        padding: "0.2rem 0.75rem", fontSize: "0.75rem", fontWeight: 700,
                      }}>
                        {c.subject}
                      </span>
                      <button
                        onClick={() => handleDeleteContact(c.id)}
                        style={{
                          background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626",
                          padding: "0.3rem 0.9rem", borderRadius: "8px", cursor: "pointer",
                          fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.82rem", fontWeight: 600,
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                  <p style={{ color: "#6B7280", fontSize: "0.9rem", lineHeight: 1.6 }}>{c.message}</p>
                  <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginTop: "0.75rem" }}>
                    {new Date(c.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* ── ENROLLMENTS / WHATSAPP ── */}
{adminPage === "enrollments" && (
  <div className="fade-in">
    <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0B1F4B", marginBottom: "0.5rem" }}>
      📋 Enrollment via WhatsApp
    </h1>
    <p style={{ color: "#6B7280", marginBottom: "2rem", fontSize: "0.95rem" }}>
      When visitors click <strong>"Enroll Now"</strong> on the website, they are sent directly
      to your WhatsApp DM with a pre-filled message. Manage your number and message below.
    </p>

    {/* How it works */}
    <div style={{
      background: "#E8EEF9", borderRadius: "16px", padding: "1.5rem",
      marginBottom: "2rem", border: "2px solid #d1daf9",
    }}>
      <h3 style={{ color: "#0B1F4B", fontWeight: 700, marginBottom: "1rem" }}>
        💡 How It Works
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {[
          "1️⃣  Parent clicks 'Enroll Now' on the school website",
          "2️⃣  WhatsApp opens automatically on their device",
          "3️⃣  Your school number is pre-loaded as the recipient",
          "4️⃣  The default message is pre-filled and ready to send",
          "5️⃣  Parent sends the message and you reply directly on WhatsApp",
        ].map((step, i) => (
          <div key={i} style={{ color: "#0B1F4B", fontSize: "0.9rem", fontWeight: 500 }}>
            {step}
          </div>
        ))}
      </div>
    </div>

    {/* WhatsApp Settings Form */}
    <div style={{
      background: "white", borderRadius: "16px", padding: "2rem",
      boxShadow: "0 2px 10px rgba(0,0,0,0.06)", marginBottom: "2rem",
    }}>
      <h3 style={{ color: "#0B1F4B", fontWeight: 700, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.5rem" }}>📱</span> WhatsApp Settings
      </h3>

      <div className="form-group">
        <label>WhatsApp Phone Number</label>
        <input
          type="text"
          placeholder="2348012345678"
          value={waForm.phone}
          onChange={e => setWaForm({ ...waForm, phone: e.target.value })}
        />
        <p style={{ color: "#6B7280", fontSize: "0.8rem", marginTop: "0.4rem" }}>
          ⚠️ Enter number with country code, no + sign or spaces. E.g: <strong>2348012345678</strong>
        </p>
      </div>

      <div className="form-group">
        <label>Default WhatsApp Message</label>
        <textarea
          placeholder="Hello! I am interested in enrolling my child..."
          value={waForm.message}
          onChange={e => setWaForm({ ...waForm, message: e.target.value })}
          style={{ minHeight: "120px" }}
        />
        <p style={{ color: "#6B7280", fontSize: "0.8rem", marginTop: "0.4rem" }}>
          This message will be pre-filled when parents click Enroll Now.
        </p>
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={handleUpdateWhatsapp}>
          💾 Save Settings
        </button>
        <button
          style={{
            padding: "0.85rem 1.5rem", background: "#25D366", color: "white",
            border: "none", borderRadius: "8px", cursor: "pointer",
            fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700,
            fontSize: "0.95rem",
          }}
          onClick={() => {
            const phone = waForm.phone || "2348012345678";
            const message = encodeURIComponent(waForm.message || "Hello!");
            window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
          }}
        >
          🔗 Test WhatsApp Link
        </button>
      </div>
    </div>

    {/* Preview */}
      <div style={{
        background: "white", borderRadius: "16px", padding: "2rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      }}>
        <h3 style={{ color: "#0B1F4B", fontWeight: 700, marginBottom: "1.5rem" }}>
          👀 Current Settings Preview
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{
            background: "#F3F4F6", borderRadius: "10px", padding: "1rem 1.5rem",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ color: "#6B7280", fontSize: "0.85rem", fontWeight: 600 }}>📞 WhatsApp Number</span>
            <span style={{ color: "#0B1F4B", fontWeight: 700 }}>+{whatsapp?.phone || "Not set"}</span>
          </div>
          <div style={{
            background: "#F3F4F6", borderRadius: "10px", padding: "1rem 1.5rem",
          }}>
            <span style={{ color: "#6B7280", fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
              💬 Default Message
            </span>
            <span style={{ color: "#0B1F4B", fontSize: "0.9rem", lineHeight: 1.6 }}>
              {whatsapp?.message || "Not set"}
            </span>
          </div>
          <div style={{
            background: "#dcfce7", borderRadius: "10px", padding: "1rem 1.5rem",
            border: "1px solid #86efac",
          }}>
            <span style={{ color: "#166534", fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>
              🔗 Generated WhatsApp Link
            </span>
            <span style={{ color: "#15803d", fontSize: "0.8rem", wordBreak: "break-all" }}>
              {`https://wa.me/${whatsapp?.phone}?text=${encodeURIComponent(whatsapp?.message || "")}`}
            </span>
          </div>
        </div>
      </div>
    </div>
    )}
  </div>

      {/* ── Toast ── */}
      {toast.show && (
        <div style={{
          position: "fixed", bottom: "2rem", right: "2rem",
          background: toast.type === "success" ? "#10b981" : "#ef4444",
          color: "white", padding: "1rem 1.5rem", borderRadius: "12px",
          fontWeight: 600, zIndex: 999, boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.3s ease",
        }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// =============================================
//  ROOT APP
// =============================================

function App() {
  const [page, setPage]           = useState("Home");
  const [newsItems, setNews]      = useState([]);
  const [events, setEvents]       = useState([]);
  const [staff, setStaff]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [isAdmin, setIsAdmin]     = useState(false);
  const [adminPage, setAdminPage] = useState("dashboard");
  const [token, setToken]         = useState(
    localStorage.getItem("adminToken") || null
  );

  const [whatsapp, setWhatsapp] = useState({
    phone: "2348012345678",
    message: "Hello! I am interested in enrolling my child at Al-Birr Islamic Model School. Please provide more information.",
  });

  const [logo, setLogo]           = useState(() => {
    const url = "http://localhost:5000/uploads/logo.png?t=" + Date.now();
    return url;
  });

  // Load logo on app start
  useEffect(() => {
    const loadLogo = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/logo");
        if (res.ok) {
          setLogo("http://localhost:5000/uploads/logo.png?t=" + Date.now());
          console.log("✅ Logo loaded");
        }
      } catch (error) {
        console.log("Logo not found, using emoji");
      }
    };
    loadLogo();
  }, []);

  // Fetch all data from backend
  // Fetch WhatsApp settings
  useEffect(() => {
    fetch("http://localhost:5000/api/whatsapp")
      .then(res => res.json())
      .then(data => {
        if (data.success) setWhatsapp(data.data);
      })
      .catch(err => console.error("Failed to fetch WhatsApp settings:", err));
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [newsRes, eventsRes, staffRes] = await Promise.all([
          fetch("http://localhost:5000/api/news"),
          fetch("http://localhost:5000/api/events"),
          fetch("http://localhost:5000/api/staff"),
        ]);

        const newsData   = await newsRes.json();
        const eventsData = await eventsRes.json();
        const staffData  = await staffRes.json();

        if (newsData.success)   setNews(newsData.data);
        if (eventsData.success) setEvents(eventsData.data);
        if (staffData.success)  setStaff(staffData.data);
      } catch (error) {
        console.error("Failed to fetch data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Verify saved token on page load
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      fetch("http://localhost:5000/api/admin/verify", {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setToken(savedToken);
            setIsAdmin(true);
          } else {
            localStorage.removeItem("adminToken");
            setToken(null);
          }
        })
        .catch(() => {
          localStorage.removeItem("adminToken");
          setToken(null);
        });
    }
  }, []);

  const handleNav = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const handleAdminLogin = (newToken) => {
    setToken(newToken);
    setIsAdmin(true);
    localStorage.setItem("adminToken", newToken);
  };

  const handleAdminLogout = () => {
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("adminToken");
    setPage("Home");
  };

  if (loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100vh", flexDirection: "column", gap: "1rem",
        background: "#0B1F4B",
      }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "16px", overflow: "hidden", background: "#00b7ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {logo
            ? <img src={logo} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ fontSize: "2.5rem" }}>🦅</span>
          }
        </div>
        <p style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
          Al-Birr Islamic Model School
        </p>
        <p style={{ color: "#00b7ff", fontSize: "0.9rem", letterSpacing: "2px" }}>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <>
      {page !== "admin" && <AlertBanner onNav={handleNav} />}
      {page !== "admin" && (
        <NavBar
      page={page}
      onNav={handleNav}
      isAdmin={isAdmin}
      onAdminClick={() => setPage("admin")}
      logo={logo}
      whatsapp={whatsapp}
    />
      )}

      {page === "admin" && !isAdmin && (
        <AdminLoginPage onLogin={handleAdminLogin} logo={logo} />
      )}

      {page === "admin" && isAdmin && (
        <AdminDashboard
          token={token}
          onLogout={handleAdminLogout}
          adminPage={adminPage}
          setAdminPage={setAdminPage}
          newsItems={newsItems}
          events={events}
          staff={staff}
          setNews={setNews}
          setEvents={setEvents}
          setStaff={setStaff}
          logo={logo}
          setLogo={setLogo}
          whatsapp={whatsapp}
          setWhatsapp={setWhatsapp}
        />
      )}

      {page !== "admin" && (
        <>
          {page === "Home"     && <HomePage     onNav={handleNav} newsItems={newsItems} events={events} />}
          {page === "About"    && <AboutPage    whatsapp={whatsapp} />}
          {page === "Programs" && <ProgramsPage />}
          {page === "News"     && <NewsPage     newsItems={newsItems} events={events} />}
          {page === "Staff"    && <StaffPage    onNav={handleNav} staff={staff} />}
          {page === "Contact"  && <ContactPage  />}
          <Footer onNav={handleNav} logo={logo} />
        </>
      )}
    </>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
