import { createEffect, createSignal } from "solid-js";
import { assertFunction, unwrapFunction } from "../functionUtils";
import { Fetcher, send } from "./Fetcher";
import * as fetchers from "../fetchers/fetchers.js";

const DEBUG = location.origin.includes("localhost");

/**
 * @param {(any) => Fetcher} fetcherCreater
 */
export const createSignalFetcher = (fetcherCreater, ...args) => {
  assertFunction(fetcherCreater);

  const [fetcher, setFetcher] = createSignal();

  createEffect(() => {
    const unwrapperArgs = [];
    for(const arg of args) {
      const value = unwrapFunction(arg);
      if (value === undefined) {
        return;
      }

      unwrapperArgs.push(value);
    }

    setFetcher(fetcherCreater(...unwrapperArgs));
  });

  return fetcher;
}

/**
 * @param {(any) => Fetcher} fetcherCreater
 */
export const createAnilistPagelessSignalFetcher = (fetcherCreater, ...args) => {
  assertFunction(fetcherCreater);

  const [fetcher, setFetcher] = createSignal();

  createEffect(() => {
    const unwrapperArgs = [];
    for(const arg of args) {
      const value = unwrapFunction(arg);
      if (value === undefined) {
        return;
      }

      unwrapperArgs.push(value);
    }

    const fetcher = fetcherCreater(...unwrapperArgs);
    fetcher.options.body.variables.page = "pageless";
    fetcher.settings.type = "only-if-cached";
    setFetcher(fetcher);
  });

  return fetcher;
}

export { fetchers, send };
