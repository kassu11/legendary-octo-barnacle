import { Navigate, useLocation } from "@solidjs/router";
import { useAuthentication } from "../context/providers";

function Authentication() {
  const location = useLocation();
  const hash = location.hash.substring(1);
  const search = new URLSearchParams(hash);
  const token = search.get("access_token");

  document.title = "Authentication - LOB";

  if (token?.length > 50) {
    const { setAccessToken } = useAuthentication();
    setAccessToken(token);
  }

  return <Navigate href="/" />
}

export default Authentication
