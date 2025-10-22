export const MediaBanner = (props) => {
  return (
    <Show when={props.src}>
      <div class="pg-media-banner" classList={{loading: props.loading}}>
        <img src={props.src} alt="Banner" />
      </div>
    </Show>
  );
};
