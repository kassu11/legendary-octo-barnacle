import { createRenderEffect, createSignal, ErrorBoundary, For, Show } from "solid-js";
import Status from "./Status";
import Score from "./Score";
import style from "./Friends.module.scss";
import { A, useParams } from "@solidjs/router";
import { useAuthentication, useMediaInfo } from "../../context/providers";
import { apiRequestManager, fetchers, fetcherSenders, fetcherUtils } from "../../utils/utils";

function Friends() {
  const params = useParams();
  const { accessToken, authUserData } = useAuthentication();

  const { anilistData } = useMediaInfo();
  const friendScoreFetcher = fetcherUtils.createSignalFetcher(fetchers.anilist.getFrendScoresFromMedia, accessToken, () => params.id, { page: 1, perPage: 8 });
  const [friendScoreData] = fetcherSenders.sendDefaultOrCacheOnlyWithoutNullValues(() => apiRequestManager.anilist.inFiveSeconds() > 1, () => apiRequestManager.anilist.inFiveSeconds() > 2, friendScoreFetcher);

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
            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"></path></svg>
          </div>
        </Show>
        <Score format={props.friend.user.mediaListOptions.scoreFormat} score={props.friend.score} />
      </A>
    </li>
  );
}
