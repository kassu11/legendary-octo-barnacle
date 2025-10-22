import { formatingUtils, urlUtils } from "../../utils/utils";

export function AnilistRelationsPreview(props) {
  return (
    <ErrorBoundary fallback="Anilist relations preview error">
      <Show when={props.relations?.edges.length}>
        <div>
          <h2>Relations</h2>
          <ol class="grid-column-auto-fill">
            <For each={props.relations.edges}>{relation => (
              <li>
                <A
                  href={urlUtils.anilistMediaUrl(relation.node)}
                  class="media-page-relation"
                >
                  <img src={relation.node.coverImage.large} alt="Cover" />
                  <div class="content">
                    <span class="type">{relation.relationType}</span>
                    <span class="line-clamp">{relation.node.title.userPreferred}</span>
                    <p class="flex-bullet-separator">
                      <span>{formatingUtils.mediaFormat(relation.node.format)}</span>
                      <span>{formatingUtils.mediaStatus(relation.node.status)}</span>
                    </p>
                  </div>
                </A>
              </li>
            )}</For>
          </ol>
        </div>
      </Show>
    </ErrorBoundary>
  );
}
