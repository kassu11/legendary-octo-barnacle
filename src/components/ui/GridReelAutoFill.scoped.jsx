import "./GridReelAutoFill.scoped.css";

// Horizontally scrolling reel, the column count is picked so that the last visible column is cut by --spill-ratio
// Inputs: --grid-column-width, --grid-max-column-count, --spill-ratio, --spill-ration-correction-padding, --padding and --gap
export function GridReelAutoFill(props) {
  return (
    <div {...props} classList={{ "grid-reel-auto-fill": true, [props.class]: !!props.class }} />
  );
}
