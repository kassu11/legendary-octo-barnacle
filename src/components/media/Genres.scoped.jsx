export const Genres = (props) => {
  return (
    <ErrorBoundary fallback="Genres error">
      <Show when={props.genres?.length}>
        <div class="wrapper" classList={{loading: props.loading}}>
          <h2>
            <A class="clean-link" href={"/search/" + props.type.toLowerCase() + "?" + props.genres.map(genre => "genre=" + genre).join("&")}>
              Genres
            </A>
          </h2>
          <ul class="genres">
            <For each={props.genres}>{genre => (
              <li class="genre">
                <A class="clean-link" href={"/search/" + props.type.toLowerCase() + "?genre=" + genre}>
                  {genre}
                </A>
              </li>
            )}</For>
          </ul>
        </div>
      </Show>
    </ErrorBoundary>
  );
};
