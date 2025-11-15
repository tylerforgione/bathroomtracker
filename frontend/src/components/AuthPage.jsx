import React, { useState } from "react";

export default function AuthPage({ onLogin, onBack }) {
  const [mode, setMode] = useState("signin"); // "signin" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const baseUrl = "http://localhost:8080/api/auth";

  try {
    let response;

    if (mode === "signup") {
      // SIGN UP
      response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
    } else {
      // SIGN IN
      response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usernameOrEmail: email,
          password,
        }),
      });
    }

    if (!response.ok) {
      alert("Authentication failed");
      return;
    }

    const user = await response.json(); // { id, email, username }
    onLogin(user); // pass user to parent app

  } catch (err) {
    console.error("Auth error:", err);
    alert("Error contacting the server");
  }
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
