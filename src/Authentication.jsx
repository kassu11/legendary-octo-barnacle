import { Navigate, useLocation } from "@solidjs/router";
import { useAuthentication } from "./AuthenticationContext";

function Authentication() {
  const location = useLocation();
  const hash = location.hash.substring(1);
  const search = new URLSearchParams(hash);
  const token = search.get("access_token");

  if (token?.length > 50) {
    const { setAccessToken } = useAuthentication();
    setAccessToken(token);
  }

  return <Navigate href="/" />
}

export default Authentication
