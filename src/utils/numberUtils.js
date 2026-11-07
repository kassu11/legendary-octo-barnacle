export const isNumber = num => !isNaN(num) && typeof num === "number";

export const parse = (string, fallback) => {
  const num = Number(string);
  return isNumber(num) ? num : fallback;
}

export const min = (a, b) => {
  return Math.min(a ?? b, b ?? a);
}

export const max = (a, b) => {
  return Math.max(a ?? b, b ?? a);
}

export const lerp = (a, b, t) => {
  return a + t * (b - a);
}
