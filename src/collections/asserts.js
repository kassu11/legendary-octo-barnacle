import { isTypeObject } from "../utils/objectUtils";

export const assertTrueOLD = (condition, message = "Not true") => {
  if (!condition) {
    throw new Error(message);
  }
}

export const assertFalseOLD = (condition, message = "Not false") => assertTrueOLD(!condition, message);
export const notNullish = value => assertTrueOLD(value != null, "Value is null or undefined");
export const unreachable = (message = "Assert unreachable") => assertTrueOLD(false, message);


export const isTypeStringOLD = (value, varName = "Value", message = "") => assertTrueOLD(typeof value === "string", varName + " is not type of string. " + message);
export const assertTypeFunctionOLD = (value, varName = "Value", message = "") => assertTrueOLD(typeof value === "function", varName + " is not type of function. " + message);
export const isTypeInteger = (value, varName = "Value", message = "") => assertTrueOLD(Number.isInteger(value), varName + " is not type of integer. " + message);

export const isInteger = (value, varName = "Value", message = "") => {
  const localMessage = varName + " is not integer. " + message;
  assertTrueOLD(typeof value === "string" || Number.isInteger(value), localMessage);
  assertTrueOLD(value && Number.isInteger(+value), localMessage);
}

export const assertTypeArray = (target, message = "Value is not array", varName) => {
  throwAssertIfFalsy(Array.isArray(target), message, varName);
}

export const assertTypeObject = (target, message = "Value is not object", varName) => {
  throwAssertIfFalsy(isTypeObject(target), message, varName);
}

export const assertTypeString = (target, message = "Value is not string", varName) => {
  throwAssertIfFalsy(typeof target === "string", message, varName);
}

export const assertTypeInteger = (target, message = "Value is not integer", varName) => {
  throwAssertIfFalsy(Number.isInteger(target), message, varName);
}

export const assertTypeFunction = (target, message = "Value is not function", varName) => {
  throwAssertIfFalsy(typeof target === "function", message, varName);
}

export const assertThruthy = (target, message = "Value is not thruthy", varName) => {
  throwAssertIfFalsy(target, message, varName);
}

export const assertFalsy = (target, message = "Value is not falsy", varName) => {
  throwAssertIfTruthy(target, message, varName);
}

export const throwAssertIfTruthy = (boolean, message, varName) => {
  if (boolean) throwAssert(message, varName);
}

export const throwAssertIfFalsy = (boolean, message, varName) => {
  if (!boolean) throwAssert(message, varName);
}

export const throwAssert = (message, varName) => {
  message ??= "Assertion failed.";

  if (varName) {
    message = `Assertion triggered by "${varName}" variable. ${message}`;
  }

  throw new Error(message);
}
