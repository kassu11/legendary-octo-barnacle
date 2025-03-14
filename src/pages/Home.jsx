import { A } from "../CustomA";
import api from "../utils/api";
import { createResource, Switch, Match, Show } from "solid-js";


function Home() {
  const [trendingAnime] = createResource(api.anilist.trendingAnime);

  return (
    <>
      <h1>Home</h1>
      <div>
        <Show when={trendingAnime.loading}>
          <p>Loading...</p>
        </Show>
        <Switch>
          <Match when={trendingAnime.error}>
            <span>Error: {trendingAnime.error}</span>
          </Match>
          <Match when={trendingAnime()}>
            <AnimeInfo data={trendingAnime().data.data}></AnimeInfo>
          </Match>
        </Switch>
      </div>
    </>
  )
}

function AnimeInfo(props) {

  const trending = props.data;
  return (
    <ul>
      <CardRow data={trending.nextSeason.media} title="Next Season" />
      <CardRow data={trending.popular.media} title="Popular" />
      <CardRow data={trending.season.media} title="Season" />
      <CardRow data={trending.top.media} title="Top" />
      <CardRow data={trending.trending.media} title="Trending" />
    </ul>
  )

}

function CardRow(props) {
  const data = props.data;

  return (
    <li style="display: flex; gap: 5px;">
      <b>{props.title}:</b>
      <For each={data}>
        {card => <Card card={card} />}
      </For>
    </li>
  );
}

function Card(props) {
  const card = props.card;

  return (
    <A href={"/anime/" + card.id + "/" + card.title.userPreferred}>
      <img src={card.coverImage.large} alt="" />
      <p>{card.title.userPreferred}</p>
    </A>
  );
}


export default Home
