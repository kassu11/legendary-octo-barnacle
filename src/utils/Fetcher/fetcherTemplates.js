import { assert } from "../assert";
import { Fetcher } from "./Fetcher";

const DEBUG = location.origin.includes("localhost");

export const anilistAuth = (token, query, variables = {}, formatResponse) => {
  assert(query.length > 10, "Query must be above of length 10");
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  return new Fetcher("https://graphql.anilist.co", {
    method: "POST",
    headers,
    body: {
      query,
      variables,
    },
  }, formatResponse);
};

export const offlineFetcher = (fileName, formatResponse, ms = 0) => {
  assert(fileName, "Filename is missing");
  const path = location.pathname.split("/")[1];

  const fetcher = new Fetcher("/" + path + "/" + fileName, undefined, formatResponse);
  fetcher.delay = ms;
  return fetcher;
};
