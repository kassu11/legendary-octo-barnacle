export const leadingAndTrailingDebounce = (callback, ms, bufferSize = 1) => {
  const buffer = [];
  let timeout = null;
  return function trigger(...callbackArgs) {
    if (timeout === null) {
      callback(...callbackArgs);
      timeout = setTimeout(addFromBuffer, ms);
    } else {
      buffer.push(() => {
        callback(...callbackArgs);
        buffer.shift();
        addFromBuffer();
      });

      if (buffer.length == bufferSize + 1) {
        buffer.shift();
      }  

      addFromBuffer();
    }
  }

  function addFromBuffer() {
    const bufCallback = buffer[0];
    clearTimeout(timeout);
    timeout = null;
    if (bufCallback) {
      timeout = setTimeout(bufCallback, ms);
    }
  }
}
