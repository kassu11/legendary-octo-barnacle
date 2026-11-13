import "./LoginButton.scoped.css";
import { AnilistIcon } from "@/assets/icons.jsx";
import { anilistClientId } from "@/utils/urlUtils";

const loginUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${anilistClientId()}&response_type=token`;

export function LoginButton() {
  return (
    <a href={loginUrl} class="login">
      <AnilistIcon scoped />
      <span>Log in</span>
    </a>
  );
}
