import { A } from "@solidjs/router";
import { For, Match, Show, Switch } from "solid-js";
import "./MediaCardStaffRole.scoped.css";
import { capitalize, formatTitleToUrl } from "@/utils/formatUtils.js";
import { PersonHoverCard } from "@/components/media/PersonHoverCard.scoped";
import { GridReelAutoFill } from "@/components/ui/GridReelAutoFill.scoped.jsx";
import { Tooltip } from "@/components/Tooltip.scoped";

/**
 * Voiced characters and staff roles of a staff member at the bottom of a media card
 * @param {Object} props
 * @param {{ characterRole: string, characters: Object[], staffRoles: string[] }} props.role Roles of the staff member in the media
 * @param {Object} props.media Anilist media of the card
 */
export function MediaCardStaffRole(props) {
  return (
    <Show when={props.role.characters.length || props.role.staffRoles.length}>
      <div class="media-card-staff-role">
        <Switch>
          <Match when={props.role.characters.length === 1 && props.role.characters[0]}>{character => (
            <A scoped class="character" href={"/ani/character/" + character().id + "/" + formatTitleToUrl(character().name.userPreferred)}>
              <img src={character().image.large} alt="" />
              <PersonHoverCard name={character().name.userPreferred} image={character().image.large} note={capitalize(props.role.characterRole)} kind="Character" media={props.media} />
              <span class="text">
                <span class="name line-clamp">{character().name.userPreferred}</span>
                <Show when={props.role.characterRole}>
                  <span class="note">{capitalize(props.role.characterRole)}</span>
                </Show>
              </span>
            </A>
          )}</Match>
          <Match when={props.role.characters.length > 1}>
            <GridReelAutoFill scoped class="characters">
              <For each={props.role.characters}>{character => (
                <A scoped class="character" href={"/ani/character/" + character.id + "/" + formatTitleToUrl(character.name.userPreferred)} aria-label={character.name.userPreferred}>
                  <img src={character.image.large} alt="" />
                  <PersonHoverCard name={character.name.userPreferred} image={character.image.large} note={capitalize(props.role.characterRole)} kind="Character" media={props.media} />
                </A>
              )}</For>
            </GridReelAutoFill>
          </Match>
        </Switch>
        <Show when={props.role.staffRoles.length}>
          <p class="roles line-clamp">
            {props.role.staffRoles.join(", ")}
            <Tooltip>{props.role.staffRoles.join(", ")}</Tooltip>
          </p>
        </Show>
      </div>
    </Show>
  );
}
