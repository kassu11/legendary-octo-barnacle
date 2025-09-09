export const numberCommas = num => {
  if (num == undefined) return;
  return Intl.NumberFormat("ja-JP").format(num)
}

export const compactNumber = num => {
  if (num == undefined) return;
  asserts.assertTrue(typeof num === "number", "Number is not typeof number");

  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(num);
}
