import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { wrapToArray } from "@/utils/arrayUtils.js";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { UserIcon } from "@/assets/icons.jsx";

export const ROLE_OPTIONS = [
  { description: "Main",       id: "main"       },
  { description: "Supporting", id: "supporting" },
  { description: "Background", id: "background" },
];

/**
 * @param {Object} props
 * @param {Map<number, Object>} [props.characterRoles] Character media edges by the media id, undefined while they are loading
 */
export function CharacterRoleSelect(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const roleValues = createMemo(() => wrapToArray(searchParams.role));

  const roleCounts = createMemo(() => {
    const counts = {};
    for (const edge of props.characterRoles?.values() || []) {
      const role = edge.characterRole?.toLowerCase();
      counts[role] = (counts[role] || 0) + 1;
    }
    return counts;
  });

  return (
    <FilterSelect param="role" excludable noEscapeCancel tooltip="Role of the character in the media" each={ROLE_OPTIONS} value={roleValues()} countOf={id => roleCounts()[id] || 0} setSearchParams={({ role }) => setSearchParams({ role }, { replace: true })} icon={<UserIcon />} button="Role" />
  );
}
