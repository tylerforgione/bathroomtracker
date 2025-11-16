import React, { useEffect, useState } from "react";

export default function ProfilePage({ user, onBack }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadUserReviews() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/reviews/user/${user.id}`
        );

        if (!res.ok) {
          console.error("Failed to load reviews");
          return;
        }

        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error contacting backend", err);
      } finally {
        setLoading(false);
      }
    }

    loadUserReviews();
  }, [user]);

  if (!user) {
    return (
      <div className="profile-page">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <p>You must be logged in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to map
      </button>

      <h2 className="profile-heading">My profile</h2>

      <div className="profile-card">
        <div className="profile-row">
          <span className="profile-label">Name</span>
          <span className="profile-value">{user.username}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Email</span>
          <span className="profile-value">{user.email}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Total reviews</span>
          <span className="profile-value">{reviews.length}</span>
        </div>
      </div>

      <div className="profile-section">
        <h3>Your recent toilets</h3>

        {loading ? (
          <p>Loading...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="profile-list">
            {reviews.map((r) => (
              <li key={r.id}>
                Bathroom {r.bathroomId} — ⭐ {r.rating}/5
                <br />
                <small>{r.comment}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
