import { createSignal } from "solid-js";
import "./InstallPWAInfoPanel.scss";
import { useResponsive } from "../context/providers";

export function InstallPWAInfoPanel() {
  const { isTouch, isPWA } = useResponsive();
  const [visible, setVisible] = createSignal(false);
  const [error, setError] = createSignal(false);
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    setVisible(true);
  });

  return (
    <Show when={visible() && isTouch() && !isPWA()}>
      <div class="cp-install-pwa-container">
        Install as Progressive Web App to get more screen space.
        <Show when={error()}> Failed to install</Show>
        <button onClick={async () => {
          if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
              deferredPrompt = null;
              return setVisible(false);
            }
          }

          setError(true);
        }}>Install</button>
        <button onClick={() => setVisible(false)}>Not now</button>
      </div>
    </Show>
  );
}
