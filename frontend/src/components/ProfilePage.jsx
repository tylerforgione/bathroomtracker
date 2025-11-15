// src/components/ProfilePage.jsx
export default function ProfilePage({ onBack }) {
  return (
    <div className="profile-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to map
      </button>

      <h2 className="profile-heading">My profile</h2>

      <div className="profile-card">
        <div className="profile-row">
          <span className="profile-label">Name</span>
          <span className="profile-value">Mysterious Toilet Watcher</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Email</span>
          <span className="profile-value">you@example.com</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Favourite campus</span>
          <span className="profile-value">McGill Downtown</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Total reviews</span>
          <span className="profile-value">12</span>
        </div>
      </div>

      <div className="profile-section">
        <h3>Your recent toilets</h3>
        <ul className="profile-list">
          <li>Redpath Library 2F ⭐⭐⭐⭐⭐</li>
          <li>McConnell Basement ⭐⭐⭐⭐</li>
          <li>Burnside 3F ⭐⭐⭐</li>
        </ul>
      </div>
    </div>
  );
}
