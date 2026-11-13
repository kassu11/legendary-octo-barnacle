import "./DeploymentDetails.scoped.css";
import { CreatedAt } from "@/components/CreatedAt.jsx";

export function DeploymentDetails(props) {
  return (
    <span class="deployment-details">
      <span class="hash" title={props.branch.commit}>
        {props.branch.commit.slice(0, 7)}{props.branch.dirty ? "-dirty" : ""}
      </span>
      <CreatedAt createdAt={Date.parse(props.branch.updatedAt) / 1000} />
    </span>
  );
}
