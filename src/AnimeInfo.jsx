import { useParams } from "@solidjs/router";
import api from "./api";
import { createResource, Switch, Match, Show } from "solid-js";


function Anime() {
  const params = useParams();
  const id = Number(params.id);

  console.assert(!Number.isNaN(id), "ID should not be NaN");
  const [animeData] = createResource(id, api.anilist.mediaId);

  return (
    <>
      <h1>Anime {params.id}</h1>
      <div>
        <Show when={animeData.loading}>
          <p>Loading...</p>
        </Show>
        <Switch>
          <Match when={animeData.error}>
            <span>Error: {animeData.error}</span>
          </Match>
          <Match when={animeData()}>
            <AnimeInfo data={animeData().data.data.Media}></AnimeInfo>
          </Match>
        </Switch>
      </div>
    </>
  )
}

function AnimeInfo(props) {
  console.assert(props.data, "Data missing");
  console.assert(props.data?.id, "Id missing");

  const anime = props.data;
  return (
    <ul>
      <li>
        <b>Banner:</b>
        <img src={anime.bannerImage} alt="Banner" />
      </li>
      <li><b>Title EN:</b> {anime.title.english}</li>
      <li><b>Title native:</b> {anime.title.native}</li>
      <li><b>Title romaji:</b> {anime.title.romaji}</li>
      <li>
        <b>Cover:</b>
        <img src={anime.coverImage.large} alt="Cover" />
      </li>
      <li><b>Description:</b> {anime.description}</li>
      <li><b>Type:</b> {anime.type}</li>
      <li><b>Season:</b> {anime.season}</li>
      <li><b>SeasonYear:</b> {anime.seasonYear}</li>
      <li><b>status:</b> {anime.status}</li>
      <li><b>format:</b> {anime.format}</li>
      <li><b>date:</b> {JSON.stringify(anime.startDate)}</li>
      <li><b>Mean Score:</b> {anime.meanScore / 10}</li>
      <li><b>Average Score:</b> {anime.averageScore / 10}</li>
    </ul>
  )

}


export default Anime
