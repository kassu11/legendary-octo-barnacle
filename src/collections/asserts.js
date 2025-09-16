export const assertTrue = (condition, message = "Not true") => {
  if (!condition) {
    throw new Error(message);
  }
}

export const assertFalse = (condition, message = "Not false") => assertTrue(!condition, message);

export const assertTypeString = (string, message = "Value is not type string") => assertTrue(typeof string === "string", message);
export const typeFunction = value => assertTrue(typeof value === "function", "Value is not type function");
export const notNullish = value => assertTrue(value != null, "Value is null or undefined");

export const unreachable = (message = "Assert unreachable") => assertTrue(false, message);


