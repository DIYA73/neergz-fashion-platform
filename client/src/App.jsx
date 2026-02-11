import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import {
  ThemeContext,
  applyTheme,
  getPreferredTheme,
  nextTheme,
  persistTheme
} from "./lib/theme.js";

function isAuthed() {
  return Boolean(localStorage.getItem("neergz_admin_token"));
}

function ProtectedRoute({ children }) {
  if (!isAuthed()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default function App() {
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    applyTheme(theme);
    persistTheme(theme);
  }, [theme]);

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme((current) => nextTheme(current))
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeContext.Provider>
  );
}
