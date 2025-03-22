export const capitalize = text => {
  if (!text?.length) return "";
  return text[0].toUpperCase() + text.substring(1).toLowerCase();
}

export const numberCommas = num => {
  if (num == undefined) return;
  return Intl.NumberFormat("ja-JP").format(num)
}
