import { setSettingsShowDevBranch, settingsShowDevBranch } from "../../core/globalState";
import "./index(settings).scoped.css";

export function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <label>
        <input type="checkbox" checked={settingsShowDevBranch()} onChange={() => setSettingsShowDevBranch(v => !v)} />
        {" "}Enable dev branches
      </label>
    </div>
  );
}
