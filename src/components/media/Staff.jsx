import { ErrorBoundary, For } from "solid-js";
import "./Staff.scss";
import { A } from "@solidjs/router";
import { formatTitleToUrl } from "../../utils/formating";

function Staff(props) {
  return (
    <ErrorBoundary fallback="Staff error">
      <Show when={props.staff}>
        <div class="media-page-staff-container">
          <A href="staff">
            <h2>Staff</h2>
          </A>
          <ol class="grid-row-clamp grid-column-auto-fill">
            <For each={props.staff}>{staff => (
              <li>
                <A href={"/ani/staff/" + staff.node.id + "/" + formatTitleToUrl(staff.node.name.userPreferred)}>
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

export default Staff; 
