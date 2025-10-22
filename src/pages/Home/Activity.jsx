import {batch, createEffect, Show} from "solid-js";
import {HomePageActivityReel} from "./ActivityReel.jsx";
import { signals } from "../../collections/collections.js";

export function Activity() {
  const [activityType, setActivityType] = signals.localStorageString("LOB_ACTIVITY_TYPE", undefined);
  const [isFollowing, setIsFollowing] = signals.localStorageBoolean("LOB_ACTIVITY_IS_FOLLOWING", true);
  const [hasReplies, setHasReplies] = signals.localStorageBoolean("LOB_ACTIVITY_HAS_REPLIES", undefined);
  const [variables, setVariables] = signals.localStorageJSON("LOB_ACTIVITY_QUERY", {
    "isFollowing": true,
  });

  createEffect(() => {
    setVariables(current => {
      const base = {
        ...current,
        activityType: activityType(),
        isFollowing: isFollowing(),
        hasReplies: hasReplies(),
      };

      for (const key of Object.keys(base)) {
        if (base[key] !== current[key]) {
          return base;
        }
      }

      return current;
    });
  });

  return (
    <div>
      <h2>Activity</h2>
      <div>
        <button onClick={() => setActivityType(undefined)}>All</button>
        <button onClick={() => setActivityType("TEXT")}>Text Status</button>
        <button onClick={() => setActivityType("MEDIA_LIST")}>List Progress</button>
      </div>
      <button onClick={() => {
        batch(() => {
          setIsFollowing(true);
          setHasReplies(undefined);
        });
      }}>Following
      </button>
      <button onClick={() => {
        batch(() => {
          setIsFollowing(false);
          setHasReplies(true);
        })
      }}>Global
      </button>
      <Show when={variables()} keyed>
        <HomePageActivityReel variables={variables()}/>
      </Show>
    </div>
  );
}
