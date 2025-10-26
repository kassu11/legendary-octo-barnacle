import { A, useParams } from "@solidjs/router";
import api from "../../utils/api.js";
import { createEffect, createSignal, Match, on, Show } from "solid-js";
import { formatTimeToDate } from "../../utils/formating.js";
import { useAuthentication, UserContext, useUser } from "../../context/providers.js";

export function User(props) {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userData, {mutateCache: mutateUserCache}] = api.anilist.userByName(() => params.name, accessToken);

  const following = (status) => {
    mutateUserCache(response => {
      response.data.isFollowing = status;
      userData().data.isFollowing = status;
      return response;
    });
  }

  createEffect(on(userData, user => {
    if (user) {
      document.title = `${user.data.name} profile - LOB`;
    }
  }))

  return (
    <UserContext.Provider value={{ user: () => userData().data, following }}>
      <Switch>
        <Match when={userData()?.data && (!userData.loading || userData().data.name === params.name)}>
          <Content>
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
  const { authUserData, accessToken } = useAuthentication();
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
          <img src={user().avatar.large} class="profile" alt="Profile" />
          <div class="content">
            <Show when={user().id !== authUserData()?.data.id}>
              <button onClick={async () => {
                setIsFollowing(val => {
                  return !val;
                });
                const response = await api.anilist.toggleFollow(accessToken(), user().id);
                if (response.status === 200) {
                  following(response.data.isFollowing);
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