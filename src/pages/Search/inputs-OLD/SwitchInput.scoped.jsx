import "./SwitchInput.scoped.css";

export function SwitchInputScoped(props) {
  return (
    <label class="switch">
      <input type="checkbox" {...props} />
      <span class="slider round" />
    </label>
  );
}
