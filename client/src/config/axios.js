import axios from "axios";

export const apiBaseUrl = (process.env.REACT_APP_BASE_URL || "")
  .trim()
  .replace(/\/+$/, "");

const Canonical = (process.env.REACT_APP_Canonical_URL || "")
  .trim()
  .replace(/\/+$/, "");
   console.log(Canonical)

export const getAppUrl = (path = "") => {
  if (!path) {
    return Canonical  ;
  }

  const CanonicalBaseUrl = Canonical ;




  return `${CanonicalBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

axios.defaults.baseURL = apiBaseUrl;
