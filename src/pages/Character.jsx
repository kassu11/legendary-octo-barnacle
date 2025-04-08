import { A, useParams } from "@solidjs/router";
import api from "../utils/api";
import { Switch, Match, Show } from "solid-js";
import { Markdown } from "../components/Markdown";
import { assert } from "../utils/assert";
import { formatAnilistDate, formatTitleToUrl } from "../utils/formating";


function Character() {
  const params = useParams();
  const [characterData] = api.anilist.characterId(() => params.id);

  return (
    <>
      <h1>AniList Character {params.id}</h1>
      <div>
        <Show when={characterData.loading}>
          <p>Loading...</p>
        </Show>
        <Switch>
          <Match when={characterData.error}>
            <span>Error: {characterData.error}</span>
          </Match>
          <Match when={characterData()}>
            <CharacterInfo data={characterData().data.data.Character}></CharacterInfo>
          </Match>
        </Switch>
      </div>
    </>
  )
}

function CharacterInfo(props) {
  assert(props.data, "Data missing");
  assert(props.data?.id, "Id missing");

  return (
    <ul>
      <li>
        <b>Image:</b>
        <img src={props.data.image.large} alt="Character" />
      </li>
      <li><b>Name: </b> {props.data.name.userPreferred}</li>
      <li>
        <b>Alternative names:</b> 
        <ul>
          <For each={props.data.name.alternative}>{name => (
            <li>{name}</li>
          )}</For>
        </ul>
      </li>
      <li>
        <b>Alternative spoilers names:</b> 
        <ul>
          <For each={props.data.name.alternativeSpoiler}>{name => (
            <li>{name}</li>
          )}</For>
        </ul>
      </li>
      <li><a target="_blank" href={`https://anilist.co/character/${props.data.id}/${props.data.name.full}`}>AniList</a></li>
      <Switch>
        <Match when={props.data.age?.endsWith("-")}>
          <li>
            <b>Initial Age:</b> {props.data.age.substring(0, props.data.age.length - 1)}
          </li>
        </Match>
        <Match when={props.data.age}>
          <li><b>Age:</b> {props.data.age}</li>
        </Match>
      </Switch>
      <li><b>Birthday:</b> {formatAnilistDate(props.data.dateOfBirth)}</li>
      <li><b>Gender:</b> {props.data.gender}</li>
      <li><b>Description:</b> <Markdown children={props.data.description} /></li>
      <li><b>Series character is in:</b><br/>
        <CardRow data={props.data.media.edges}></CardRow>
      </li>
    </ul>
  )

}

function CardRow(props) {
  return (
    <For each={props.data}>
      {card => <Card card={card} />}
    </For>
  );
}

function Card(props) {
  return ( 
    <A href={"/" + props.card.node.type.toLowerCase() + "/" + props.card.node.id + "/" + formatTitleToUrl(props.card.node.title.userPreferred)}>
      <img src={props.card.node.coverImage.large} alt="" />
      <p>{props.card.node.title.userPreferred}</p>
    </A> 
  );
}


export default Character
