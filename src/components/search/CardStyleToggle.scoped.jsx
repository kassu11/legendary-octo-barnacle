import { LayoutGridIcon, LayoutListIcon } from "@/assets/icons.jsx";
import "./CardStyleToggle.scoped.css";

/**
 * @param {object} props
 * @param {"cards" | "rows"} props.cardStyle Current card style
 * @param {(style: "cards" | "rows") => void} props.setCardStyle Setter for the card style
 */
export function CardStyleToggle(props) {
  return (
    <div class="card-style-toggle" role="group" aria-label="Card style">
      <button classList={{ selected: props.cardStyle === "cards" }} aria-pressed={props.cardStyle === "cards"} title="Cards" aria-label="Cards" onClick={() => props.setCardStyle("cards")}>
        <LayoutGridIcon scoped />
      </button>
      <button classList={{ selected: props.cardStyle === "rows" }} aria-pressed={props.cardStyle === "rows"} title="Rows" aria-label="Rows" onClick={() => props.setCardStyle("rows")}>
        <LayoutListIcon scoped />
      </button>
    </div>
  );
}
