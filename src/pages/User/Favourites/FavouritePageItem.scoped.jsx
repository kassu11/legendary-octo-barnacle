import { A } from "@solidjs/router";
import { createSignal, Match, Show, Switch } from "solid-js";
import { formatTitleToUrl, mediaUrl } from "../../../utils/formating.js";
import { useFavourites } from "../../../context/providers.js";
import { DeleteFavouriteScoped } from "./DeleteFavourite.scoped.jsx";
import "./FavouritePageItem.scoped.css"

export function FavouritePageItemScoped(props) {
  const [hidden, setHidden] = createSignal(false);
  const { setAllEdges, type } = useFavourites();
  const removeEdgeId = (id) => setAllEdges(edges => edges.filter(edge => edge.node.id !== id));

  return (
    <li classList={{hidden: hidden()}} attr:data-id={props.edge.node.id}>
      <Switch>
        <Match when={type === "anime"}>
          <A href={mediaUrl(props.edge.node)}>
            <DeleteFavouriteScoped animeId={props.edge.node.id} onClick={() => setHidden(true)} mutate={() => removeEdgeId(props.edge.node.id)} />
            <img src={props.edge.node.coverImage.large} alt="Cover" />
          </A>
        </Match>
        <Match when={type === "manga"}>
          <A href={mediaUrl(props.edge.node)}>
            <DeleteFavouriteScoped mangaId={props.edge.node.id} onClick={() => setHidden(true)} mutate={() => removeEdgeId(props.edge.node.id)} />
            <img src={props.edge.node.coverImage.large} alt="Cover" />
          </A>
        </Match>
        <Match when={type === "characters"}>
          <A href={"/ani/character/" + props.edge.node.id + "/" + formatTitleToUrl(props.edge.node.name.userPreferred)}>
            <DeleteFavouriteScoped characterId={props.edge.node.id} onClick={() => setHidden(true)} mutate={() => removeEdgeId(props.edge.node.id)} />
            <img src={props.edge.node.image.large} alt="Cover" />
          </A>
        </Match>
        <Match when={type === "staff"}>
          <A href={"/ani/staff/" + props.edge.node.id + "/" + formatTitleToUrl(props.edge.node.name.userPreferred)}>
            <DeleteFavouriteScoped staffId={props.edge.node.id} onClick={() => setHidden(true)} mutate={() => removeEdgeId(props.edge.node.id)} />
            <img src={props.edge.node.image.large} alt="Cover" />
          </A>
        </Match>
        <Match when={type === "studios"}>
          <A href={"/ani/studio/" + props.edge.node.id + "/" + formatTitleToUrl(props.edge.node.name)}>
            <DeleteFavouriteScoped studioId={props.edge.node.id} onClick={() => setHidden(true)} mutate={() => removeEdgeId(props.edge.node.id)} />
            {props.edge.node.name}
          </A>
        </Match>
      </Switch>
    </li>
  );
}
