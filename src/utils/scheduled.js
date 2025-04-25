export const leadingAndTrailingDebounce = (callback, ms, bufferSize = 1) => {
  const buffer = [];
  let timeout = null;
  async function trigger(...callbackArgs) {
    if (timeout === null) {
      await callback(...callbackArgs);
      timeout = setTimeout(addFromBuffer, ms);
    } else {
      buffer.push(async () => {
        await callback(...callbackArgs);
        buffer.shift();
        addFromBuffer();
      });

      if (buffer.length == bufferSize + 1) {
        buffer.shift();
      }  

      addFromBuffer();
    }
  }

  trigger.bufferSize = () => buffer.length;

  return trigger;

  function addFromBuffer() {
    const bufCallback = buffer[0];
    clearTimeout(timeout);
    timeout = null;
    if (bufCallback) {
      timeout = setTimeout(bufCallback, ms);
    }
  }
}
