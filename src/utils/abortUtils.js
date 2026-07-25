import { onCleanup } from "solid-js";

export function createAbortController(parentController) {
  const customController = {
    enabled: true,
    childControllers: [],
    controller: null,
    signal: null,
    disable() {
      customController.enabled = false;
    },
    abortAndRenew () {
      if (customController.enabled) {
        // Prevent event listener abort children and call the function manually
        customController.signal.removeEventListener("aborted", abortChilren);
        customController.controller.abort();
      }

      abortChilren();

      reset();

      parentController?.childControllers.push(customController);
    }
  };

  function reset() {
    customController.controller = new AbortController();
    customController.signal = customController.controller.signal;
    customController.signal.addEventListener("aborted", abortChilren);
    customController.enabled = true;
    customController.childControllers = [];
  }

  function abortChilren() {
    customController.childControllers.forEach(c => c.abortAndRenew());
  }

  onCleanup(() => customController.abortAndRenew());

  reset();

  return customController;
}
