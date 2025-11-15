import React, { useState } from "react";

export default function AuthPage({ onLogin, onBack }) {
  const [mode, setMode] = useState("signin"); // "signin" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // fake auth: pick a username
    const finalUsername =
      mode === "signup"
        ? username || email.split("@")[0] || "User"
        : email.split("@")[0] || "User";

    onLogin({ username: finalUsername });
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
          type="button"
          className={
            "auth-toggle-btn" +
            (mode === "signin" ? " auth-toggle-btn--active" : "")
          }
          onClick={() => setMode("signin")}
        >
          Sign in
        </button>
        <button
          type="button"
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
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="auth-label">
          Password
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {mode === "signup" && (
          <label className="auth-label">
            Username
            <input
              className="auth-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        )}

        <button type="submit" className="auth-submit">
          {mode === "signin" ? "Sign in" : "Sign up"}
        </button>
      </form>
    </div>
  );
}
