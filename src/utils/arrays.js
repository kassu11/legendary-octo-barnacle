import { asserts } from "../collections/collections";

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
  asserts.assertTrue(Array.isArray(array), "Not array");
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
  let result = null;
  while (left <= right) {
    const mid = ((right + left) / 2) | 0
    result = callback(arr[mid], mid, arr);
    if (result === 0) {
      return mid
    } else if (result < 0) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  if (result === null) {
    return 0;
  }
  const mid = ((right + left) / 2) | 0
  if (mid == arr.length - 1) {
    if (result < 0) {
      return arr.length - 1;
    }
    return arr.length;
  }

  if (result < 0) {
    return right + 1;
  } else {
    return left - 1;
  }
}

// const test = (finder, arr, valueToFind, expect, desc = "") => {
//   const res = binarySearchFindAlwaysIndex(arr, finder(valueToFind));
//   const msg = desc || `Searching for ${valueToFind} in [${arr.join(', ')}]`;
//   if (res === expect) {
//     console.log("✅", msg, "→ Passed with index:", expect);
//   } else {
//     console.error("❌", msg, "→ Failed. Got:", res, "Expected:", expect);
//   }
// };
//
// // === ASCENDING ORDER ===
// test((findVal) => id => findVal - id, [], 10, 0, "Empty array");
// test((findVal) => id => findVal - id, [5], 10, 1, "Single element, target greater");
// test((findVal) => id => findVal - id, [10], 5, 0, "Single element, target smaller");
// test((findVal) => id => findVal - id, [10], 10, 0, "Single element, exact match");
//
// test((findVal) => id => findVal - id, [1, 2, 3], 0, 0, "Insert before all");
// test((findVal) => id => findVal - id, [1, 2, 3], 2, 1, "Exact match");
// test((findVal) => id => findVal - id, [1, 2, 3], 4, 3, "Insert at end");
//
// test((findVal) => id => findVal - id, [1, 3, 5, 7], 4, 2, "Insert between 3 and 5");
// test((findVal) => id => findVal - id, [1, 3, 5, 7], 5, 2, "Exact match");
// test((findVal) => id => findVal - id, [1, 3, 5, 7], 6, 3, "Insert between 5 and 7");
// test((findVal) => id => findVal - id, [1, 3, 5, 7], 8, 4, "Insert after all");
//
// // === DESCENDING ORDER ===
//
// test((findVal) => id => id - findVal, [100, 66, 40, 30, 10], 66, 1, "Descending match");
// test((findVal) => id => id - findVal, [100, 66, 40, 30, 10], 35, 3, "Descending insert between 40 and 30");
// test((findVal) => id => id - findVal, [100, 66, 40, 30, 10], 5, 5, "Descending insert at end");
// test((findVal) => id => id - findVal, [100, 66, 40, 30, 10], 120, 0, "Descending insert at beginning");
// test((findVal) => id => id - findVal, [50, 40], 45, 1, "Descending insert between two");
//
// // === Misc edge tests ===
// test((findVal) => id => findVal - id, [66], 66, 0, "Match on one-element list");
// test((findVal) => id => findVal - id, [10, 20, 30], 25, 2, "Insert in middle");

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

export function atPercent(array, percent) {
  if (!Array.isArray(array)) {
    return undefined;
  }

  return array[Math.round((array.length - 1) * percent)];
}
