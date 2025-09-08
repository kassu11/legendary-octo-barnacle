import { createMemo } from "solid-js";
import { unwrapFunction } from "../functionUtils";
import { Fetcher } from "./Fetcher";
import { asserts } from "../../collections/collections.js";
import { localizations } from "../../collections/collections.js";


export const changeCacheType = (fetcher, type) => {
  if (fetcher) {
    fetcher.settings.type = type;
  }

  return fetcher;
}
