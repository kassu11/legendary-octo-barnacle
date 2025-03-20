import { Switch, Show, Match, createSignal, onCleanup } from "solid-js";
import { Markdown } from "../components/Markdown.jsx";
import style from "./Activity.module.scss";
import { A } from "./CustomA.jsx";
import api from "../utils/api.js";
import { useAuthentication } from "../context/AuthenticationContext.jsx";

const plural = num => num !== 1 ? "s" : "";

export function ActivityCard(props) {
  if (props.activity.type === "TEXT") {
    return (
      <div class={style.activityCardText}>
        <div class={style.header}>
          <A href={"/profile/" + props.activity.user.name} class={style.profileHeader}>
            <img class={style.profile} src={props.activity.user.avatar.large} alt="Profile" />
            {props.activity.user.name}
          </A>
          <CreatedAt createdAt={props.activity.createdAt} />
        </div>
        <div class={style.content}>
          <Markdown children={props.activity.text} />
        </div>
        <div class={style.footer}>
          <Footer mutateCache={props.mutateCache} {...props.activity}/>
        </div>
      </div>
    )
  }

  return (
    <div class={style.activityCardMedia}>
      <A href={"/anime/" + props.activity.media.id + "/" + props.activity.media.title.userPreferred}>
        <img class={style.cover} src={props.activity.media.coverImage.large} alt="Cover" />
      </A>
      <div class={style.main}>
        <A href={"/profile/" + props.activity.user.name}>{props.activity.user.name}</A>
        <p>
          {props.activity.status}{" "}
          <Show when={props.activity.progress}>{props.activity.progress} of </Show>
          <A href={"/anime/" + props.activity.media.id + "/" + props.activity.media.title.userPreferred}>{props.activity.media.title.userPreferred}</A>
          <A href={"/profile/" + props.activity.user.name}>
            <img class={style.profile} src={props.activity.user.avatar.large} alt="Profile" />
          </A>
        </p>
      </div>
      <div class={style.right}>
        <CreatedAt createdAt={props.activity.createdAt} />
        <Footer mutateCache={props.mutateCache} {...props.activity}/>
      </div>
    </div>
  );
}

function Footer(props) {
  const [isLiked, setIsLiked] = createSignal(props.isLiked);
  const [likeCount, setLikeCount] = createSignal(props.likeCount);

  const { accessToken } = useAuthentication();
  return (
    <>
      <button classList={{[style.active]: isLiked()}} onClick={() => {
        setIsLiked(liked => {
          api.anilist.likeActivity(accessToken(), { id: props.id })
          if (liked) {
            setLikeCount(v => v - 1);
            props.likeCount -= 1;
          } else {
            setLikeCount(v => v + 1);
            props.likeCount += 1;
          }
          props.isLiked = !liked
          return !liked
        });
        props.mutateCache(data => data);
      }}>Like {likeCount()}</button>
      <button>Reply {props.replyCount}</button>
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
