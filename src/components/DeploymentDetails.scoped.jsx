import "./DeploymentDetails.scoped.css";
import { CreatedAt } from "@/components/CreatedAt.jsx";
import { Tooltip } from "@/components/Tooltip.scoped.jsx";

export function DeploymentDetails(props) {
  return (
    <span class="deployment-details">
      <span class="hash">
        {props.branch.commit.slice(0, 7)}{props.branch.dirty ? "-dirty" : ""}
        <Tooltip>{props.branch.commit}</Tooltip>
      </span>
      <CreatedAt createdAt={Date.parse(props.branch.updatedAt) / 1000} />
    </span>
  );
}
