import React, { useState } from "react";
import "./App.css";

import ProfilePage from "./components/ProfilePage";
import AuthPage from "./components/AuthPage";
import LeaderboardPage from "./components/LeaderBoardPage";

import MapView from "./components/MapView";
import BottomSheet from "./components/BottomSheet";

import buildings from "./data/buildings";


/* ===========================
      FILTER DEFINITIONS
   =========================== */
const FILTERS = [
  { key: "clean", label: "clean" },
  { key: "stars", label: "> 4 stars" },
  { key: "broken", label: "broken" },
  { key: "open", label: "open" },
  { key: "stalls", label: "> 3 stalls" }
];

function App() {
  const [toastMessage, setToastMessage] = useState("");

function showToast(msg) {
  setToastMessage(msg);
  setTimeout(() => setToastMessage(""), 3000);
}


  const [currentView, setCurrentView] = useState("map"); // map | profile | auth
  const [user, setUser] = useState(null);
  const [activeBuilding, setActiveBuilding] = useState(null);

  const [showList, setShowList] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [activeFilters, setActiveFilters] = useState({
    clean: true,
    stars: false,
    broken: false,
    open: false,
    stalls: false,
  });

  /* TOGGLE A FILTER */
  const toggleFilter = (key) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /* MENU ACTIONS */
  const handleMenuClick = (action) => {
    if (action === "list") {
      setShowList((prev) => !prev);
    }
    if (action === "leaderboard") {
      setCurrentView("leaderboard");
    }
    setMenuOpen(false);
  };

  /* FILTERED LIST OF BUILDINGS (no filtering yet) */
  const filteredBuildings = buildings;

  /* ===========================
         VIEW SWITCHING
     =========================== */

  if (currentView === "auth") {
    return (
      <AuthPage
        onLogin={(userData) => {
          setUser(userData);
          setCurrentView("map");
        }}
        onBack={() => setCurrentView("map")}
      />
    );
  }

  if (currentView === "profile") {
    return <ProfilePage user={user} onBack={() => setCurrentView("map")} />;
  }

  if (currentView === "leaderboard") {
    return <LeaderboardPage onBack={() => setCurrentView("map")} />;
  }

  /* ===========================
         MAIN MAP VIEW
     =========================== */

  return (
  <div className="page">
    <div className="app-shell">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="menu-wrapper">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(o => !o)}
          >
            ☰
          </button>

          {menuOpen && (
            <div className="menu-dropdown">
              <button className="menu-item">Leaderboard</button>
              <button className="menu-item" onClick={() => handleMenuClick("list")}>
                List view
              </button>
              <button className="menu-item">Suggest others</button>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CARD AREA */}
      <section className="main-card">

        {/* HEADER */}
        <header className="top-bar">
          <h1 className="title">Toilet Watchers</h1>

          <div className="top-right">
            {!user && (
              <button className="login-chip" onClick={() => setCurrentView("auth")}>
                Log in
              </button>
            )}

            {user && (
              <div className="profile-wrapper">
                <button
                  className="profile-button"
                  onClick={() => setProfileOpen(o => !o)}
                >
                  {user.username[0].toUpperCase()}
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <button className="profile-item" onClick={() => setCurrentView("profile")}>
                      My profile
                    </button>

                    <button className="profile-item">Settings</button>

                    <button
                      className="profile-item logout"
                      onClick={() => {
                        setUser(null);
                        setCurrentView("map");
                      }}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* FILTER BAR */}
        <div className="filter-bar">
          {FILTERS.map(f => (
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

        {/* MAP */}
        <div className="map-wrapper">
          <MapView onSelectBuilding={setActiveBuilding} />
        </div>

        {/* FLOATING SIDE PANEL */}
        <BottomSheet
          buildingId={activeBuilding}
          onClose={() => setActiveBuilding(null)}
          onToast={showToast}
        />

        {/* LIST VIEW DRAWER */}
        <div className={`drawer ${showList ? "drawer--open" : ""}`}>
          <div className="drawer-content">
            <h2 className="drawer-title">Buildings</h2> 
          {filteredBuildings.map(b => {
            const totalBaths = Object.values(b.floors)
              .reduce((acc, f) => acc + Object.keys(f).length, 0);

            return (
              <article
                key={b.id}
                className="list-item"
                onClick={() => {
                  setActiveBuilding(b.id);
                  setShowList(false);
                }}
              >
                <h3>{b.name}</h3>
                <p>Floors: {Object.keys(b.floors).length}</p>
                <p>Total bathrooms: {totalBaths}</p>
              </article>
            );
          })}

          <button
            className="close-drawer-btn"
            onClick={() => setShowList(false)}
          >
            Close
          </button>
        </div>
        </div>

        {/* LIST BUTTON */}
        <button
          className="see-list-btn"
          onClick={() => setShowList(v => !v)}
        >
          {showList ? "hide list" : "see list"}
        </button>

        {/* TOAST */}
        {toastMessage && (
          <div className="toast">{toastMessage}</div>
        )}

      </section>

    </div>
  </div>
);

}

export default App;
