import { ErrorBoundary, For, Match, Switch } from "solid-js";
import "./ExternalLinks.scss";
import Link from "../../assets/Link";

export default function ExternalLinks(props) {
  return (
    <ErrorBoundary fallback="External links error">
      <Show when={props.hastag || props.externalLinks?.length}>
        <div>
          <h2>External links</h2>
          <ul>
            <Show when={props.hashtag}>
              <li>
                <a href={`https://nitter.net/search?q=${props.hashtag.replaceAll("#", "%23")}`} target="_blank">{props.hashtag}</a>
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
