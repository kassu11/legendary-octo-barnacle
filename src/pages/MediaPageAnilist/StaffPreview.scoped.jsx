export function StaffPreview(props) {
  return (
    <ErrorBoundary fallback="Anilist staff preview error">
      <Show when={props.staff}>
        <div>
          <A href="staff">
            <h2>Staff</h2>
          </A>
          <ol class="grid-row-clamp grid-column-auto-fill">
            <For each={props.staff}>{staff => (
              <li>
                <A href={"/ani/staff/" + staff.node.id + "/" + formatingUtils.titleToUrl(staff.node.name.userPreferred)}>
                  <img src={staff.node.image.large} alt="Staff profile" />
                  <div>
                    <p>{staff.node.name.userPreferred}</p>
                    <p>{staff.role}</p>
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
