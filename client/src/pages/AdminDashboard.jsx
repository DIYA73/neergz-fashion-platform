import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../lib/api.js";
import ThemeToggleButton from "../components/ThemeToggleButton.jsx";

const todayKey = new Date().toDateString();

function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [query, setQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");

  const logout = () => {
    localStorage.removeItem("neergz_admin_token");
    navigate("/admin/login");
  };

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("neergz_admin_token");
        const response = await fetch(apiUrl("/api/inquiries"), {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 401) {
          logout();
          return;
        }

        const data = await response.json();
        setItems(data.items || []);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
      }
    };

    load();
  }, []);

  const projectTypes = useMemo(() => {
    const values = Array.from(new Set(items.map((item) => item.projectType).filter(Boolean)));
    values.sort((a, b) => a.localeCompare(b));
    return values;
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesProject = projectFilter === "all" || item.projectType === projectFilter;
      const matchesQuery =
        query.trim() === "" ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.email.toLowerCase().includes(query.toLowerCase()) ||
        item.message.toLowerCase().includes(query.toLowerCase());
      return matchesProject && matchesQuery;
    });
  }, [items, query, projectFilter]);

  const metrics = useMemo(() => {
    const total = items.length;
    const today = items.filter((item) => new Date(item.createdAt).toDateString() === todayKey).length;
    const companies = items.filter((item) => /company|brand|studio/i.test(item.projectType || "")).length;
    return { total, today, companies };
  }, [items]);

  return (
    <div className="ngz-admin-dashboard-shell">
      <header className="ngz-admin-topbar">
        <div>
          <p className="ngz-admin-eyebrow">Neergz Admin</p>
          <h1>Inquiry Dashboard</h1>
          <p>Review incoming leads from your website contact flow.</p>
        </div>
        <div className="ngz-admin-topbar-actions">
          <ThemeToggleButton />
          <Link to="/" className="ngz-btn ngz-btn-outline">Website</Link>
          <button type="button" className="ngz-btn ngz-btn-outline" onClick={logout}>Log out</button>
        </div>
      </header>

      <section className="ngz-admin-metrics" aria-label="Dashboard metrics">
        <article>
          <h2>Total inquiries</h2>
          <strong>{metrics.total}</strong>
        </article>
        <article>
          <h2>Today</h2>
          <strong>{metrics.today}</strong>
        </article>
        <article>
          <h2>Company or studio</h2>
          <strong>{metrics.companies}</strong>
        </article>
      </section>

      <section className="ngz-admin-table-panel">
        <div className="ngz-admin-filters">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, email, or message"
            aria-label="Search inquiries"
          />

          <select
            value={projectFilter}
            onChange={(event) => setProjectFilter(event.target.value)}
            aria-label="Filter by project type"
          >
            <option value="all">All project types</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {status === "loading" && <p className="ngz-admin-state">Loading inquiries...</p>}
        {status === "error" && <p className="ngz-admin-state">Failed to load inquiries.</p>}

        {status === "ready" && filteredItems.length === 0 && (
          <p className="ngz-admin-state">No inquiries match your filters.</p>
        )}

        {status === "ready" && filteredItems.length > 0 && (
          <div className="ngz-admin-table" role="table" aria-label="Inquiries table">
            <div className="ngz-admin-table-row ngz-admin-table-head" role="row">
              <span role="columnheader">Name</span>
              <span role="columnheader">Email</span>
              <span role="columnheader">Project type</span>
              <span role="columnheader">Message</span>
              <span role="columnheader">Date</span>
            </div>

            {filteredItems.map((item) => (
              <div className="ngz-admin-table-row" role="row" key={item._id}>
                <span data-label="Name" role="cell">{item.name}</span>
                <span data-label="Email" role="cell">{item.email}</span>
                <span data-label="Project" role="cell">{item.projectType}</span>
                <span data-label="Message" role="cell">{item.message}</span>
                <span data-label="Date" role="cell">{formatDate(item.createdAt)}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
