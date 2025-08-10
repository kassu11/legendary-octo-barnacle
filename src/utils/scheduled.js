import { onCleanup } from "solid-js";

export const leadingAndTrailingDebounce = (callback, ms, bufferSize = 1) => {
  const buffer = [];
  let timeout = null;
  let runningCallback = false;
  async function trigger(...callbackArgs) {
    buffer.push(async () => {
      buffer.shift();
      runningCallback = true;
      await callback(...callbackArgs);
      runningCallback = false;
      addFromBuffer(ms);
    });

    if (buffer.length == bufferSize + 1) {
      buffer.shift();
    }
    if (runningCallback) { return; }
    if (timeout === null) { addFromBuffer(); } 
    else { addFromBuffer(ms); }
  }

  trigger.bufferSize = () => buffer.length;

  return trigger;

  function addFromBuffer(ms) {
    const bufCallback = buffer[0];
    clearTimeout(timeout);
    timeout = null;
    if (!bufCallback) { return; }

    if(ms) {
      timeout = setTimeout(bufCallback, ms);
    } else {
      runningCallback = true;
      bufCallback();
    }
  }
}

export const debouncer = (callback) => {
  let timeout;

  const trigger = (ms, ...args) => {
    clearTimeout(timeout);
    setTimeout(() => callback(...args), ms);
  }

  onCleanup(() => clearTimeout(timeout));

  return trigger;
}
