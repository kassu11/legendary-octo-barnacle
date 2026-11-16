import { LayoutGridIcon, LayoutListIcon } from "@/assets/icons.jsx";
import { searchPageCardStyle, setSearchPageCardStyle } from "@/state/globalState";
import "./CardStyleToggle.scoped.css";

export function CardStyleToggle() {
  return (
    <div class="card-style-toggle" role="group" aria-label="Card style">
      <button classList={{ selected: searchPageCardStyle() === "cards" }} aria-pressed={searchPageCardStyle() === "cards"} title="Cards" aria-label="Cards" onClick={() => setSearchPageCardStyle("cards")}>
        <LayoutGridIcon scoped />
      </button>
      <button classList={{ selected: searchPageCardStyle() === "rows" }} aria-pressed={searchPageCardStyle() === "rows"} title="Rows" aria-label="Rows" onClick={() => setSearchPageCardStyle("rows")}>
        <LayoutListIcon scoped />
      </button>
    </div>
  );
}
