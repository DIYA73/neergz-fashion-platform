import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../lib/api.js";
import ThemeToggleButton from "../components/ThemeToggleButton.jsx";

const adminHighlights = [
  "Protected JWT authentication",
  "Live inquiry feed from landing page",
  "Student and company lead workflow"
];

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ type: "idle", text: "" });

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", text: "Signing in..." });

    try {
      const response = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("neergz_admin_token", data.token);
      setStatus({ type: "success", text: "Welcome back." });
      navigate("/admin");
    } catch (error) {
      setStatus({ type: "error", text: "Invalid credentials." });
    }
  };

  return (
    <div className="ngz-admin-shell">
      <ThemeToggleButton className="ngz-admin-theme-toggle" />

      <section className="ngz-admin-login-panel" aria-label="Neergz admin intro">
        <p className="ngz-admin-eyebrow">Admin Portal</p>
        <h1>Neergz Control Center</h1>
        <p>
          Manage inquiries from students, fashion brands, and company teams from one secure dashboard.
        </p>
        <ul>
          {adminHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link to="/" className="ngz-btn ngz-btn-outline">Back to website</Link>
      </section>

      <form className="ngz-admin-login-card" onSubmit={onSubmit}>
        <div>
          <h2>Sign in</h2>
          <p>Use your admin credentials to continue.</p>
        </div>

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="admin@neergz.com"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={onChange}
            required
          />
        </label>

        <button className="ngz-btn ngz-btn-block" type="submit" disabled={status.type === "loading"}>
          {status.type === "loading" ? "Signing in..." : "Sign in"}
        </button>

        {status.text && <span className={`form-status ${status.type}`}>{status.text}</span>}
      </form>
    </div>
  );
}
