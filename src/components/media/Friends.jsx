import { createRenderEffect, createSignal, ErrorBoundary, For, Show } from "solid-js";
import Status from "./Status";
import Score from "./Score";
import style from "./Friends.module.scss";
import { A, useParams } from "@solidjs/router";
import { useAuthentication, useMediaInfo } from "../../context/providers";
import { fetcherSenderUtils, fetcherUtils } from "../../utils/utils";
import { fetchers, fetcherSenders, requests } from "../../collections/collections.js";
import { RepeatIcon } from "../../assets/RepeatIcon.jsx";

function Friends() {
  const params = useParams();
  const { accessToken, authUserData } = useAuthentication();

  const { anilistData } = useMediaInfo();
  const friendScoreFetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.getFrendScoresFromMedia, accessToken, () => params.id, { page: 1, perPage: 8 });
  const cacheType = fetcherSenderUtils.createDynamicCacheType({
    "default": () => requests.anilist.inFiveSeconds() > 1,
    "only-if-cached": () => requests.anilist.inFiveSeconds() > 2
  });

  const [friendScoreData] = fetcherSenders.sendWithCacheTypeWithoutNullUpdates(cacheType, friendScoreFetcher);

  const [ownProfileInfo, setOwnProfileInfo] = createSignal();

  createRenderEffect(() => {
    if (anilistData()?.data?.mediaListEntry && authUserData()) {
      setOwnProfileInfo({
        ...anilistData().data?.mediaListEntry,
        user: authUserData().data,
      });
    } else {
      setOwnProfileInfo(null);
    }
  });

  return (
    <ErrorBoundary fallback="Friends error">
      <Show when={(friendScoreData()?.data?.mediaList.length || ownProfileInfo()) && anilistData() && authUserData()}>
        <div class={style.friendContainer}>
          <ul>
            <Show when={ownProfileInfo()}>
              <Friend friend={ownProfileInfo()} />
            </Show>
            <For each={friendScoreData()?.data?.mediaList}>{friend => (
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
        <Status friend={props.friend} media={anilistData()?.data} type={anilistData()?.data.type} />
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
