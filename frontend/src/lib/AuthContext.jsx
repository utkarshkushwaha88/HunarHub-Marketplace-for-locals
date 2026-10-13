import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi, apiErrorMessage, getAccessToken, setAccessToken } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!getAccessToken()) {
          const { data } = await authApi.refresh();
          setAccessToken(data.data.accessToken);
        }
        const { data } = await authApi.me();
        if (!cancelled) setUser(data.data);
        localStorage.setItem("hunarhub_user", JSON.stringify(data.data));
      } catch {
        setAccessToken("");
        localStorage.removeItem("hunarhub_user");
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const login = async (payload) => {
    const { data } = await authApi.login(payload);
    setAccessToken(data.data.accessToken);
    setUser(data.data.user);
    localStorage.setItem("hunarhub_user", JSON.stringify(data.data.user));
    return data.data.user;
  };

  const register = async (payload) => {
    const { data } = await authApi.register(payload);
    setAccessToken(data.data.accessToken);
    setUser(data.data.user);
    localStorage.setItem("hunarhub_user", JSON.stringify(data.data.user));
    return data.data.user;
  };

  const logout = async () => {
    // Clear the client token immediately so pending requests cannot trigger refresh
    // after the user has chosen to log out. The logout endpoint uses the HttpOnly cookie.
    setAccessToken("");
    setUser(null);
    localStorage.removeItem("hunarhub_user");
    try {
      await authApi.logout();
    } finally {
      setAccessToken("");
    }
  };

  const value = useMemo(() => ({
    user, loading, login, register, logout, errorMessage: apiErrorMessage
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
