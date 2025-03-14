import { useParams } from "@solidjs/router";
import { A } from "../CustomA";
import api from "../utils/api";
import { createResource, Switch, Match, Show } from "solid-js";


function Anime() {
  const [animeData] = createResource(api.anilist.topAnime);

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
    <A href={"/anime/" + card.id + "/" + card.title.userPreferred}>
      <img src={card.coverImage.large} alt="" />
      <p>{card.title.userPreferred}</p>
    </A> 
  );
}

export default Anime
