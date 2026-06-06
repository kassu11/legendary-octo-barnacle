import { assertFalsy } from "../collections/asserts";

export const isTypeObject = value => typeof value === "object" && value && !Array.isArray(value);

export const mergeObjects = (base, ...objs) => {
  assertFalsy(objs.length < 1, "Give more objects");

  for (const obj of objs) {
    merge(base, obj);
  }

  return base;
}

const merge = (base, obj) => {
  for (const key in obj) {
    base[key] ??= obj[key];
    if (isTypeObject(base[key]) && isTypeObject(obj[key])) {
      merge(base[key], obj[key]);
    } else {
      base[key] = obj[key];
    }
  }
}

export const leftJoinObjects = (base, ...objs) => {
  assertFalsy(objs.length < 1, "Give more objects");

  for (const obj of objs) {
    leftJoin(base, obj);
  }

  return base;
}

const leftJoin = (base, obj) => {
  for (const key in obj) {
    if (!(key in base)) {
      continue;
    } else if (!isTypeObject(base[key])) {
      base[key] = obj[key];
    } if (isTypeObject(obj[key])) {
      leftJoin(base[key], obj[key]);
    }
  }
}
