import { onCleanup } from "solid-js";

export function createCleanUpAbortController(parentController) {

  const controller = createAbortController(parentController);
  onCleanup(() => controller.abortAndRenew());

  return controller;

}

export function createAbortController(parentController) {

  const customController = {
    enabled: false,
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

      customController.controller = new AbortController();
      customController.signal = customController.controller.signal;
      customController.signal.addEventListener("aborted", abortChilren);
      customController.enabled = true;
      customController.childControllers = [];

      parentController?.childControllers.push(customController);

      return customController.signal;
    }
  };

  function abortChilren() {
    customController.childControllers.forEach(c => c.abortAndRenew());
  }

  customController.abortAndRenew();

  return customController;

}
