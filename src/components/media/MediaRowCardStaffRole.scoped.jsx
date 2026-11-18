import { A } from "@solidjs/router";
import { For, Show } from "solid-js";
import "./MediaRowCardStaffRole.scoped.css";
import { capitalize, formatTitleToUrl } from "@/utils/formatUtils.js";

/**
 * Voiced characters and staff roles of a staff member under the genres of a media row card
 * @param {Object} props
 * @param {{ characterRole: string, characters: Object[], staffRoles: string[] }} props.role Roles of the staff member in the media
 */
export function MediaRowCardStaffRole(props) {
  return (
    <Show when={props.role.characters.length || props.role.staffRoles.length}>
      <div class="media-row-card-staff-role">
        <Show when={props.role.characters.length}>
          <ul class="characters">
            <For each={props.role.characters}>{character => (
              <li>
                <A scoped class="character" href={"/ani/character/" + character.id + "/" + formatTitleToUrl(character.name.userPreferred)}>
                  <img src={character.image.large} alt="" />
                  <span class="text">
                    <span class="name">{character.name.userPreferred}</span>
                    <Show when={props.role.characterRole}>
                      <span class="note">{capitalize(props.role.characterRole)}</span>
                    </Show>
                  </span>
                </A>
              </li>
            )}</For>
          </ul>
        </Show>
        <Show when={props.role.staffRoles.length}>
          <p class="roles">{props.role.staffRoles.join(", ")}</p>
        </Show>
      </div>
    </Show>
  );
}
