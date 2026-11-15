import "./GridReelAutoFill.scoped.css";

// Horizontally scrolling reel. Columns are at least --column-width wide and grow to fill the reel (like minmax(x, 1fr)),
// leaving --spill-ratio of the next column visible before the right padding. A spill of 0 ends the last column on the padding.
// Inputs, set on the reel itself (they aren't inherited): --column-width, --max-column-count (visible columns including the spill),
// --spill-ratio, --gap, --padding-inline, --padding-left and --padding-right
export function GridReelAutoFill(props) {
  return (
    <div {...props} />
  );
}
