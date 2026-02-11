const rawBase = import.meta.env.VITE_API_BASE_URL || "";
const API_BASE_URL = rawBase.replace(/\/$/, "");

export function apiUrl(path) {
  if (!path.startsWith("/")) {
    throw new Error(`apiUrl expects a path starting with '/'. Received: ${path}`);
  }

  return `${API_BASE_URL}${path}`;
}
