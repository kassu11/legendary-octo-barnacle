import "./SwitchInput.scss";

export function SwitchInput(props) {
  return (
    <label class="switch">
      <input type="checkbox" {...props} />
      <span class="slider round" />
    </label>
  );
}
