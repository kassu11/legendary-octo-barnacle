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
 * @param {Object} [props.counts] Media counts by the role, undefined while they are loading
 */
export function CharacterRoleSelect(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const roleValues = createMemo(() => wrapToArray(searchParams.role));

  return (
    <FilterSelect param="role" excludable noEscapeCancel tooltip="Role of the character in the media" each={ROLE_OPTIONS} value={roleValues()} countOf={id => props.counts?.[id] || 0} setSearchParams={({ role }) => setSearchParams({ role }, { replace: true })} icon={<UserIcon />} button="Role" />
  );
}
