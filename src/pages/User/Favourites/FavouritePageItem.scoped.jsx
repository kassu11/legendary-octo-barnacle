import { A } from "@solidjs/router";
import { createSignal, Match, Switch } from "solid-js";
import { formatTitleToUrl, mediaUrl } from "@/utils/formatUtils.js";
import { useFavourites } from "@/state/providers.js";
import { DeleteFavourite } from "./DeleteFavourite.scoped.jsx";
import "./FavouritePageItem.scoped.css"

export function FavouritePageItemScoped(props) {
  const [hidden, setHidden] = createSignal(false);
  const { setAllEdges, type, reorder } = useFavourites();
  const removeEdgeId = (id) => setAllEdges(edges => edges.filter(edge => edge.node.id !== id));

  return (
    <li class="favourite-item" classList={{hidden: hidden(), reorder: reorder(), studio: type === "studios"}} attr:data-id={props.edge.node.id}>
      <Switch>
        <Match when={type === "anime"}>
          <A scoped href={mediaUrl(props.edge.node)}>
            <DeleteFavourite scoped class="delete-favourite" animeId={props.edge.node.id} onClick={() => setHidden(true)} mutate={() => removeEdgeId(props.edge.node.id)} />
            <img src={props.edge.node.coverImage.large} alt="Cover" />
          </A>
        </Match>
        <Match when={type === "manga"}>
          <A scoped href={mediaUrl(props.edge.node)}>
            <DeleteFavourite scoped class="delete-favourite" mangaId={props.edge.node.id} onClick={() => setHidden(true)} mutate={() => removeEdgeId(props.edge.node.id)} />
            <img src={props.edge.node.coverImage.large} alt="Cover" />
          </A>
        </Match>
        <Match when={type === "characters"}>
          <A scoped href={"/ani/character/" + props.edge.node.id + "/" + formatTitleToUrl(props.edge.node.name.userPreferred)}>
            <DeleteFavourite scoped class="delete-favourite" characterId={props.edge.node.id} onClick={() => setHidden(true)} mutate={() => removeEdgeId(props.edge.node.id)} />
            <img src={props.edge.node.image.large} alt="Cover" />
          </A>
        </Match>
        <Match when={type === "staff"}>
          <A scoped href={"/ani/staff/" + props.edge.node.id + "/" + formatTitleToUrl(props.edge.node.name.userPreferred)}>
            <DeleteFavourite scoped class="delete-favourite" staffId={props.edge.node.id} onClick={() => setHidden(true)} mutate={() => removeEdgeId(props.edge.node.id)} />
            <img src={props.edge.node.image.large} alt="Cover" />
          </A>
        </Match>
        <Match when={type === "studios"}>
          <A scoped href={"/ani/studio/" + props.edge.node.id + "/" + formatTitleToUrl(props.edge.node.name)}>
            <DeleteFavourite scoped class="delete-favourite" studioId={props.edge.node.id} onClick={() => setHidden(true)} mutate={() => removeEdgeId(props.edge.node.id)} />
            {props.edge.node.name}
          </A>
        </Match>
      </Switch>
    </li>
  );
}
