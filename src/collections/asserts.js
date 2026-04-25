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
export const isTypeFunction = (value, varName = "Value", message = "") => assertTrueOLD(typeof value === "function", varName + " is not type of function. " + message);
export const isTypeInteger = (value, varName = "Value", message = "") => assertTrueOLD(Number.isInteger(value), varName + " is not type of integer. " + message);

export const isInteger = (value, varName = "Value", message = "") => {
  const localMessage = varName + " is not integer. " + message;
  assertTrueOLD(typeof value === "string" || Number.isInteger(value), localMessage);
  assertTrueOLD(value && Number.isInteger(+value), localMessage);
}

export const assertTypeArray = (target, message = "Value is not type Array", varName) => {
  _throwAssertIfFalse(Array.isArray(target), message, varName);
}

export const assertTypeObject = (target, message = "Value is not type Object", varName) => {
  _throwAssertIfFalse(isTypeObject(target), message, varName);
}

export const assertTypeString = (target, message = "Value is not type String", varName) => {
  _throwAssertIfFalse(typeof target === "string", message, varName);
}

export const assertTypeInteger = (target, message = "Value is not type Integer", varName) => {
  _throwAssertIfFalse(Number.isInteger(target), message, varName);
}

export const assertThruthy = (target, message = "Value is not thruthy", varName) => {
  _throwAssertIfFalse(target, message, varName);
}

export const assertFalsy = (target, message = "Value is not falsy", varName) => {
  _throwAssertIfTrue(target, message, varName);
}

const _throwAssertIfTrue = (boolean, message, varName) => {
  if (boolean) _throwAssert(message, varName);
}

const _throwAssertIfFalse = (boolean, message, varName) => {
  if (!boolean) _throwAssert(message, varName);
}

const _throwAssert = (message, varName) => {
  message ??= "Assertion failed.";

  if (varName) {
    message = `Assertion triggered by "${varName}" variable. ${message}`;
  }

  throw new Error(message);
}
