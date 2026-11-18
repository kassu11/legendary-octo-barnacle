import { A } from "@solidjs/router";
import { createMemo, For, Match, Show, Switch } from "solid-js";
import "./MediaCardCharacterRole.scoped.css";
import { capitalize, formatTitleToUrl } from "@/utils/formatUtils.js";
import { GridReelAutoFill } from "@/components/ui/GridReelAutoFill.scoped.jsx";

/**
 * Character role and voice actors at the bottom of a media card
 * @param {Object} props
 * @param {Object} props.edge Character media edge
 * @param {string} props.language Language of the shown voice actors
 */
export function MediaCardCharacterRole(props) {
  const voiceActorRoles = createMemo(() => props.edge.voiceActorRoles.filter(role => role.voiceActor.language === props.language));

  return (
    <Show when={voiceActorRoles().length || props.edge.characterRole}>
      <div class="media-card-character-role">
        <Switch>
          <Match when={voiceActorRoles().length === 1 && voiceActorRoles()[0]}>{role => (
            <A scoped class="voice-actor" href={"/ani/staff/" + role().voiceActor.id + "/" + formatTitleToUrl(role().voiceActor.name.userPreferred)}>
              <img src={role().voiceActor.image.large} alt="" />
              <span class="text">
                <span class="name line-clamp">{role().voiceActor.name.userPreferred}</span>
                <Show when={role().roleNotes || role().dubGroup}>
                  <span class="note">{role().roleNotes || role().dubGroup}</span>
                </Show>
              </span>
            </A>
          )}</Match>
          <Match when={voiceActorRoles().length > 1}>
            <GridReelAutoFill scoped class="voice-actors">
              <For each={voiceActorRoles()}>{role => (
                <A scoped class="voice-actor" href={"/ani/staff/" + role.voiceActor.id + "/" + formatTitleToUrl(role.voiceActor.name.userPreferred)} aria-label={role.voiceActor.name.userPreferred}>
                  <img src={role.voiceActor.image.large} alt="" />
                </A>
              )}</For>
            </GridReelAutoFill>
          </Match>
        </Switch>
        <Show when={props.edge.characterRole}>
          <p class="role line-clamp">{capitalize(props.edge.characterRole)}</p>
        </Show>
      </div>
    </Show>
  );
}
