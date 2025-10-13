export const numberCommas = num => {
  if (num == undefined) return;
  return Intl.NumberFormat("ja-JP").format(num)
}

export const isNumber = num => !isNaN(num) && typeof num === "number";

export const parse = (string, fallback) => {
  const num = Number(string);
  return isNumber(num) ? num : fallback;
}

export const compactNumber = num => {
  if (num == undefined) return;
  asserts.assertTrue(typeof num === "number", "Number is not typeof number");

  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(num);
}

export const min = (a, b) => {
  return Math.min(a ?? b, b ?? a);
}

export const max = (a, b) => {
  return Math.max(a ?? b, b ?? a);
}
