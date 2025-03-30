import { For, Show } from "solid-js";
import { formatAnilistDate } from "../../utils/formating";
import { useAuthentication } from "../../context/AuthenticationContext";

const ExtraInfo = (props) => {
  const { authUserData } = useAuthentication();
  return (
    <div>
      <h2>Extra info</h2>
      <ul>
        <Show when={props.media.episodes}>
          <li>Episodes: {props.media.episodes}</li>
        </Show>
        <Show when={props.media.duration}>
          <li>Duration: {props.media.duration} mins</li>
        </Show>
        <Show when={props.media.startDate}>
          <li>Start Date: {formatAnilistDate(props.media.startDate)}</li>
        </Show>
        <Show when={props.media.endDate}>
          <li>End Date: {formatAnilistDate(props.media.endDate)}</li>
        </Show>
        <Show when={!authUserData() || authUserData().data.data.Viewer.options.titleLanguage !== "ENGLISH"}>
          <li>English: {props.media.title.english}</li>
        </Show>
        <Show when={!authUserData() || authUserData().data.data.Viewer.options.titleLanguage !== "ROMAJI"}>
          <li>Romaji: {props.media.title.romaji}</li>
        </Show>
        <Show when={!authUserData() || authUserData().data.data.Viewer.options.titleLanguage !== "NATIVE"}>
          <li>Native: {props.media.title.native}</li>
        </Show>
        <Show when={props.media.synonyms.length}>
          <li>
            Synonyms:
            <ul>
              <For each={props.media.synonyms}>{synonym => (
                <li>{synonym}</li>
              )}</For>
            </ul>
          </li>
        </Show>
      </ul>
    </div>
  );
};

export default ExtraInfo; 
