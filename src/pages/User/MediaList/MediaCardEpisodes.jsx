import { Match } from "solid-js";
import { MediaCardProgressInfo } from "./MediaCardProgressInfo.scoped.jsx";

export function MediaCardEpisodes(props) {
  return (
    <p>
      <Switch>
        <Match when={props.entry.media.type === "ANIME"}>
          <MediaCardProgressInfo {...props} label="Ep" progressKey="progress" maxProgressKey="episodes" />
        </Match>
        <Match when={props.entry.media.type === "MANGA"}>
          <MediaCardProgressInfo {...props} label="Ch" progressKey="progress" maxProgressKey="chapters" />
          <br />
          <MediaCardProgressInfo {...props} label="Vol" progressKey="progressVolumes" maxProgressKey="volumes" />
        </Match>
      </Switch>
    </p>
  );
}

