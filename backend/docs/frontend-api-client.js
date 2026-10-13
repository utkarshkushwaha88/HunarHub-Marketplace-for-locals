// Example frontend API client for HunarHub
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

let accessToken = localStorage.getItem("hunarhub_access_token");

export function setAccessToken(token) {
  accessToken = token;
  if (token) localStorage.setItem("hunarhub_access_token", token);
  else localStorage.removeItem("hunarhub_access_token");
}

export async function api(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(options.headers || {})
    }
  });

  if (response.status === 401 && path !== "/auth/refresh") {
    const refresh = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include"
    });

    if (refresh.ok) {
      const data = await refresh.json();
      setAccessToken(data.data.accessToken);
      return api(path, options);
    }
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}
