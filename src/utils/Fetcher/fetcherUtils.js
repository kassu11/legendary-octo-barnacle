import { createEffect, createSignal, on } from "solid-js";
import { assertFunction, unwrapFunction } from "../functionUtils";
import { Fetcher, send } from "./Fetcher";
import * as fetchers from "../fetchers/fetchers.js";

const DEBUG = location.origin.includes("localhost");

/**
 * @param {(any) => Fetcher} fetcherCreater
 */
const unwrapFetcherArguments = (fetcherCreater, ...args) => {
  assertFunction(fetcherCreater);

  const unwrapperArgs = [];
  for(const arg of args) {
    const value = unwrapFunction(arg);
    if (value === undefined) {
      return;
    }

    unwrapperArgs.push(value);
  }

  return fetcherCreater(...unwrapperArgs);
}

/**
 * @param {(any) => Fetcher} fetcherCreater
 */
const unwrapFetcherArgumentsPageless = (fetcherCreater, ...args) => {
  const fetcher = unwrapFetcherArguments(fetcherCreater, ...args);
  if (fetcher) {
    fetcher.options.body.variables.page = "pageless";
    fetcher.settings.type = "only-if-cached";
  }
  return fetcher;
}

/**
 * @param {(any) => Fetcher} fetcherCreater
 */
export const createSignalFetcher = (fetcherCreater, ...args) => {
  const [fetcher, setFetcher] = createSignal(unwrapFetcherArguments(fetcherCreater, ...args));

  let counter = 0;
  createEffect(() => {
    const fetcher = unwrapFetcherArguments(fetcherCreater, ...args);
    if (counter++ && fetcher) {
      setFetcher(fetcher);
    }
  });

  return fetcher;
}

/**
 * @param {(any) => Fetcher} fetcherCreater
 */
export const createAnilistPagelessSignalFetcher = (fetcherCreater, ...args) => {
  const [fetcher, setFetcher] = createSignal(unwrapFetcherArgumentsPageless(fetcherCreater, ...args));

  let counter = 0;
  createEffect(() => {
    const fetcher = unwrapFetcherArgumentsPageless(fetcherCreater, ...args);
    if (counter++ && fetcher) {
      setFetcher(fetcher);
    }
  });

  return fetcher;
}

export const activationController = (signal, creationFunction, ...args) => {
  const fetcher = creationFunction(...args);
  const value = () => {
    if (signal()) {
      return fetcher();
    }
    return undefined;
  }

  return value;
}

export { fetchers, send };
