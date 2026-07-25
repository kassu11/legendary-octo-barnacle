import { A, useParams } from "@solidjs/router";
import { createEffect, createSignal, For, on, Show } from "solid-js";
import { formatTitleToUrl } from "../../../../utils/formating.js";
import { queries } from "../../../../collections/collections.js";
import "./GenreMediaCards.scoped.css";
import { createAnilistFetcher, sendAnilistFetcher } from "../../../../utils/fetcherUtils.js";
import { createCleanUpAbortController } from "../../../../utils/abortUtils.js";

export function GenreMediaCardsScoped(props) {
  const params = useParams();
  const [mediaIds, setMediaIds] = createSignal(new Set());

  const mediaController = createCleanUpAbortController();
  let mediaFetcher;
  createEffect(() => {
    const ids = [...mediaIds()];
    if (!ids.length) return;
    const signal = mediaController.abortAndRenew();

    mediaFetcher = createAnilistFetcher(queries.anilistGetMediasWithIds(ids.length), { id_in: ids }, signal);

    sendAnilistFetcher(mediaFetcher, {
      name: "Anilist media ids",
      onFetch: () => mediaController.disable(),
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey !== mediaFetcher.cacheKey) return;
        Object.values(res.data.data).forEach(page => {
          page.media.forEach(m => {
            props.setStore(m.id, m);
          });
        });
      }
    });
  });

  let fetchNewCards = false;
  createEffect(on(() => props.mediaIds, () => {
    fetchNewCards = true;
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
