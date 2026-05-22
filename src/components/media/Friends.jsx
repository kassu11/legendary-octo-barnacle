import { createEffect, createRenderEffect, createSignal, ErrorBoundary, For, Show } from "solid-js";
import Status from "./Status";
import Score from "./Score";
import style from "./Friends.module.scss";
import { A, useParams, useSearchParams } from "@solidjs/router";
import { useMediaInfo } from "../../context/providers";
import { queries } from "../../collections/collections.js";
import { RepeatIcon } from "../../assets/RepeatIcon.jsx";
import { createAnilistFetcher, sendAnilistFetcher } from "../../utils/fetcherUtils";
import { authUserData } from "../../core/globalState";

function Friends() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [friendScoreData, setFriendScoreData] = createSignal();

  let fetcher;
  let controller;
  createEffect(() => {
    const id = searchParams.isMalId != null ? anilistData()?.data.data.Media.id : params.id;
    if (!id) return;
    controller?.abort();
    controller = new AbortController();

    fetcher = createAnilistFetcher(queries.anilistGetFriendMediaScore, { id, page: 1, perPage: 8 }, controller.signal);
    sendAnilistFetcher(fetcher, {
      name: "Anilist friends",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === fetcher.cacheKey) controller = null;
      },
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === fetcher.cacheKey) setFriendScoreData(res);
      }
    });
  });

  const { anilistData } = useMediaInfo();
  const [ownProfileInfo, setOwnProfileInfo] = createSignal();

  createRenderEffect(() => {
    if (anilistData()?.data.data.Media?.mediaListEntry && authUserData()) {
      setOwnProfileInfo({
        ...anilistData().data.data.Media?.mediaListEntry,
        user: authUserData().data,
      });
    } else {
      setOwnProfileInfo(null);
    }
  });

  return (
    <ErrorBoundary fallback="Friends error">
      <Show when={(friendScoreData()?.data.data.Page.mediaList.length || ownProfileInfo()) && anilistData() && authUserData()}>
        <div class={style.friendContainer}>
          <ul>
            <Show when={ownProfileInfo()}>
              <Friend friend={ownProfileInfo()} />
            </Show>
            <For each={friendScoreData()?.data.data.Page.mediaList}>{friend => (
              <Show when={friend.user.id !== authUserData()?.data.id}>
                <Friend friend={friend} />
              </Show>
            )}</For>
          </ul>
        </div>
      </Show>
    </ErrorBoundary>
  );
}

export default Friends;

function Friend(props) {
  const { anilistData } = useMediaInfo();

  return (
    <li>
      <A class={style.friend} href={"/user/" + props.friend.user.name}>
        <img src={props.friend.user.avatar.large} alt="User profile" />
        <p>{props.friend.user.name}</p>
        <Status friend={props.friend} media={anilistData()?.data.data.Media} type={anilistData()?.data.data.Media.type} />
        <Show when={props.friend.repeat}>
          <div class={style.friendRepeat}>
            {props.friend.repeat}
            <RepeatIcon />
          </div>
        </Show>
        <Score format={props.friend.user.mediaListOptions.scoreFormat} score={props.friend.score} />
      </A>
    </li>
  );
}
