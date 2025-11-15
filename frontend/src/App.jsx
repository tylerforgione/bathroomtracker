import React, { useState, useMemo } from "react";
import "./App.css";
import ProfilePage from "./components/ProfilePage";

// Components
import MapView from "./components/MapView";
import BottomSheet from "./components/BottomSheet";

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
  const [currentView, setCurrentView] = useState("map"); // "map" or "profile"
  const [activeBuilding, setActiveBuilding] = useState(null);

  const [activeFilters, setActiveFilters] = useState({
    clean: true,
    stars: false,
    broken: false,
    open: false,
    stalls: false,
  });

  const [showList, setShowList] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // ← added

  const toggleFilter = (key) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleMenuClick = (action) => {
    if (action === "list") {
      setShowList((prev) => !prev);
    }
    setMenuOpen(false);
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

        {/* LEFT SIDEBAR MENU */}
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
                <button className="menu-item">Leaderboard</button>
                <button
                  className="menu-item"
                  onClick={() => handleMenuClick("list")}
                >
                  List view
                </button>
                <button className="menu-item">Suggest others</button>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN CARD */}
        <section className="main-card">
          <header className="top-bar">
            
            <h1 className="title">Toilet Watchers</h1>

            <div className="top-right">
              {/* PROFILE MENU */}
              <div className="profile-wrapper">
                <button
                  className="profile-button"
                  onClick={() => setProfileOpen((p) => !p)}
                >
                  M
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <button
                    className="profile-item"
                    onClick={() => {
                      setCurrentView("profile");
                      setProfileOpen(false);}}
                    >
                      My profile
                  </button>
                  <button className="profile-item">Settings</button>
                  <button className="profile-item logout">Log out</button>
                  </div>)}
              </div>
            </div>
          </header>

          {/* FILTER BAR */}
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

          {/* MAP VIEW */}
          <div className="map-wrapper">
            <MapView onSelectBuilding={setActiveBuilding} />
          </div>

          {/* BOTTOM SHEET */}
          <BottomSheet
            buildingId={activeBuilding}
            onClose={() => setActiveBuilding(null)}
          />

          {/* BATHROOM LIST DRAWER */}
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

          {/* LIST BUTTON */}
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
