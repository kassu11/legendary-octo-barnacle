import { ErrorBoundary, For, Match, Switch } from "solid-js";
import { formatTitleToUrl } from "../../utils/formating";
import "./ExternalLinks.scss";
import Link from "../../assets/Link";
import Anilist from "../../assets/Anilist";
import MyAnimeList from "../../assets/MyAnimeList";

export default function ExternalLinks(props) {
  return (
    <ErrorBoundary fallback="External links error">
      <Show when={props.media}>
        <div>
          <h2>External links</h2>
          <ul>
            <Show when={props.idAni}>
              <li class="cp-external-link">
                <div class="icon" style={{background: "#1a212b"}}>
                  <Anilist />
                </div>
                <a href={`https://anilist.co/${props.type}/${props.idAni}/${formatTitleToUrl(props.title)}/`} target="_blank">AniList</a>
              </li>
            </Show>
            <Show when={props.idMal}>
              <li class="cp-external-link">
                <div class="icon" style={{background: "#36509d"}}>
                  <MyAnimeList />
                </div>
                <a href={`https://myanimelist.net/${props.type}/${props.idMal}/${formatTitleToUrl(props.title)}/`} target="_blank">MyAnimeList</a>
              </li>
            </Show>
            <Show when={props.hashtag}>
              <li>
                <a href={`https://x.com/search?q=${props.hashtag}&src=typd`} target="_blank">{props.hashtag}</a>
              </li>
            </Show>
            <For each={props.externalLinks}>{link => (
              <li class="cp-external-link">
                <div class="icon" style={{background: link.color}}>
                  <Show when={link.icon} fallback={
                    <Link />
                  }>
                    <img src={link.icon} alt="Site favicon." />
                  </Show>
                </div>
                <span>
                  <a href={link.url} target="_blank">{link.site || link.name}</a>
                  <Show when={link.language}>
                    <sup>
                      <Switch fallback={link.language}>
                        <Match when={link.language === "Japanese"}>JP</Match>
                        <Match when={link.language === "English"}>EN</Match>
                      </Switch>
                    </sup>
                  </Show>
                  <Show when={link.notes}> ({link.notes})</Show>
                </span>
              </li>
            )}</For>
          </ul>
        </div>
      </Show>
    </ErrorBoundary>
  );
};
