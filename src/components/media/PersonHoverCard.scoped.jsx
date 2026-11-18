import { onMount, Show } from "solid-js";
import { createHover, HoverPortal } from "@/hooks/createHover";
import { ImageLoader } from "@/components/media/ImageLoader.scoped";
import "./PersonHoverCard.scoped.css";

/**
 * Hover card of a character or a staff member for the parent element, in the same style as the media hover card.
 * It replaces the hover of the media card it is in, so they don't open at the same time
 *
 * @example
 * <A href={characterUrl}>
 *   <img src={character.image.large} alt="" />
 *   <PersonHoverCard name={character.name.userPreferred} image={character.image.large} kind="Character" media={media} />
 * </A>
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.image
 * @param {string} [props.note] Role of the person in the media
 * @param {string} [props.kind] What the person is, like "Character" or "Voice actor (Japanese)"
 * @param {Object} [props.media] Anilist media for the banner and the color of the background
 */
export function PersonHoverCard(props) {
  const hover = createHover({ placements: ["right-start", "right-end", "left-start", "left-end", "bottom", "top"], offset: 16, stopPropagation: true });
  const anchor = document.createTextNode("");
  onMount(() => hover.triggerRef(anchor.parentElement));

  return (
    <>
      {anchor}
      <Show when={hover.isOpen()}>
        <HoverPortal>
          <div class="person-hover-card" style={{ "--media-background-color": props.media?.coverImage?.color }} ref={hover.floatingRef}>
            <ImageLoader scoped class="image-loader" waitBeforeFade={300} fadeIn src={props.media?.bannerImage} />
            <img class="portrait" src={props.image} alt="" />
            <div class="details">
              <p class="name">{props.name}</p>
              <Show when={props.note}>
                <p class="note">{props.note}</p>
              </Show>
              <Show when={props.kind}>
                <p class="kind">{props.kind}</p>
              </Show>
            </div>
          </div>
        </HoverPortal>
      </Show>
    </>
  );
}
