import { IndexedDB } from "../api";
import { assert } from "../assert";
import { CacheObject } from "./CacheObject";
import { Fetch } from "./Fetch";
import { Fetcher } from "./Fetcher";
import { FetchSettings } from "./FetchSettings";
import { batch, createEffect, createSignal, onCleanup, untrack } from "solid-js";

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
