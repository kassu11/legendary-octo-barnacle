import { Switch, Show, Match, createSignal, onCleanup } from "solid-js";
import { Markdown } from "../components/Markdown.jsx";
import style from "./Activity.module.scss";
import api from "../utils/api.js";
import { useAuthentication } from "../context/AuthenticationContext.jsx";
import { leadingAndTrailingDebounce } from "../utils/scheduled.js";
import { assert } from "../utils/assert.js";
import { formatTitleToUrl } from "../utils/formating.js";
import { A } from "@solidjs/router";

const plural = num => num !== 1 ? "s" : "";

export function ActivityCard(props) {
  return (
    <Show when={props.activity.type === "TEXT"} fallback={
      <div class={style.activityCardMedia}>
        <A href={"/" + props.activity.media.type.toLowerCase() + "/" + props.activity.media.id + "/" + formatTitleToUrl(props.activity.media.title.userPreferred)}>
          <img class={style.cover} src={props.activity.media.coverImage.large} alt="Cover" />
        </A>
        <div class={style.main}>
          <A href={"/user/" + props.activity.user.name}>{props.activity.user.name}</A>
          <p>
            {props.activity.status}{" "}
            <Show when={props.activity.progress}>{props.activity.progress} of </Show>
            <A href={"/" + props.activity.media.type.toLowerCase() + "/" + props.activity.media.id + "/" + formatTitleToUrl(props.activity.media.title.userPreferred)}>{props.activity.media.title.userPreferred}</A>
            <A href={"/user/" + props.activity.user.name}>
              <img class={style.profile} src={props.activity.user.avatar.large} alt="Profile" />
            </A>
          </p>
        </div>
        <div class={style.right}>
          <CreatedAt createdAt={props.activity.createdAt} />
          <Footer mutateCache={props.mutateCache} activity={props.activity}/>
        </div>
      </div>
    }>
      <div class={style.activityCardText}>
        <div class={style.header}>
          <A href={"/user/" + props.activity.user.name} class={style.profileHeader}>
            <img class={style.profile} src={props.activity.user.avatar.large} alt="Profile" />
            {props.activity.user.name}
          </A>
          <CreatedAt createdAt={props.activity.createdAt} />
        </div>
        <div class={style.content}>
          <Markdown children={props.activity.text} />
        </div>
        <div class={style.footer}>
          <Footer mutateCache={props.mutateCache} activity={props.activity}/>
        </div>
      </div>
    </Show>
  );
}

function Footer(props) {
  const [isLiked, setIsLiked] = createSignal(props.activity.isLiked);
  const [likeCount, setLikeCount] = createSignal(props.activity.likeCount);
  const { accessToken } = useAuthentication();

  let serverIsLiked = props.activity.isLiked;
  const triggerLikeToggle = leadingAndTrailingDebounce(async (token, id, liked) => {
    if (liked !== serverIsLiked) {
      const data = await api.anilist.toggleActivityLike(token, { id });
      assert(!data.fromCache, "Mutation should never be cached");

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
      <button classList={{[style.active]: isLiked()}} onClick={() => {
        setIsLiked(liked => {
          assert(typeof liked === "boolean");
          const change = Number(!liked) * 2 - 1;
          setLikeCount(v => v + change);
          triggerLikeToggle(accessToken(), props.activity.id, !liked);
          return !liked
        });
      }}>Like {likeCount()}</button>
      <button>Reply {props.activity.replyCount}</button>
    </>
  )
}

function CreatedAt(props) {
  const [time, setTime] = createSignal(Math.max(1, Math.abs(new Date() / 1000 - props.createdAt)));

  let interval = null;
  if (time() < 60) {
    interval = setInterval(() => setTime(Math.max(1, Math.abs(new Date() / 1000 - props.createdAt))), 1000);
  } else if (time() < 3600) {
    interval = setInterval(() => setTime(Math.max(1, Math.abs(new Date() / 1000 - props.createdAt))), 1000 * 60);
  }

  onCleanup(() => clearInterval(interval));
  return (
    <time
      class={style.createdAt}
      dateTime={(new Date(props.createdAt * 1000)).toISOString()}
      title={(new Date(props.createdAt * 1000)).toLocaleString()}>
      <Switch>
        <Match when={Math.floor(time() / 3600 / 24)} children={days => (<>{days} day{plural(days())} ago </>)} />
        <Match when={Math.floor((time() / 3600) % 24)} children={hours => (<>{hours} hour{plural(hours())} ago</>)} />
        <Match when={Math.floor((time() % 3600) / 60)} children={minutes => (<>{minutes} minute{plural(minutes())} ago </>)} />
        <Match when={Math.floor((time() % 3600) % 60)} children={seconds => (<>{seconds} second{plural(seconds())} ago </>)} />
      </Switch>
    </time>
  )
}
