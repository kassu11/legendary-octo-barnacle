import { Switch, Show, Match, createSignal, onCleanup, mergeProps } from "solid-js";
import { OldMarkdownComponent } from "../components/Markdown.jsx";
import "./Activity.scss";
import api from "../utils/api.js";
import { leadingAndTrailingDebounce } from "../utils/scheduled.js";
import { capitalize, formatTitleToUrl, mediaUrl, plural } from "../utils/formating.js";
import { A } from "@solidjs/router";
import { useAuthentication } from "../context/providers.js";
import { Tooltip } from "./Tooltips.jsx";
import { Dynamic } from "solid-js/web"
import { asserts } from "../collections/collections.js";
import { CreatedAt } from "../pages/CreatedAt.jsx";

export function ActivityCard(_props) {
  const props = mergeProps({ hideProfile: false, small: false, wrapper: (p) => <div {...p} /> }, _props);
  asserts.assertTrue(typeof props.hideProfile === "boolean", "hideProfile needs to be boolean");
  asserts.assertTrue(typeof props.small === "boolean", "small needs to be boolean");

  return (
    <Switch>
      <Match when={props.activity.type === "TEXT"}>
        <Dynamic component={props.wrapper} class="activity-card-text">
          <div class="header">
            <A href={"/user/" + props.activity.user.name} class="activity-profile-header">
              <img class="profile" src={props.activity.user.avatar.large} alt="Profile" />
              {props.activity.user.name}
            </A>
            <CreatedAt createdAt={props.activity.createdAt} />
          </div>
          <div class="content">
            <OldMarkdownComponent children={props.activity.text} />
          </div>
          <div class="footer">
            <Footer mutateCache={props.mutateCache} activity={props.activity}/>
          </div>
        </Dynamic>
      </Match>
      <Match when={props.activity.type === "ANIME_LIST" || props.activity.type === "MANGA_LIST"}>
        <Dynamic component={props.wrapper} class="activity-card-media" classList={{small: props.small}}>
          <A href={mediaUrl(props.activity.media)}>
            <img class="cover" src={props.activity.media.coverImage.large} alt="Cover" />
          </A>
          <div class="main">
            <Switch>
              <Match when={props.hideProfile === true}>
                <p>
                  {capitalize(props.activity.status)}{" "}
                  <Show when={props.activity.status !== "rewatched" && props.activity.status !== "reread" && props.activity.progress}>
                    {props.activity.progress} of 
                  </Show>
                  <A href={mediaUrl(props.activity.media)}>{props.activity.media.title.userPreferred}</A>
                </p>
              </Match>
              <Match when={props.hideProfile === false}>
                <A href={"/user/" + props.activity.user.name}>{props.activity.user.name}</A>
                <p>
                  {capitalize(props.activity.status)}{" "}
                  <Show when={props.activity.status !== "rewatched" && props.activity.status !== "reread" && props.activity.progress}>
                    {props.activity.progress} of 
                  </Show>
                  <A href={mediaUrl(props.activity.media)}>{props.activity.media.title.userPreferred}</A>
                  <A href={"/user/" + props.activity.user.name}>
                    <img class="profile" src={props.activity.user.avatar.large} alt="Profile" />
                  </A>
                </p>
              </Match>
            </Switch>
          </div>
          <div class="right">
            <CreatedAt createdAt={props.activity.createdAt} />
            <Footer mutateCache={props.mutateCache} activity={props.activity}/>
          </div>
        </Dynamic>
      </Match>
      <Match when={props.activity.type === "MESSAGE"}>
        <Dynamic component={props.wrapper}>message</Dynamic>
      </Match>
    </Switch>
  );
}

function Footer(props) {
  const [isLiked, setIsLiked] = createSignal(props.activity.isLiked);
  const [likeCount, setLikeCount] = createSignal(props.activity.likeCount);
  const { accessToken } = useAuthentication();
  const [showActivityLikeUserList, setShowActivityLikeUserList] = createSignal(undefined);
  const [activityLikes] = api.anilist.listOfActivityLikes(props.activity.id, accessToken, showActivityLikeUserList);

  let serverIsLiked = props.activity.isLiked;
  const triggerLikeToggle = leadingAndTrailingDebounce(async (token, id, liked) => {
    if (liked !== serverIsLiked) {
      const data = await api.anilist.toggleActivityLike(token, { id });
      asserts.assertTrue(!data.fromCache, "Mutation should never be cached");

      if (data.status === 200) {
        props.activity.likeCount = data.data.data.ToggleLike.likeCount;
        props.activity.isLiked = data.data.data.ToggleLike.isLiked;
        props.mutateCache(data => data);
        // This only triggers if cache had old like data in which case we want to update the visuals
        if (serverIsLiked === data.data.data.ToggleLike.isLiked) {
          setLikeCount(data.data.data.ToggleLike.likeCount);
          setIsLiked(data.data.data.ToggleLike.isLiked);
        }
        serverIsLiked = liked;
      }
    }
  }, 500);

  return (
    <>
      <button class="cp-activity-like" classList={{active: isLiked()}} onMouseMove={() => likeCount() && setShowActivityLikeUserList(true)} onClick={() => {
        setIsLiked(liked => {
          asserts.assertTrue(typeof liked === "boolean");
          const change = Number(!liked) * 2 - 1;
          setLikeCount(v => v + change);
          triggerLikeToggle(accessToken(), props.activity.id, !liked);
          return !liked
        });
      }}>Like {likeCount()}
        <Show when={showActivityLikeUserList() && activityLikes()?.data.likes.length}>
          <Tooltip tipPosition="left">
            <ol>
              <For each={activityLikes().data.likes}>{user => (
                <li>
                  <img src={user.avatar.large} alt="Profile picture" />
                  {user.name}
                </li>
              )}</For>
            </ol>
          </Tooltip>
        </Show>
      </button>
      {/* <button>Reply {props.activity.replyCount}</button> */}
    </>
  )
}
