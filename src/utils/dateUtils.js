export const nowPlusMilliSeconds = ms => {
  const now = new Date();
  now.setMilliseconds(now.getMilliseconds() + ms);
  return now;
}

export const nowPlusSeconds = s => nowPlusMilliSeconds(s * 1000);
export const nowPlusMinutes = m => nowPlusMilliSeconds(m * 60 * 1000);
export const nowPlusHours = h => nowPlusMilliSeconds(h * 60 * 60 * 1000);
export const nowPlusDays = d => nowPlusMilliSeconds(d * 24 * 60 * 60 * 1000);
