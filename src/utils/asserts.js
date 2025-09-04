export const assertTrue = (condition, message = "Not true") => {
  if (!condition) {
    throw new Error(message);
  }
}

export const assertFalse = (condition, message = "Not false") => assertTrue(!condition, message);

export const assertTypeString = (string, message = "Value is Not type string") => assertTrue(typeof string === "string", message);

export const unreachable = (message = "Assert unreachable") => assertTrue(false, message);
