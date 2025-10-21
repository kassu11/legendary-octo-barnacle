export function AnilistMediaInfo(props) {
  const { anilistData } = useMediaInfo();

  return (
    <ErrorBoundary fallback="Anilist media page info error">
      <div class="pg-ani-media-info">
        <Show when={anilistData()?.data}>
          <h1>{anilistData()?.data.title.userPreferred}</h1>
          <ul class="flex-bullet-separator">
            <li>
              <Switch>
                <Match when={anilistData()?.data.type === "MANGA"}>
                  <Switch>
                    <Match when={anilistData()?.data.startDate?.year}>
                      <A href={"/search/manga?year=" + anilistData()?.data.startDate.year}>{anilistData()?.data.startDate.year}</A>
                    </Match>
                    <Match when={anilistData()?.data.startDate?.year == null}>
                      <A href="/search/manga/tba">TBA</A>
                    </Match>
                  </Switch>
                </Match>
                <Match when={anilistData()?.data.type === "ANIME"}>
                  <Switch>
                    <Match when={anilistData()?.data.seasonYear && anilistData()?.data.season}>
                      <A href={"/search/anime/" + anilistData()?.data.season.toLowerCase() + "-" + anilistData()?.data.seasonYear}>{formatingUtils.capitalize(anilistData()?.data.season)} {anilistData()?.data.seasonYear}</A>
                    </Match>
                    <Match when={anilistData()?.data.startDate?.year}>
                      <A href={"/search/anime?year=" + anilistData()?.data.startDate.year}>{anilistData()?.data.startDate.year}</A>
                    </Match>
                    <Match when={anilistData()?.data.startDate?.year == null}>
                      <A href="/search/anime/tba">TBA</A>
                    </Match>
                  </Switch>
                </Match>
              </Switch>
            </li>
            <Show when={Object.entries(searchObjects.searchFormats.ani.media).find(([, val]) => val.api === anilistData()?.data.format)?.[0]}>{formatApiValue => (
              <li>
                <Switch>
                  <Match when={anilistData()?.data.countryOfOrigin !== "JP"}> 
                    <A href={"/search/" + anilistData()?.data.type.toLowerCase() + "?format=" + formatApiValue() + "&country=" + anilistData()?.data.countryOfOrigin}>
                      {formatingUtils.mediaFormat(anilistData()?.data.format)} ({formatingUtils.languageFromCountry(anilistData()?.data.countryOfOrigin)})
                    </A>
                  </Match>
                  <Match when={anilistData()?.data.countryOfOrigin === "JP"}> 
                    <A href={"/search/" + anilistData()?.data.type.toLowerCase() + "?format=" + formatApiValue()}>
                      {formatingUtils.mediaFormat(anilistData()?.data.format)}
                    </A>
                  </Match>
                </Switch>
              </li>
            )}</Show>
            <li>{formatingUtils.mediaStatus(anilistData()?.data.status)}</li>
          </ul>
          <ul>
            <Show when={anilistData()?.data.source}>
              <li>Source: 
                <A href={"/search/" + anilistData()?.data.type.toLowerCase() + "?source=" + Object.entries(searchObjects.searchSources).find(([, val]) => val.api === anilistData()?.data.source)[0]}>
                  {formatingUtils.formatMediaSource(anilistData()?.data.source)}
                </A>
              </li>
            </Show>
            <li>Members: {numberUtils.numberCommas(anilistData()?.data.popularity)}</li>
            <li>Favourites: {numberUtils.numberCommas(anilistData()?.data.favourites)}</li>
          </ul>
        </Show>
      </div>
    </ErrorBoundary>
  )
}
