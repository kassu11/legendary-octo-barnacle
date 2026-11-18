import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { wrapToArray } from "@/utils/arrayUtils.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { UserIcon } from "@/assets/icons.jsx";

/**
 * @param {Object} props
 * @param {Object} [props.counts] Media counts by the role, undefined while they are loading
 */
export function StaffRoleSelect(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const roleValues = createMemo(() => wrapToArray(searchParams.role));

  const roleOptions = createMemo(() => {
    const counts = props.counts || {};
    const roles = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
    return roles.map(role => ({ description: role, id: role }));
  });

  return (
    <FilterSelect param="role" excludable noEscapeCancel tooltip="Roles of the staff in the media, like voice acting or directing" each={roleOptions()} value={roleValues()} countOf={id => props.counts?.[id] || 0} setSearchParams={({ role }) => setSearchParams({ role }, { replace: true })} loading={!props.counts} emptyText="No roles" icon={<UserIcon />} button="Role" />
  );
}
