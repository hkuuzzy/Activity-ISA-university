import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") || "");
    const password = String(form.get("password") || "");
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    sessionStorage.setItem("user", username);
    navigate("/home");
  }

  return (
    <div className="center">
      <form className="card login" onSubmit={submit}>
        <h1>Welcome back</h1>
        <p className="muted">Log in to your school account.</p>
        <div className="field">
          <label htmlFor="username">Email or ID number</label>
          <input id="username" name="username" type="text" autoComplete="username" />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" />
        </div>
        <p className="err" role="alert">{error}</p>
        <button className="btn" type="submit">Log in</button>
      </form>
    </div>
  );
}