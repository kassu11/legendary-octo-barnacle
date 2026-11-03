import { Navigate, useLocation } from "@solidjs/router";
import { storeAccessToken } from "../../core/globalState.js";

function Authentication() {
  const location = useLocation();
  const hash = location.hash.substring(1);
  const search = new URLSearchParams(hash);
  const token = search.get("access_token");
  const expires = +search.get("expires_in") || 356 * 24 * 60 * 60;

  if (token?.length > 50) {
    storeAccessToken(token, expires);
  }

  document.title = "Authentication - LOB";

  return <Navigate href="/" />
}

export default Authentication
