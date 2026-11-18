import { A } from "@solidjs/router";
import { createMemo, For, Show } from "solid-js";
import "./MediaRowCardCharacterRole.scoped.css";
import { capitalize, formatTitleToUrl } from "@/utils/formatUtils.js";
import { PersonHoverCard } from "@/components/media/PersonHoverCard.scoped";

/**
 * Character role and voice actors under the genres of a media row card
 * @param {Object} props
 * @param {Object} props.edge Character media edge
 * @param {string[]} props.languages Languages of the shown voice actors
 * @param {Object} props.media Anilist media of the card
 */
export function MediaRowCardCharacterRole(props) {
  const voiceActorRoles = createMemo(() => props.edge.voiceActorRoles.filter(role => props.languages.includes(role.voiceActor.language)));

  return (
    <Show when={voiceActorRoles().length || props.edge.characterRole}>
      <div class="media-row-card-character-role">
        <Show when={voiceActorRoles().length}>
          <ul class="voice-actors">
            <For each={voiceActorRoles()}>{role => (
              <li>
                <A scoped class="voice-actor" href={"/ani/staff/" + role.voiceActor.id + "/" + formatTitleToUrl(role.voiceActor.name.userPreferred)}>
                  <img src={role.voiceActor.image.large} alt="" />
                  <PersonHoverCard name={role.voiceActor.name.userPreferred} image={role.voiceActor.image.large} note={role.roleNotes || role.dubGroup} kind={"Voice actor (" + role.voiceActor.language + ")"} media={props.media} />
                  <span class="text">
                    <span class="name">{role.voiceActor.name.userPreferred}</span>
                    <span class="language">{role.voiceActor.language}</span>
                  </span>
                  <Show when={role.roleNotes || role.dubGroup}>
                    <span class="note">{role.roleNotes || role.dubGroup}</span>
                  </Show>
                </A>
              </li>
            )}</For>
          </ul>
        </Show>
        <Show when={props.edge.characterRole}>
          <p class="role">{capitalize(props.edge.characterRole)}</p>
        </Show>
      </div>
    </Show>
  );
}
