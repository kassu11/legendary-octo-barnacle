import { A, useParams } from "@solidjs/router";
import { Match, Show, Switch } from "solid-js";
import { AnilistIcon, ExternalLinkIcon, MyAnimeListIcon } from "@/assets/icons.jsx";
import { formatTitleToUrl } from "@/utils/formatUtils.js";
import "./MediaPageApiSwitcher.scoped.css";
import { localizations } from "@/constants/constants.js";

export function MediaPageApiSwitcher(props) {
  const params = useParams();

  return (
    <div class="cp-media-api-switcher">
      <Switch>
        <Match when={params.api === localizations.mal}>
          <Show when={props.anilistData()?.data.data.Media?.id}>
            <A
              href={"/ani/" + params.type + "/" + props.anilistData()?.data.data.Media?.id + "/" + formatTitleToUrl(props.anilistData()?.data.data.Media?.title.userPreferred)}>
              <span class="visually-hidden">Switch to anilist mode</span>
              <AnilistIcon />
            </A>
          </Show>
          <a href={props.jikanData()?.data.data.url} class="active" target="_black">
            <span class="visually-hidden">Go to MyAnimeList</span>
            <MyAnimeListIcon />
            <ExternalLinkIcon class="svg-external-source" />
          </a>
        </Match>
        <Match when={params.api === localizations.ani}>
          <Show when={props.anilistData()?.data.data.Media?.id}>
            <a href={"https://anilist.co/" + params.type + "/" + (props.anilistData()?.data.data.Media.id ?? params.id)} target="_black" class="active">
              <span class="visually-hidden">Go to Anilist</span>
              <AnilistIcon />
              <ExternalLinkIcon class="svg-external-source" />
            </a>
          </Show>
          <Show when={props.anilistData()?.data.data.Media.idMal}>
            <A href={"/mal/" + params.type + "/" + props.anilistData()?.data.data.Media.idMal + "/" + params.name}>
              <span class="visually-hidden">Switch to MyAnimeList mode</span>
              <MyAnimeListIcon />
            </A>
          </Show>
        </Match>
      </Switch>
    </div>
  )
}
