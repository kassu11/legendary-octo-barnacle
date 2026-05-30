import { Switch, Show, Match, createSignal, mergeProps, For, createEffect } from "solid-js";
import { OldMarkdownComponent } from "../components/Markdown.jsx";
import "./Activity.scss";
import { leadingAndTrailingDebounce } from "../utils/scheduled.js";
import { capitalize, mediaUrl } from "../utils/formating.js";
import { A } from "@solidjs/router";
import { Tooltip } from "./Tooltips.jsx";
import { Dynamic } from "solid-js/web"
import { asserts, queries } from "../collections/collections.js";
import { CreatedAt } from "./CreatedAt.jsx";
import { createAnilistFetcher, fetcherToFetch, sendAnilistFetcher } from "../utils/fetcherUtils.js";
import { addApplicationNotification } from "../pages/App/ApplicationNotifications.scoped.jsx";

export function ActivityCard(_props) {
  const props = mergeProps({ hideProfile: false, small: false, wrapper: (p) => <div {...p} /> }, _props);

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

let activityLikesController;
function Footer(props) {
  const [isLiked, setIsLiked] = createSignal(props.activity.isLiked);
  const [likeCount, setLikeCount] = createSignal(props.activity.likeCount);
  const [showActivityLikeUserList, setShowActivityLikeUserList] = createSignal(false, { equals: false });

  const [activityLikesData, setActivityLikesData] = createSignal(undefined, { equals: false });
  let activityLikesFetcher;
  createEffect(() => {
    const { id } = props.activity;
    if (!id || !showActivityLikeUserList()) return;

    activityLikesController?.abort();
    activityLikesController = new AbortController();

    activityLikesFetcher = createAnilistFetcher(queries.anilistGetActivityLikes, { id, type: "ACTIVITY" }, activityLikesController.signal);

    sendAnilistFetcher(activityLikesFetcher, {
      name: "Anilist activity likes",
      onFetch: (_, { fetcher: f }) => {
        if (f.cacheKey === activityLikesFetcher.cacheKey) activityLikesController = null;
      },
      setValue: (res, { fetcher: f }) => {
        if (f.cacheKey === activityLikesFetcher.cacheKey) setActivityLikesData(res.data.data.Page);
      }
    });
  });

  let serverIsLiked = props.activity.isLiked;
  const triggerLikeToggle = leadingAndTrailingDebounce(async (id, liked) => {
    if (liked !== serverIsLiked) {
      const fetcher = createAnilistFetcher(queries.anilistMutateToggleLike, { id, type: "ACTIVITY" }, AbortSignal.timeout(30_000));
      const res = await fetcherToFetch(fetcher);
      if (res.status === 200) {
        const json = await res.json();
        props.activity.likeCount = json.data.ToggleLike.likeCount;
        props.activity.isLiked = json.data.ToggleLike.isLiked;
        props.mutateCache(data => data);
        // This only triggers if cache had old like data in which case we want to update the visuals
        if (serverIsLiked === json.data.ToggleLike.isLiked) {
          setLikeCount(json.data.ToggleLike.likeCount);
          setIsLiked(json.data.ToggleLike.isLiked);
        }
        serverIsLiked = liked;
      } else {
        addApplicationNotification({ type: "error", message: "Liking activity failed", duration: 30_000 });
      }
    }
  }, 500);

  return (
    <>
      <button class="cp-activity-like" classList={{active: isLiked()}} onMouseEnter={() => likeCount() && setShowActivityLikeUserList(true)} onClick={() => {
        setIsLiked(liked => {
          asserts.assertTrueOLD(typeof liked === "boolean");
          const change = Number(!liked) * 2 - 1;
          setLikeCount(v => v + change);
          triggerLikeToggle(props.activity.id, !liked);
          return !liked
        });
      }}>Like {likeCount()}
        <Show when={showActivityLikeUserList() && activityLikesData()?.likes.length}>
          <Tooltip tipPosition="left">
            <ol>
              <For each={activityLikesData().likes}>{user => (
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
