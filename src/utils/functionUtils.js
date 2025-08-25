import { asserts } from "./utils";

const isFunction = value => typeof value === "function";
export const unwrapFunction = value => isFunction(value) ? value() : value;
export const assertFunction = value => asserts.assertTrue(isFunction(value), "Value is not function");
