import { assert } from "./assert";

export function objectFromArrayEntries(arr, defaultRetun) {
  if (!arr) {
    return defaultRetun || null;
  } else if (Array.isArray(arr)) {
    return Object.fromEntries(arr.map(v => ([v, true])));
  } return {[arr]: true};
}

export function wrapToArray(value) {
  if (Array.isArray(value)) {
    return value;
  } else if (value) {
    return [value];
  }

  return [];
}

export function wrapToSet(value) {
  return new Set(wrapToArray(value));
}

export function compare(a, b) {
  if (a === b) {
    return true;
  } 
  if (typeof a !== typeof b) {
    return false;
  } 
  if (Array.isArray(a)) {
    return a.length === b.length && a.every((v, i) => compare(v, b[i]))
  }

  return false;
}

export function first(value) {
  return Array.isArray(value) ? value[0] : value;
}
