import axios from "axios";

export const apiBaseUrl = (
  process.env.REACT_APP_BASE_URL || ""
)
  .trim()
  .replace(/\/+$/, "");

export const getAppUrl = (path = "") => {
  if (!path) {
    return apiBaseUrl;
  }

  return `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

axios.defaults.baseURL = apiBaseUrl;
