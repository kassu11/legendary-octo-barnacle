import { createRenderEffect, createSignal, ErrorBoundary, For, Show } from "solid-js";
import Status from "./Status";
import Score from "./Score";
import style from "./Friends.module.scss";
import { A, useParams, useSearchParams } from "@solidjs/router";
import { useAuthentication, useMediaInfo } from "../../context/providers";
import { fetcherSenderUtils } from "../../utils/utils";
import { fetchersOLD, fetcherSendersOLD, requests } from "../../collections/collections.js";
import { RepeatIcon } from "../../assets/RepeatIcon.jsx";

function Friends() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { accessToken, authUserData } = useAuthentication();

  const { anilistData } = useMediaInfo();
  const friendScoreFetcher = fetcherSenderUtils.createFetcherOLD(
    fetchersOLD.anilist.getFrendScoresFromMedia, 
    () => ({ token: accessToken(), id: searchParams.isMalId != null ? anilistData()?.data.data.Media?.id : params.id, page: 1, perPage: 8, })
  );
  const cacheType = fetcherSenderUtils.createDynamicCacheType({
    "default": () => requests.anilist.inFiveSeconds() > 1,
    "only-if-cached": () => requests.anilist.inFiveSeconds() > 2
  });

  const [friendScoreData] = fetcherSendersOLD.sendWithCacheTypeWithoutNullUpdates(cacheType, friendScoreFetcher);

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
