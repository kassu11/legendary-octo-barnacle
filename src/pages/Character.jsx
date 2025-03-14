import { useParams } from "@solidjs/router";
import { A } from "../CustomA";
import api from "../api";
import { createResource, Switch, Match, Show } from "solid-js";
import { Markdown } from "../Markdown";


function Character() {
  const params = useParams();
  const id = Number(params.id);

  console.assert(!Number.isNaN(id), "ID should not be NaN");
  const [characterData] = createResource(id, api.anilist.characterId);

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
  console.assert(props.data, "Data missing");
  console.assert(props.data?.id, "Id missing");

  console.log(props.data);
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
      <li><b>age:</b> {props.data.age}</li>
      <li><b>Age:</b> {props.data.age}</li>
      <li><b>DateOfBirth:</b> {JSON.stringify(props.data.dateOfBirth)}</li>
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
    <A href={"/anime/" + props.card.node.id + "/" + props.card.node.title.userPreferred}>
      <img src={props.card.node.coverImage.large} alt="" />
      <p>{props.card.node.title.userPreferred}</p>
    </A> 
  );
}


export default Character
