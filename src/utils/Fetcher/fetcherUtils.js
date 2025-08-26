import { createRenderEffect, createSignal, on, untrack } from "solid-js";
import { assertFunction, unwrapFunction } from "../functionUtils";
import { Fetcher, send } from "./Fetcher";
import * as fetchers from "../fetchers/fetchers.js";
import { asserts, localizations } from "../utils.js";

/**
 * @param {(any) => Fetcher} fetcherCreator
 */
const createFetcherWithArguments = (fetcherCreator, args) => {
  assertFunction(fetcherCreator);

  const unwrapperArgs = [];
  for (const arg of args) {
    const value = unwrapFunction(arg);
    if (value === undefined) {
      return;
    }

    unwrapperArgs.push(value);
  }

  return fetcherCreator(...unwrapperArgs);
}

/**
 * @param {(fetcherCreator, args) => Fetcher} createWithArgs
 * @param {(args) => Fetcher} fetcherCreator
 * @param {Array<any>} args
 */
const fetcherSignal = (createWithArgs, fetcherCreator, args) => {
  const [fetcher, setFetcher] = createSignal();

  createRenderEffect(() => {
    const fetcher = createWithArgs(fetcherCreator, args);
    if (fetcher) {
      setFetcher(fetcher);
    }
  });

  return [fetcher, setFetcher];
}

/**
 * @param {(any) => Fetcher} fetcherCreator
 */
const createPagelessFetcherWithArguments = (fetcherCreator, args) => {
  const fetcher = createFetcherWithArguments(fetcherCreator, args);
  if (fetcher) {
    fetcher.options.body.variables.page = "pageless";
    fetcher.settings.type = "only-if-cached";
  }
  return fetcher;
}

/**
 * @param {(any) => Fetcher} fetcherCreator
 */
export const createSignalFetcher = (fetcherCreator, ...args) => {
  const [fetcher] = fetcherSignal(createFetcherWithArguments, fetcherCreator, args);
  return fetcher;
}

/**
 * @param {(any) => Fetcher} fetcherCreator
 */
export const createAnilistPagelessSignalFetcher = (fetcherCreator, ...args) => {
  const [fetcher] = fetcherSignal(createPagelessFetcherWithArguments, fetcherCreator, args);
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

export const defaultOrCache = (signal, creationFunction, ...args) => {
  const [fetcher, setFetcher] = fetcherSignal(createFetcherWithArguments, creationFunction, args);

  let previousType;
  const switchCacheType = localFetcher => {
    if (localFetcher) {
      [previousType, localFetcher.settings.type] = [localFetcher.settings.type, previousType];
    }
  }

  let refreshFetcherWhenActive;
  createRenderEffect(on(fetcher, f => {
    previousType = localizations.onlyIfCached;
    refreshFetcherWhenActive = !signal();
    if (refreshFetcherWhenActive) {
      switchCacheType(f);
    }
  }));

  createRenderEffect(on(signal, currentState => {
    asserts.assertFalse(!currentState && refreshFetcherWhenActive);

    if (refreshFetcherWhenActive) {
      asserts.assertTrue(currentState);
      refreshFetcherWhenActive = false;
      previousType = localizations.onlyIfCached;
      const fetcher = switchCacheType(createFetcherWithArguments(creationFunction, args));
      asserts.assertTrue(fetcher, "This might cause a weird edge case but not sure if this will ever really happen.");
      setFetcher(fetcher);
    } else {
      switchCacheType(untrack(fetcher));
    }
  }, { defer: true }));


  return fetcher;
}

export { fetchers, send };
