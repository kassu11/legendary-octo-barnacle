import { FavouriteToggle } from "@/components/FavouriteToggle.scoped.jsx";
import "./JikanEntity.scoped.css";

export function JikanEntityHeader(props) {
  return (
    <div class="header">
      <img src={props.image} alt={props.alt} />
      <div class="grid">
        <div>
          <p>{props.time}</p>
          <h1>{props.name}</h1>
          <p>{props.alternativeNames.join(", ")}</p>
        </div>
        <FavouriteToggle jikanValue={props.favorites} />
      </div>
      <div>
        {props.children}
      </div>
    </div>
  );
}

export function SummarySection(props) {
  return (
    <details open>
      <summary>
        <h2>{props.title}</h2>
      </summary>
      {props.children}
    </details>
  );
}
