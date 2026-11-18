import { createMemo } from "solid-js";
import { setVoiceActorLanguages } from "@/state/globalState";
import { FilterSelect } from "@/components/filters/FilterSelect.scoped.jsx";
import { LanguageIcon } from "@/assets/icons.jsx";

/**
 * @param {Object} props
 * @param {Map<number, Object>} [props.characterRoles] Character media edges by the media id, undefined while they are loading
 * @param {string[]} props.languages Languages of the voice actors shown on the cards
 */
export function VoiceActorLanguageSelect(props) {
  const languageCounts = createMemo(() => {
    const counts = {};
    for (const edge of props.characterRoles?.values() || []) {
      const edgeLanguages = new Set();
      for (const role of edge.voiceActorRoles) edgeLanguages.add(role.voiceActor.language);
      for (const language of edgeLanguages) counts[language] = (counts[language] || 0) + 1;
    }
    return counts;
  });

  const languageOptions = createMemo(() => {
    const counts = languageCounts();
    const languages = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
    return languages.map(language => ({ description: language, id: language }));
  });

  return (
    <FilterSelect radio param="language" noEscapeCancel tooltip="Language of the voice actors shown on the cards. Hold Ctrl to add a language to the selection. The selection is saved and used on every character page" each={languageOptions()} value={props.languages} countOf={id => languageCounts()[id] || 0} setSearchParams={({ language }) => setVoiceActorLanguages(language)} loading={!props.characterRoles} emptyText="No voice actors" icon={<LanguageIcon />} button="Language" />
  );
}
