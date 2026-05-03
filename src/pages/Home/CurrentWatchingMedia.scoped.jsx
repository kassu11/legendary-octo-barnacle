import { createEffect, createSignal, For } from "solid-js";
import { CurrentCardsScoped } from "./CurrentCards.scoped.jsx";
import "./CurrentWatchingMedia.scoped.css";
import { queries } from "../../collections/collections.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils.js";
import { authedUserId, token2 } from "../../core/globalState.js";
import { setIndexedDBValue } from "../../utils/indexedDButils.js";
import { isTypeFunction } from "../../utils/functionUtils.js";

export function CurrentWatchingMediaScoped() {
  const [data, setData] = createSignal();
  const [loading, setLoading] = createSignal(false);

  let controller, cacheData;
  createEffect(() => {
    const id = authedUserId();
    const t = token2();
    if (!t || !id) return;

    controller?.abort();
    controller = new AbortController();

    const fetcher = createAnilistFetcher(queries.anilistCurrentWachingMedia2, {
      "userId": id,
      "statusIn": ["CURRENT", "REPEATING"]
    }, controller.signal);

    sendAnilistFetcher(fetcher, {
      name: "Currently watching",
      // file: "watching.json",
      onStart: () => {
        setLoading(true);
      },
      onStop: () => {
        setLoading(false);
      },
      setValue: res => {
        cacheData = res;
        setData(parseCurrentlyWatching(res));
      }
    });
  });

  const mutateCache = (mutation) => {
    if (!cacheData?.cacheKey) return;
    mutation = isTypeFunction(mutation) ? mutation(cacheData) : mutation;
    if (mutation) setIndexedDBValue("fetches", mutation);
  }

  return (
    <>
      <div class="pg-home-current">
        <For each={data()}>{row => (
          <CurrentCardsScoped cards={row.entries} mutateCache={mutateCache} loading={loading()} />
        )}</For>
      </div>
    </>
  );
}

function parseCurrentlyWatching(res) {
  const lists = [];
  const splitCount = 5;

  // 1. Loop manga and anime lists
  for (const row of Object.values(res.data.data)) {
    // 2. Loop all type specific lists like watching, rewatching etc.
    for (const { name, entries } of row.lists) {
      const airing = [];
      const list = { name, entries: [] };
      entries.sort((a, b) => b.updatedAt - a.updatedAt);
      for (const entry of entries) {
        // 3. Add entry to airing list
        if (entry.media.nextAiringEpisode) airing.push(entry);
        else list.entries.push(entry);
      }

      airing.sort((a, b) => {
        return a.media.nextAiringEpisode.airingAt - b.media.nextAiringEpisode.airingAt;
      });

      // 4. There is multiple airing anime, so lets split them
      if (airing.length < splitCount) list.entries.unshift(...airing);
      else lists.push({ name: name + " (Airing)", entries: airing })

      lists.push(list);
    }
  }

  return lists;
}
