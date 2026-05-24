import { A, useParams } from "@solidjs/router";
import { createEffect, createSignal, Match, Show, Switch } from "solid-js";
import { formatTimeToDate } from "../../utils/formating.js";
import { UserContext, useUser } from "../../context/providers.js";
import "./index(user).scoped.css";
import { queries } from "../../collections/collections.js";
import { createAnilistFetcher, fetcherToFetch, sendAnilistFetcher } from "../../utils/fetcherUtils.js";
import { createTimer, formatMSToString } from "../../utils/timeUtils.js";
import { setFetcherValueToStorage } from "../../utils/storageUtils.js";
import { authUserData } from "../../core/globalState.js";

export function User(props) {
  const params = useParams();

  const [userTime, startUserTimer, stopUserTimer] = createTimer();
  const [loading, setLoading] = createSignal(false);
  const [userData, setUserData] = createSignal(undefined, { equals: false });
  let userFetcher, userController;
  createEffect(() => {
    userController?.abort();
    userController = new AbortController();

    userFetcher = createAnilistFetcher(queries.getUserByName, { name: params.name }, userController.signal);

    sendAnilistFetcher(userFetcher, {
      name: "Anilist user info",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === userFetcher.cacheKey) userController = null;
      },
      onStart: time => {
        startUserTimer(time);
        setLoading(true);
      },
      onStop: time => {
        stopUserTimer(time);
        setLoading(false);
      },
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === userFetcher.cacheKey) {
          setUserData(res);
          document.title = `${res.data.data.User.name} profile - LOB`;
        }
      }
    });
  });

  const following = (status) => {
    setUserData(res => {
      res.data.data.User.isFollowing = status;
      setFetcherValueToStorage(res);
      return res;
    });
  }

  return (
    <UserContext.Provider value={{ user: () => userData().data.data.User, following }}>
      <Switch>
        <Match when={userData() && (!loading() || userData().data.data.User.name === params.name)}>
          <Content time={userTime}>
            {props.children}
          </Content>
        </Match>
        <Match when={userData()?.error}>
          <div>Error user not found</div>
        </Match>
      </Switch>
    </UserContext.Provider>
  )
}

function Content(props) {
  const { user, following } = useUser();
  const [isFollowing, setIsFollowing] = createSignal(user().isFollowing);

  createEffect(() => {
    setIsFollowing(user().isFollowing);
  });

  return (
    <div class="user-page" style={{"--user-color": user().options.profileColor}}>
      <div class="profile-banner-container">
        <Show when={user().bannerImage} fallback={<div class="banner"></div>}>
          <img src={user().bannerImage} class="banner" alt="Banner" />
        </Show>
        <div class="user-profile-container">
          <div>
            <p>{formatMSToString(props.time())}</p>
            <img src={user().avatar.large} class="profile" alt="Profile" />
          </div>
          <div class="content">
            <Show when={user().id !== authUserData()?.data.id}>
              <button onClick={async () => {
                setIsFollowing(val => !val);
                const fetcher = createAnilistFetcher(queries.anilistToggleFollow, { id: user().id }, AbortSignal.timeout(30_000));
                const res = await fetcherToFetch(fetcher);
                if (res.status === 200) {
                  const json = await res.json();
                  following(json.data.ToggleFollow.isFollowing);
                } else {
                  setIsFollowing(user().isFollowing);
                }
              }}>
                <Show when={isFollowing()} fallback="Follow">Following</Show>
              </button>
            </Show>
            <h2>
              <a href={"https://anilist.co/user/" + user().name} target="_blank">{user().name}</a>
              <Show when={user().isFollower}>
                <span class="user-profile-following-badge">Follows you</span>
              </Show>
            </h2>
            <p>Joined {formatTimeToDate(user().createdAt * 1000)} ({Math.floor((new Date() - (user().createdAt * 1000)) / 1000 / 60 / 60 / 24)} days)</p>
          </div>
        </div>
      </div>
      <nav class="profile-navigation">
        <ul>
          <li><A href="">Overview</A></li>
          <li><A href="anime">Anime list</A></li>
          <li><A href="manga">Manga list</A></li>
          <li><A href="favourites">Favourites</A></li>
          <li><A href="stats">Stats</A></li>
          <li><A href="socials">Socials</A></li>
        </ul>
      </nav>
      {props.children}
    </div>
  );
}
