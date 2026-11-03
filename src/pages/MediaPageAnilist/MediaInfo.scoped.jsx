import "./MediaInfo.scoped.css";
import { ErrorBoundary, Match, Show, Switch } from "solid-js";
import { useMediaInfo } from "../../context/providers";
import { A } from "@solidjs/router";
import { formatingUtils, numberUtils } from "../../utils/utils";
import { formatMSToString } from "../../utils/timeUtils";
import { translateToInternalSearchParams } from "../../core/apiTranslations";

export function AnilistMediaInfo(props) {
  const { anilistData } = useMediaInfo();

  return (
    <ErrorBoundary fallback="Anilist media page info error">
      <div class="pg-ani-media-info">
        <Show when={anilistData()}>
          <p class="time">{formatMSToString(props.time())}</p>
          <h1>{anilistData()?.data.data.Media.title.userPreferred}</h1>
          <ul class="flex-bullet-separator">
            <li>
              <Switch>
                <Match when={anilistData()?.data.data.Media.type === "MANGA"}>
                  <Switch>
                    <Match when={anilistData()?.data.data.Media.startDate?.year}>
                      <A href={"/ani/search/manga?year=" + anilistData()?.data.data.Media.startDate.year}>{anilistData()?.data.data.Media.startDate.year}</A>
                    </Match>
                    <Match when={anilistData()?.data.data.Media.startDate?.year == null}>
                      <A href="/ani/search/manga/tba">TBA</A>
                    </Match>
                  </Switch>
                </Match>
                <Match when={anilistData()?.data.data.Media.type === "ANIME"}>
                  <Switch>
                    <Match when={anilistData()?.data.data.Media.seasonYear && anilistData()?.data.data.Media.season}>
                      <A href={"/ani/search/anime/" + anilistData()?.data.data.Media.season.toLowerCase() + "-" + anilistData()?.data.data.Media.seasonYear}>{formatingUtils.capitalize(anilistData()?.data.data.Media.season)} {anilistData()?.data.data.Media.seasonYear}</A>
                    </Match>
                    <Match when={anilistData()?.data.data.Media.startDate?.year}>
                      <A href={"/ani/search/anime?year=" + anilistData()?.data.data.Media.startDate.year}>{anilistData()?.data.data.Media.startDate.year}</A>
                    </Match>
                    <Match when={anilistData()?.data.data.Media.startDate?.year == null}>
                      <A href="/ani/search/anime/tba">TBA</A>
                    </Match>
                  </Switch>
                </Match>
              </Switch>
            </li>
            <Show when={anilistData()?.data.data.Media.format}>
              <li>
                <Switch>
                  <Match when={anilistData()?.data.data.Media.countryOfOrigin !== "JP"}>
                    <A href={"/ani/search/" + anilistData()?.data.data.Media.type.toLowerCase() + "?format=" + translateToInternalSearchParams.format[anilistData()?.data.data.Media.format] + "&country=" + anilistData()?.data.data.Media.countryOfOrigin}>
                      {formatingUtils.mediaFormat(anilistData()?.data.data.Media.format)} ({formatingUtils.languageFromCountry(anilistData()?.data.data.Media.countryOfOrigin)})
                    </A>
                  </Match>
                  <Match when={anilistData()?.data.data.Media.countryOfOrigin === "JP"}>
                    <A href={"/ani/search/" + anilistData()?.data.data.Media.type.toLowerCase() + "?format=" + translateToInternalSearchParams.format[anilistData()?.data.data.Media.format]}>
                      {formatingUtils.mediaFormat(anilistData()?.data.data.Media.format)}
                    </A>
                  </Match>
                </Switch>
              </li>
            </Show>
            <li>{formatingUtils.mediaStatus(anilistData()?.data.data.Media.status)}</li>
          </ul>
          <ul>
            <Show when={anilistData()?.data.data.Media.source}>
              <li>Source: 
                <A href={"/ani/search/" + anilistData()?.data.data.Media.type.toLowerCase() + "?source=" + translateToInternalSearchParams.source[anilistData()?.data.data.Media.source]}>
                  {formatingUtils.formatMediaSource(anilistData()?.data.data.Media.source)}
                </A>
              </li>
            </Show>
            <li>Members: {numberUtils.numberCommas(anilistData()?.data.data.Media.popularity)}</li>
            <li>Favourites: {numberUtils.numberCommas(anilistData()?.data.data.Media.favourites)}</li>
          </ul>
        </Show>
      </div>
    </ErrorBoundary>
  )
}
