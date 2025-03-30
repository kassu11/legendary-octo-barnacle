import { useParams } from "@solidjs/router";
import { A } from "../components/CustomA";
import api from "../utils/api";
import { Switch, Match, Show } from "solid-js";
import { formatTitleToUrl } from "../utils/formating";


function Anime() {
  const [animeData] = api.anilist.topAnime();

  return (
    <>
      <h1>Anime</h1>
      <div>
        <Show when={animeData.loading}>
          <p>Loading...</p>
        </Show>
        <Switch>
          <Match when={animeData.error}>
            <span>Error: {animeData.error}</span>
          </Match>
          <Match when={animeData()}>
            <CardRow data={animeData().data.data.Page.media}/>
          </Match>
        </Switch>
      </div>
    </>
  )
}

function CardRow(props) {
  const data = props.data;

  return (
    <For each={data}>
      {card => <Card card={card} />}
    </For>
  );
}

function Card(props) {
  const card = props.card;

  return ( 
    <A href={"/anime/" + card.id + "/" + formatTitleToUrl(card.title.userPreferred)}>
      <img src={card.coverImage.large} alt="" />
      <p>{card.title.userPreferred}</p>
    </A> 
  );
}

export default Anime
