import { asserts } from "../collections/collections";

const isObject = value => typeof value === "object" && value;

export const mergeObjects = (base, ...objs) => {
  asserts.assertFalse(objs.length < 1, "Give more objects");

  for (const obj of objs) {
    merge(base, obj);
  }

  return base;
}

const merge = (base, obj) => {
  for (const key in obj) {
    base[key] ??= obj[key];
    if (isObject(base[key]) && isObject(obj[key])) {
      merge(base[key], obj[key]);
    } else {
      base[key] = obj[key];
    }
  }
}
