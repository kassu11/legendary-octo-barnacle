import { assert } from "./assert";

const isFunction = value => typeof value === "function";
export const unwrapFunction = value => isFunction(value) ? value() : value;
export const assertFunction = value => assert(isFunction(value), "Value is not function");
