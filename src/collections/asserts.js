export const assertTrue = (condition, message = "Not true") => {
  if (!condition) {
    throw new Error(message);
  }
}

export const assertFalse = (condition, message = "Not false") => assertTrue(!condition, message);
export const notNullish = value => assertTrue(value != null, "Value is null or undefined");
export const unreachable = (message = "Assert unreachable") => assertTrue(false, message);


export const isTypeString = (value, varName = "Value", message = "") => assertTrue(typeof value === "string", varName + " is not type of string. " + message);
export const isTypeFunction = (value, varName = "Value", message = "") => assertTrue(typeof value === "function", varName + " is not type of function. " + message);
export const isTypeInteger = (value, varName = "Value", message = "") => assertTrue(Number.isInteger(value), varName + " is not type of integer. " + message);

