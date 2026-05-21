import { createEffect, createSignal, For } from "solid-js";
import { CurrentCardsScoped } from "./CurrentCards.scoped.jsx";
import "./CurrentWatchingMedia.scoped.css";
import { queries } from "../../collections/collections.js";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils.js";
import { authedUserId, token2 } from "../../core/globalState.js";
import { isTypeFunction } from "../../utils/functionUtils.js";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";
import { setFetcherValueToStorage } from "../../utils/storageUtils.js";
import { weekInSeconds } from "../../collections/time.js";

export function CurrentWatchingMediaScoped() {
  const [data, setData] = createSignal();
  const [loading, setLoading] = createSignal(false);
  const [time, startTimer, stopTimer] = createTimer();

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
      // debug: false,
      // file: "watching.json",
      onStart: time => {
        setLoading(true);
        startTimer(time);
      },
      onStop: time => {
        setLoading(false);
        stopTimer(time);
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
    if (mutation) setFetcherValueToStorage(mutation);
  }

  return (
    <>
      <div class="pg-home-current">
        <p>{formatMSToString(time())}</p>
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
  const now = new Date() / 1000;

  // 1. Loop manga and anime lists
  for (const row of Object.values(res.data.data)) {
    // 2. Loop all type specific lists like watching, rewatching etc.
    for (const { name, entries } of row.lists) {
      const airing = [];
      const list = { name, entries: [] };
      entries.sort((a, b) => b.updatedAt - a.updatedAt);
      for (const entry of entries) {
        // 3. Check if entry episode has already aired
        if (entry.media.nextAiringEpisode?.airingAt < now) {
          // 3.1 How many episodes can still air (if not known cap to 99999)
          const max = Math.max((entry.media.episodes || 99999) - entry.media.nextAiringEpisode.episode, 0);
          // 3.2 How many weeks is entry behind
          const over = Math.min(Math.ceil((now - entry.media.nextAiringEpisode.airingAt) / weekInSeconds), max);
          // 3.3 Entry is so far back that all episodes should be out. Remove nextAiringInfo
          if (over === max) {
            entry.media.nextAiringEpisode = null;
          } else {
            // 3.4 We are behind, so add missing episode and cooldown timers (assume that series releases weekly)
            entry.media.nextAiringEpisode.airingAt += weekInSeconds * over;
            entry.media.nextAiringEpisode.episode += over;
          }
        }

        // 4. Add entry to airing list
        if (entry.media.nextAiringEpisode) airing.push(entry);
        else list.entries.push(entry);
      }

      airing.sort((a, b) => {
        return a.media.nextAiringEpisode.airingAt - b.media.nextAiringEpisode.airingAt;
      });

      // 5. There is multiple airing anime, so lets split them
      if (airing.length < splitCount) list.entries.unshift(...airing);
      else lists.push({ name: name + " (Airing)", entries: airing })

      lists.push(list);
    }
  }

  return lists;
}
