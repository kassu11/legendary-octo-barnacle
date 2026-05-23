import { A, useParams } from "@solidjs/router";
import { Match, Show, Switch } from "solid-js";
import Anilist from "../../assets/Anilist.jsx";
import MyAnimeList from "../../assets/MyAnimeList.jsx";
import ExternalSource from "../../assets/ExternalSource.jsx";
import { formatingUtils } from "../../utils/utils.js";
import "./MediaPageApiSwitcher.scoped.css";
import { localizations } from "../../collections/collections.js";

export function MediaPageApiSwitcher(props) {
  const params = useParams();

  return (
    <div class="cp-media-api-switcher">
      <Switch>
        <Match when={params.api === localizations.mal}>
          <Show when={props.anilistData()?.data.data.Media?.id}>
            <A
              href={"/ani/" + params.type + "/" + props.anilistData()?.data.data.Media?.id + "/" + formatingUtils.titleToUrl(props.anilistData()?.data.data.Media?.title.userPreferred)}>
              <span class="visually-hidden">Switch to anilist mode</span>
              <Anilist />
            </A>
          </Show>
          <a href={props.jikanData()?.data.url} class="active" target="_black">
            <span class="visually-hidden">Go to MyAnimeList</span>
            <MyAnimeList />
            <ExternalSource />
          </a>
        </Match>
        <Match when={params.api === localizations.ani}>
          <Show when={props.anilistData()?.data.data.Media?.id}>
            <a href={"https://anilist.co/" + params.type + "/" + (props.anilistData()?.data.data.Media.id ?? params.id)} target="_black" class="active">
              <span class="visually-hidden">Go to Anilist</span>
              <Anilist />
              <ExternalSource />
            </a>
          </Show>
          <Show when={props.anilistData()?.data.data.Media.idMal}>
            <A href={"/mal/" + params.type + "/" + props.anilistData()?.data.data.Media.idMal + "/" + params.name}>
              <span class="visually-hidden">Switch to MyAnimeList mode</span>
              <MyAnimeList />
            </A>
          </Show>
        </Match>
      </Switch>
    </div>
  )
}
