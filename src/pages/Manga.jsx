import { A } from "../components/CustomA";
import api from "../utils/api";
import { Switch, Match, Show } from "solid-js";


function Manga() {
  const [mangaData] = api.createResource(api.anilist.topManga);

  return (
    <>
      <h1>Anime</h1>
      <div>
        <Show when={mangaData.loading}>
          <p>Loading...</p>
        </Show>
        <Switch>
          <Match when={mangaData.error}>
            <span>Error: {mangaData.error}</span>
          </Match>
          <Match when={mangaData()}>
            <CardRow data={mangaData().data.data.Page.media}/>
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
    <A href={"/manga/" + card.id + "/" + card.title.userPreferred}>
      <img src={card.coverImage.large} alt="" />
      <p>{card.title.userPreferred}</p>
    </A> 
  );
}

export default Manga
