import { For } from "solid-js";
import "./Staff.scss";
import { A } from "@solidjs/router";
import { formatTitleToUrl } from "../../utils/formating";

function Staff(props) {
  return (
    <div class="media-page-staff-container">
      <A href="staff">
        <h2>Staff</h2>
      </A>
      <ol>
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
  );
}

export default Staff; 
