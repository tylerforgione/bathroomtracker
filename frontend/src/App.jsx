import React, { useState, useMemo } from "react";
import "./App.css";

import MapView from "./components/MapView";
import BottomSheet from "./components/BottomSheet";
import buildings from "./data/buildings"; // 👈 IMPORTANT: use real building data



function App() {
  const [currentView, setCurrentView] = useState("map");
  const [activeBuilding, setActiveBuilding] = useState(null);
  

  const [showList, setShowList] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  /* MENU ACTIONS */
  const handleMenuClick = (action) => {
    if (action === "list") {
      setShowList((prev) => !prev);
    }
    setMenuOpen(false);
  };

  return (
    <div className="page">
      <div className="app-shell">

        {/* SIDEBAR */}
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

        {/* MAIN CONTENT */}
        <section className="main-card">

          {/* HEADER */}
          <header className="top-bar">
            <h1 className="title">Toilet Watchers</h1>

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
                      setProfileOpen(false);
                    }}
                  >
                    My profile
                  </button>
                  <button className="profile-item">Settings</button>
                  <button className="profile-item logout">Log out</button>
                </div>
              )}
            </div>
          </header>

          {/* MAP */}
          <div className="map-wrapper">
            <MapView onSelectBuilding={setActiveBuilding} />
          </div>

          {/* FLOATING SIDE PANEL */}
          <BottomSheet
            buildingId={activeBuilding}
            onClose={() => setActiveBuilding(null)}
          />

          {/* =============================== */}
          {/*          LIST VIEW           */}
          {/* =============================== */}

          <div className={`drawer ${showList ? "drawer--open" : ""}`}>
            <div className="drawer-content">
              <h2 className="drawer-title">List View</h2>

              {buildings.map((b) => {
                const totalBaths = Object.values(b.floors)
                  .reduce((acc, f) => acc + Object.keys(f).length, 0);

                return (
                  <article
                    key={b.id}
                    className="list-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setActiveBuilding(b.id); // 👈 SAME as clicking a marker!
                      setShowList(false);      // close list
                    }}
                  >
                    <h3>{b.name}</h3>

                    <p className="list-meta">
                      Floors: {Object.keys(b.floors).length}
                    </p>

                    <p className="list-meta">
                      Total bathrooms: {totalBaths}
                    </p>
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
