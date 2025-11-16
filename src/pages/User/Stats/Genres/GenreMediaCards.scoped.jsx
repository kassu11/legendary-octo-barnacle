import {A, useParams} from "@solidjs/router";
import {useAuthentication} from "../../../../context/providers.js";
import {createEffect, createSignal, For, on, Show} from "solid-js";
import {formatTitleToUrl} from "../../../../utils/formating.js";
import { fetchers } from "../../../../collections/collections.js";
import "./GenreMediaCards.scoped.css";

export function GenreMediaCardsScoped(props) {
  const params = useParams();
  const {accessToken} = useAuthentication();
  const [mediaIds, setMediaIds] = createSignal(new Set());
  const mediaVariable = () => ({id_in: [...mediaIds()]});
  const fetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.getMediasWithIds, accessToken, mediaVariable);
  const [mediaById] = fetcherSenders.sendWithNullUpdates(fetcher);

  let fetchNewCards = false;
  createEffect(on(() => props.mediaIds, () => {
    fetchNewCards = true;
  }));

  createEffect(on(mediaById, medias => {
    medias?.data.forEach(media => props.setStore(media.id, media));
  }));

  return (
    <div class="inline-container">
      <ol class="grid-reel-auto-fill" onScroll={() => {
        if (!fetchNewCards) {
          return;
        }
        fetchNewCards = false;

        const set = new Set(props.mediaIds);
        const newFetchData = set.difference(props.allMediaIds);
        newFetchData.forEach(id => props.allMediaIds.add(id));
        setMediaIds(newFetchData);
      }}>
        <For each={props.mediaIds}>{mediaId => (
          <li>
            <A
              href={"/ani/" + params.type + "/" + mediaId + "/" + formatTitleToUrl(props.store[mediaId]?.title.userPreferred || "")}>
              <Show when={props.store[mediaId]} fallback={<div class="cover-image"></div>}>
                <img class="cover-image" src={props.store[mediaId].coverImage.large} alt="Media cover"/>
              </Show>
            </A>
          </li>
        )}</For>
      </ol>
    </div>
  );
}
