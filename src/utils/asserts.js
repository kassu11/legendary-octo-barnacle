import { isTypeObject } from "@/utils/objectUtils";

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

export const assertNonNanNumber = (target, message = "Value is not number", varName) => {
  throwAssertIfFalsy(!Number.isNaN(target) && typeof target === "number", message, varName);
}

export const assertTypeFunction = (target, message = "Value is not function", varName) => {
  throwAssertIfFalsy(typeof target === "function", message, varName);
}

export const assertTruthy = (target, message = "Value is not truthy", varName) => {
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
