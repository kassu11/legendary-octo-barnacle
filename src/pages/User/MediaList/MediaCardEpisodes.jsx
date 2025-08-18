import { Match } from "solid-js";
import { MediaCardEpisodeRow } from "./MediaCardEpisodeRow";

export function MediaCardEpisodes(props) {
    return (
        <p>
            <Switch>
                <Match when={props.entry.media.type === "ANIME"}>
                    <MediaCardEpisodeRow {...props} label="Ep" progressKey="progress" maxProgressKey="episodes" />
                </Match>
                <Match when={props.entry.media.type === "MANGA"}>
                    <MediaCardEpisodeRow {...props} label="Ch" progressKey="progress" maxProgressKey="chapters" />
                    <br />
                    <MediaCardEpisodeRow {...props} label="Vol" progressKey="progressVolumes" maxProgressKey="volumes" />
                </Match>
            </Switch>
        </p>
    );
}

