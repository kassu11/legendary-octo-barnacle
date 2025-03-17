import { useParams } from "@solidjs/router";
import { A } from "../components/CustomA";
import api from "../utils/api";
import { Switch, Match, Show } from "solid-js";


function Manga() {
  const params = useParams();
  const id = Number(params.id);

  console.assert(!Number.isNaN(id), "ID should not be NaN");
  const [mangaData] = api.anilist.mediaId(id);

  return (
    <>
      <h1>Anime {params.id}</h1>
      <div>
        <Show when={mangaData.loading}>
          <p>Loading...</p>
        </Show>
        <Switch>
          <Match when={mangaData.error}>
            <span>Error: {mangaData.error}</span>
          </Match>
          <Match when={mangaData()}>
            <MangaInfo data={mangaData().data.data.Media}></MangaInfo>
          </Match>
        </Switch>
      </div>
    </>
  )
}

function MangaInfo(props) {
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
      <li><a target="_blank" href={`https://myanimelist.net/anime/${anime.idMal}/`}>MyAnimeList</a></li>
      <li><a target="_blank" href={`https://anilist.co/anime/${anime.id}/`}>AniList</a></li>
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
      <li>
        <b><A href="characters">Characters:</A></b>
        <For each={anime.characterPreview.edges}>{char => (
          <div>
            <A href={"/ani/character/" + char.node.id}>
              <span>{char.node.name.userPreferred}</span><br />
              <img src={char.node.image.large} alt="character" /><br />
            </A>
            <For each={char.voiceActors}>{actor => (
              <A href={"/ani/staff/" + actor.id}>
                <span>{actor.name.userPreferred}</span><br />
                <img src={actor.image.large} alt="character" /><br />
              </A>
            )}</For>
          </div>
        )}</For>
      </li>
    </ul>
  )

}


export default Manga
