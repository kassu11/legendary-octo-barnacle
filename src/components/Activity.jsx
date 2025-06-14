import { Switch, Show, Match, createSignal, onCleanup, mergeProps } from "solid-js";
import { Markdown } from "../components/Markdown.jsx";
import "./Activity.scss";
import api from "../utils/api.js";
import { leadingAndTrailingDebounce } from "../utils/scheduled.js";
import { assert } from "../utils/assert.js";
import { capitalize, formatTitleToUrl, plural } from "../utils/formating.js";
import { A } from "@solidjs/router";
import { useAuthentication } from "../context/providers.js";

export function ActivityCard(_props) {
  const props = mergeProps({ hideProfile: false, small: false }, _props);
  assert(typeof props.hideProfile === "boolean", "hideProfile needs to be boolean");
  assert(typeof props.small === "boolean", "small needs to be boolean");

  return (
    <Switch>
      <Match when={props.activity.type === "TEXT"}>
        <div class="activity-card-text">
          <div class="header">
            <A href={"/user/" + props.activity.user.name} class="activity-profile-header">
              <img class="profile" src={props.activity.user.avatar.large} alt="Profile" />
              {props.activity.user.name}
            </A>
            <CreatedAt createdAt={props.activity.createdAt} />
          </div>
          <div class="content">
            <Markdown children={props.activity.text} />
          </div>
          <div class="footer">
            <Footer mutateCache={props.mutateCache} activity={props.activity}/>
          </div>
        </div>
      </Match>
      <Match when={props.activity.type === "ANIME_LIST" || props.activity.type === "MANGA_LIST"}>
        <div class="activity-card-media" classList={{small: props.small}}>
          <A href={"/" + props.activity.media.type.toLowerCase() + "/" + props.activity.media.id + "/" + formatTitleToUrl(props.activity.media.title.userPreferred)}>
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
                  <A href={"/" + props.activity.media.type.toLowerCase() + "/" + props.activity.media.id + "/" + formatTitleToUrl(props.activity.media.title.userPreferred)}>{props.activity.media.title.userPreferred}</A>
                </p>
              </Match>
              <Match when={props.hideProfile === false}>
                <A href={"/user/" + props.activity.user.name}>{props.activity.user.name}</A>
                <p>
                  {capitalize(props.activity.status)}{" "}
                  <Show when={props.activity.status !== "rewatched" && props.activity.status !== "reread" && props.activity.progress}>
                    {props.activity.progress} of 
                  </Show>
                  <A href={"/" + props.activity.media.type.toLowerCase() + "/" + props.activity.media.id + "/" + formatTitleToUrl(props.activity.media.title.userPreferred)}>{props.activity.media.title.userPreferred}</A>
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
        </div>
      </Match>
      <Match when={props.activity.type === "MESSAGE"}>
        <div>message</div>
      </Match>
    </Switch>
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
      <button classList={{active: isLiked()}} onClick={() => {
        setIsLiked(liked => {
          assert(typeof liked === "boolean");
          const change = Number(!liked) * 2 - 1;
          setLikeCount(v => v + change);
          triggerLikeToggle(accessToken(), props.activity.id, !liked);
          return !liked
        });
      }}>Like {likeCount()}</button>
      {/* <button>Reply {props.activity.replyCount}</button> */}
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
      class="activity-created-at"
      dateTime={(new Date(props.createdAt * 1000)).toISOString()}
      title={(new Date(props.createdAt * 1000)).toLocaleString()}>
      <Switch>
        <Match when={Math.floor(time() / 3600 / 24 / 365.25)} children={years => (<>{years} years{plural(years())} ago </>)} />
        <Match when={Math.floor(time() / 3600 / 24 / 30)} children={months => (<>{months} month{plural(months())} ago </>)} />
        <Match when={Math.floor(time() / 3600 / 24 / 7)} children={weeks => (<>{weeks} week{plural(weeks())} ago </>)} />
        <Match when={Math.floor(time() / 3600 / 24)} children={days => (<>{days} day{plural(days())} ago </>)} />
        <Match when={Math.floor((time() / 3600) % 24)} children={hours => (<>{hours} hour{plural(hours())} ago</>)} />
        <Match when={Math.floor((time() % 3600) / 60)} children={minutes => (<>{minutes} minute{plural(minutes())} ago </>)} />
        <Match when={Math.floor((time() % 3600) % 60)} children={seconds => (<>{seconds} second{plural(seconds())} ago </>)} />
      </Switch>
    </time>
  )
}
