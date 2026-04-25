import { assertTypeInteger } from "../collections/asserts";
import { getLocalStorageJson } from "../utils/localStorageUtils";
import { leftJoinObjects } from "../utils/objectUtils";

const baseLimits = {
  "https://graphql.anilist.co": {
    limit: 60,
    remaining: 60,
    resetTime: 0,
    requests: [],
    timeToWait: self => {
      const now = new Date();
      // Anilist internal rate limit has been hit, resume only after reset time has passed
      if (self.resetTime > now) return self.resetTime - now;

      if (self.remaining === 0) {
        const { end, start } = self.requests.at(-self.limit) ?? {};
        const time = (end || start || now) + 60_000;
        return Math.max(time - now, 0);
      }

      // Only allow 4 request back to back if the requests are from new session.
      // So the last request was over 90 seconds ago
      const _only4ReqIn1SecIfNewSession = (self.requests.at(-4)?.start + 90_000) || now;

      // Only allow 3 request in one second, but respect the 4 back to back requests if new session
      const only3ReqIn1Sec = Math.min(self.requests.at(-3)?.start + 1000, _only4ReqIn1SecIfNewSession) || now;
      // Only allow 4 request in two seconds, but respect the 4 back to back requests if new session
      const only4ReqIn2Sec = Math.min(self.requests.at(-4)?.start + 2000, _only4ReqIn1SecIfNewSession) || now;
      // Only allow 6 request in five seconds
      const only6ReqIn5Sec = (self.requests.at(-6)?.start + 5000) || now;

      // If 10 or less tokens remain limit requests to one per second
      const tok10ReqIn1Sec = self.remaining <= 10 ? (self.requests.at(-1)?.start + 1000) || now : now;
      // If 5 or less tokens remain limit requests to one per two seconds
      const tok5ReqIn2Sec = self.remaining <= 5 ? (self.requests.at(-1)?.start + 2000) || now : now;
      // If 2 or less tokens remain limit requests to one per four seconds
      const tok2ReqIn2Sec = self.remaining <= 2 ? (self.requests.at(-1)?.start + 4000) || now : now;

      return Math.max(now, only3ReqIn1Sec, only4ReqIn2Sec, only6ReqIn5Sec, tok10ReqIn1Sec, tok5ReqIn2Sec, tok2ReqIn2Sec) - now;
    }
  }
};

export function addFetcherToRateLimit(fetcher) {
  const rateLimit = getRateLimitRow(fetcher);
  if (!rateLimit) return;

  const now = new Date().getTime();
  rateLimit.requests.push({ start: now });
  // Remove requests if they are over 2 min old
  rateLimit.requests = rateLimit.requests.filter(row => now - row.start > 120_000);

  storeRateLimits();
}

export function setFetchResponseToRateLimit(fetcher, response) {
  const rateLimit = getRateLimitRow(fetcher);
  if (!rateLimit) return;

  const now = new Date().getTime();

  // const status = response?.status || "cors";
  const retry = parseInt(response?.headers?.get("Retry-After"));
  const limit = parseInt(response?.headers?.get("X-Ratelimit-Limit"));
  const remain = parseInt(response?.headers?.get("X-Ratelimit-Remaining"));

  rateLimit.resetTime = retry ? retry * 1000 + now : 0;
  rateLimit.limit = limit ? limit : Math.max(rateLimit.limit - 1, 0);
  rateLimit.remaining = remain ? remain : Math.max(rateLimit.remaining);

  storeRateLimits();
}

function getRateLimitRow(fetcher) {
  const [url] = fetcher;
  const baseKey = Object.keys(baseLimits).find(key => url.includes(key));
  if (!baseKey) return;

  updateRateLimitFromStorage();

  return baseLimits[baseKey];
}

function updateRateLimitFromStorage() {
  const obj = getLocalStorageJson("LOB-external-rate-limits", {});
  leftJoinObjects(baseLimits, obj);
}

function storeRateLimits() {
  localStorage["LOB-external-rate-limits"] = JSON.stringify(baseLimits);
}

export function getRateLimitFromFetcher(fetcher) {
  const rateLimit = getRateLimitRow(fetcher);
  if (!rateLimit) return 0;

  const ms = rateLimit.timeToWait(rateLimit);

  assertTypeInteger(ms, "Rate limit delay did not return number");

  return ms;
}
