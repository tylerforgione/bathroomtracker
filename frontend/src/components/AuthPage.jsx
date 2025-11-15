
import React, { useState, useMemo } from "react";
import "./App.css";
import ProfilePage from "./components/ProfilePage";
import AuthPage from "./components/AuthPage"; // 👈 add this


export default function AuthPage({ onLogin, onBack }) {
  const [mode, setMode] = useState("signin"); // "signin" or "signup"

  const handleSubmit = (e) => {
    e.preventDefault();
    // later: call backend here
    onLogin(); // pretend login worked
  };

  return (
    <div className="auth-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to map
      </button>

      <h2 className="auth-heading">
        {mode === "signin" ? "Sign in" : "Create an account"}
      </h2>

      <div className="auth-toggle">
        <button
          className={
            "auth-toggle-btn" +
            (mode === "signin" ? " auth-toggle-btn--active" : "")
          }
          onClick={() => setMode("signin")}
        >
          Sign in
        </button>
        <button
          className={
            "auth-toggle-btn" +
            (mode === "signup" ? " auth-toggle-btn--active" : "")
          }
          onClick={() => setMode("signup")}
        >
          Sign up
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">
          Email
          <input className="auth-input" type="email" required />
        </label>

        <label className="auth-label">
          Password
          <input className="auth-input" type="password" required />
        </label>

        {mode === "signup" && (
          <label className="auth-label">
            Username
            <input className="auth-input" type="text" required />
          </label>
        )}

        <button type="submit" className="auth-submit">
          {mode === "signin" ? "Sign in" : "Sign up"}
        </button>
      </form>
    </div>
  );
}
