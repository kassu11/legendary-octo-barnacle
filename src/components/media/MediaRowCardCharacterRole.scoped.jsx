import { A } from "@solidjs/router";
import { createMemo, For, Show } from "solid-js";
import "./MediaRowCardCharacterRole.scoped.css";
import { capitalize, formatTitleToUrl } from "@/utils/formatUtils.js";

/**
 * Character role and voice actors under the genres of a media row card
 * @param {Object} props
 * @param {Object} props.edge Character media edge
 * @param {string} props.language Language of the shown voice actors
 */
export function MediaRowCardCharacterRole(props) {
  const voiceActorRoles = createMemo(() => props.edge.voiceActorRoles.filter(role => role.voiceActor.language === props.language));

  return (
    <Show when={voiceActorRoles().length || props.edge.characterRole}>
      <div class="media-row-card-character-role">
        <Show when={voiceActorRoles().length}>
          <ul class="voice-actors">
            <For each={voiceActorRoles()}>{role => (
              <li>
                <A scoped class="voice-actor" href={"/ani/staff/" + role.voiceActor.id + "/" + formatTitleToUrl(role.voiceActor.name.userPreferred)}>
                  <img src={role.voiceActor.image.large} alt="" />
                  <span class="name">{role.voiceActor.name.userPreferred}</span>
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
