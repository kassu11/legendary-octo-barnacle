import { createEffect, createSignal, For, Show } from "solid-js";
import { CurrentCardsScoped } from "./CurrentCards.scoped.jsx";
import "./CurrentWatchingMedia.scoped.css";
import { modes, queries, signals, timeCollection } from "../../collections/collections.js";
import { token2, authUserData } from "../../context/AuthenticationContext.jsx";
import { createAnilistFetcher, createFetcher, sendAnilistFetcher, sendFetcher } from "../../utils/fetcherUtils.js";

const PICTURE_MODE = 0;
const TEXT_MODE = 1;

export function CurrentWatchingMediaScoped() {
  const [data, setData] = createSignal();

  let controller;
  createEffect(() => {
    const id = authUserData()?.data.id;
    const t = token2();
    if (!t || !id) return;

    controller?.abort();
    controller = new AbortController();

    const fetcher = createAnilistFetcher(queries.anilistCurrentWachingMedia2, {
      "userId": id,
      "statusIn": ["CURRENT", "REPEATING"]
    }, controller.signal);

    sendAnilistFetcher(fetcher, {
      setValue: (res) => {
        console.log(Object.values(res.data.data).map(e => e.lists).flat());
        setData(Object.values(res.data.data).map(e => e.lists).flat());
      }
    });
  });

  return (
    <>
      <For each={data()}>{row => (
        <>
          <p>{row.name}</p>
          <For each={row.entries}>{entry => (
            <div style={{ "background-image": `url("${entry.media.coverImage.large}")` }}>
              <div>{entry.media.title.userPreferred}</div>
            </div>
          )}</For>
        </>
      )}</For>
    </>
  );
}

