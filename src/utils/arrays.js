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

export function removeDuplicateIgnoreCaseSensitivity(array) {
  assert(Array.isArray(array), "Not array");
  const map = new Map();
  array.forEach(value => map.set(value.toLowerCase(), value));
  return Array.from(map.values());
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

export function binarySearchFindIndex(arr, callback, left = 0, right = arr.length - 1) {
  while (left <= right) {
    const mid = ((right + left) / 2) | 0
    const result = callback(arr[mid], mid, arr);
    if (result === 0) {
      return mid
    } else if (result < 0) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return -1
}

export function binarySearchFindAlwaysIndex(arr, callback, left = 0, right = arr.length - 1) {
  while (left < right) {
    const mid = ((right + left) / 2) | 0
    const result = callback(arr[mid], mid, arr);
    if (result === 0) {
      return mid
    } else if (result < 0) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return ((right + left) / 2) | 0;
}

export function binarySearchIndexOf(arr, el, left = 0, right = arr.length - 1) {
  while (left <= right) {
    let mid = ((right + left) / 2) | 0
    if (arr[mid] === el) {
      return mid
    } else if (el < arr[mid]) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  
  return -1
}
