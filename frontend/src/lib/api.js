import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

let accessToken = localStorage.getItem("hunarhub_access_token") || "";

export const setAccessToken = (token) => {
  accessToken = token || "";
  if (accessToken) localStorage.setItem("hunarhub_access_token", accessToken);
  else localStorage.removeItem("hunarhub_access_token");
};

export const getAccessToken = () => accessToken;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  else delete config.headers.Authorization;
  return config;
});

let refreshing = null;

const isAuthEndpoint = (url = "") =>
  ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"].some((path) =>
    url.includes(path)
  );

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Do not refresh for non-authenticated requests, auth endpoints, or retried requests.
    // AuthContext explicitly calls /auth/refresh during app initialization when needed.
    if (
      error.response?.status !== 401 ||
      !original ||
      original._retry ||
      isAuthEndpoint(original.url) ||
      !accessToken
    ) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      if (!refreshing) {
        refreshing = api.post("/auth/refresh").finally(() => {
          refreshing = null;
        });
      }

      const { data } = await refreshing;
      const token = data?.data?.accessToken;
      if (!token) throw new Error("The refresh response did not contain an access token.");

      setAccessToken(token);
      original.headers = original.headers || {};
      original.headers.Authorization = `Bearer ${token}`;
      return api(original);
    } catch (refreshError) {
      setAccessToken("");
      return Promise.reject(refreshError);
    }
  }
);

export const authApi = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  me: () => api.get("/auth/me"),
  refresh: () => api.post("/auth/refresh"),
  logout: () => api.post("/auth/logout"),
};

export const productApi = {
  list: (params = {}) => api.get("/products", { params }),
  get: (id) => api.get(`/products/${id}`),
  create: (payload) => api.post("/products", payload),
  update: (id, payload) => api.patch(`/products/${id}`, payload),
  remove: (id) => api.delete(`/products/${id}`),
};

export const serviceApi = {
  list: (params = {}) => api.get("/services", { params }),
  get: (id) => api.get(`/services/${id}`),
  create: (payload) => api.post("/services", payload),
  update: (id, payload) => api.patch(`/services/${id}`, payload),
  remove: (id) => api.delete(`/services/${id}`),
};

export const entrepreneurApi = {
  list: (params = {}) => api.get("/entrepreneurs", { params }),
  get: (id) => api.get(`/entrepreneurs/${id}`),
  me: () => api.get("/entrepreneurs/me"),
  createProfile: (payload) => api.post("/entrepreneurs", payload),
  updateProfile: (payload) => api.patch("/entrepreneurs/me", payload),
};

export const requestApi = {
  create: (payload) => api.post("/service-requests", payload),
  mine: () => api.get("/service-requests/my"),
  entrepreneur: () => api.get("/service-requests/entrepreneur"),
  updateStatus: (id, status) => api.patch(`/service-requests/${id}/status`, { status }),
};

export const orderApi = {
  create: (payload) => api.post("/orders", payload),
  verifyPayment: (payload) => api.post("/orders/verify-payment", payload),
  mine: () => api.get("/orders/my"),
  entrepreneur: () => api.get("/orders/entrepreneur"),
  get: (id) => api.get(`/orders/${id}`),
};

export const uploadApi = {
  images: (files) => {
    const form = new FormData();
    [...files].forEach((file) => form.append("images", file));
    return api.post("/uploads/images", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export const notificationApi = {
  list: (limit = 30) => api.get("/notifications", { params: { limit } }),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllRead: () => api.patch("/notifications/read-all"),
};

export const healthApi = () => api.get("/health");

export function apiErrorMessage(error, fallback = "Something went wrong.") {
  const data = error?.response?.data;
  const fieldErrors = data?.details?.fieldErrors;
  if (fieldErrors && typeof fieldErrors === "object") {
    const messages = Object.entries(fieldErrors).flatMap(([field, errors]) =>
      Array.isArray(errors) ? errors.map((msg) => `${field}: ${msg}`) : []
    );
    if (messages.length) return messages.join(" · ");
  }
  if (data?.message) return data.message;
  if (data?.errors?.length) return data.errors.map((x) => x.message).join(", ");
  return error?.message || fallback;
}

export const reviewApi = {
  list: (params = {}) => api.get("/reviews", { params }),
  create: (payload) => api.post("/reviews", payload),
};

export const complaintApi = {
  mine: () => api.get("/complaints/my"),
  create: (payload) => api.post("/complaints", payload),
};

export const adminApi = {
  dashboard: () => api.get("/admin/dashboard"),
  entrepreneurs: () => api.get("/admin/entrepreneurs"),
  verifyEntrepreneur: (id, isVerified) => api.patch(`/admin/entrepreneurs/${id}/verify`, { isVerified }),
  orders: () => api.get("/admin/orders"),
  updateOrderStatus: (id, status) => api.patch(`/admin/orders/${id}/status`, { status }),
  requests: () => api.get("/admin/service-requests"),
  updateRequestStatus: (id, status, entrepreneurNote = "") =>
    api.patch(`/admin/service-requests/${id}/status`, { status, entrepreneurNote }),
  complaints: () => api.get("/admin/complaints"),
  updateComplaint: (id, payload) => api.patch(`/admin/complaints/${id}`, payload),
  categories: () => api.get("/admin/categories"),
  createCategory: (payload) => api.post("/admin/categories", payload),
  updateCategory: (id, payload) => api.patch(`/admin/categories/${id}`, payload),
  removeCategory: (id) => api.delete(`/admin/categories/${id}`),
};
