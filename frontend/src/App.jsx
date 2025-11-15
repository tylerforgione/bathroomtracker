import React, { useState, useMemo } from "react";
import "./App.css";

const TOILETS = [
  {
    id: 1,
    name: "McConnell Basement Washroom",
    lat: 45.5048,
    lng: -73.5772,
    clean: true,
    stars: 4.7,
    broken: false,
    open: true,
    stalls: 4,
  },
  {
    id: 2,
    name: "Redpath Library 2F",
    lat: 45.5043,
    lng: -73.5764,
    clean: true,
    stars: 4.2,
    broken: false,
    open: true,
    stalls: 3,
  },
  {
    id: 3,
    name: "Bronfman Ground Floor",
    lat: 45.5029,
    lng: -73.5755,
    clean: false,
    stars: 3.1,
    broken: true,
    open: true,
    stalls: 2,
  },
  {
    id: 4,
    name: "Burnside 3F",
    lat: 45.5056,
    lng: -73.5779,
    clean: true,
    stars: 4.9,
    broken: false,
    open: false,
    stalls: 6,
  },
];

const FILTERS = [
  { key: "clean", label: "clean" },
  { key: "stars", label: "> 4 stars" },
  { key: "broken", label: "broken" },
  { key: "open", label: "open" },
  { key: "stalls", label: "> 3 stalls" },
];

function App() {
  const [activeFilters, setActiveFilters] = useState({
    clean: true,
    stars: false,
    broken: false,
    open: false,
    stalls: false,
  });

  const [showList, setShowList] = useState(false);
  const [darkToggle, setDarkToggle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (action) => {
    if (action === "list") {
      setShowList((prev) => !prev); // open/close list view
    }
    // later you can handle "leaderboard" and "suggest" here
    setMenuOpen(false);
  };
  
  const toggleFilter = (key) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredToilets = useMemo(() => {
    return TOILETS.filter((t) => {
      if (activeFilters.clean && !t.clean) return false;
      if (activeFilters.stars && t.stars < 4) return false;
      if (activeFilters.broken && !t.broken) return false;
      if (activeFilters.open && !t.open) return false;
      if (activeFilters.stalls && t.stalls < 3) return false;
      return true;
    });
  }, [activeFilters]);

  return (
    <div className="page">
      <div className="app-shell">
        {/* Sidebar menu */}
        <aside className="sidebar">
          <div className="menu-wrapper">
            <button
              className="menu-button"
              onClick={() => setMenuOpen((open) => !open)}
            >
              ☰
            </button>

            {menuOpen && (
              <div className="menu-dropdown">
                <button
                  className="menu-item"
                  onClick={() => handleMenuClick("leaderboard")}
                >
                  Leaderboard
                </button>
                <button
                  className="menu-item"
                  onClick={() => handleMenuClick("list")}
                >
                  List view
                </button>
                <button
                  className="menu-item"
                  onClick={() => handleMenuClick("suggest")}
                >
                  Suggest others
                </button>
              </div>
            )}
          </div>
        </aside>


        {/* Main card */}
        <section className="main-card">
          <header className="top-bar">
            <div className="top-left">
              <button className="icon-btn">✎</button>
            </div>

            <h1 className="title">Toilet Watchers</h1>

            <div className="top-right">
              <div className="avatar">M</div>
              <div
                className={`toggle ${darkToggle ? "on" : ""}`}
                onClick={() => setDarkToggle((v) => !v)}
              >
                <div className="toggle-knob" />
              </div>
            </div>
          </header>

          <div className="filter-bar">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={
                  "filter-pill" +
                  (activeFilters[f.key] ? " filter-pill--active" : "")
                }
                onClick={() => toggleFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="map-wrapper">
            <iframe
              title="McGill map"
              className="map-iframe"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.147721887315!2d-73.57880122365838!3d45.50478433146351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a46bb29af53%3A0x7ca73a7d6c2db4f3!2sMcGill%20University!5e0!3m2!1sen!2sca!4v1731670000000"
            ></iframe>

            <div className={`drawer ${showList ? "drawer--open" : ""}`}>
              {filteredToilets.length === 0 ? (
                <p className="empty-text">No toilets match these filters 😔</p>
              ) : (
                filteredToilets.map((t) => (
                  <article key={t.id} className="list-item">
                    <h3>{t.name}</h3>
                    <p className="list-meta">
                      ⭐ {t.stars} • {t.stalls} stalls •{" "}
                      {t.open ? "Open" : "Closed"}
                    </p>
                    <p className="list-meta">
                      {t.clean ? "Very clean" : "Might be messy"}
                      {t.broken ? " • ⚠ some issues" : ""}
                    </p>
                  </article>
                ))
              )}
            </div>
          </div>

          <button
            className="see-list-btn"
            onClick={() => setShowList((v) => !v)}
          >
            {showList ? "hide list" : "see list"}
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
