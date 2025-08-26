import { createComputed, createEffect, createRenderEffect, createSignal, on, untrack } from "solid-js";
import { assertFunction, unwrapFunction } from "../functionUtils";
import { Fetcher } from "./Fetcher";
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

export const cacheOnly = (cacheOnlySignal, creationFunction, ...args) => {
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
    refreshFetcherWhenActive = !cacheOnlySignal();
    if (refreshFetcherWhenActive) {
      switchCacheType(f);
    }
  }));

  createRenderEffect(on(cacheOnlySignal, currentState => {
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

export const defaultOrCacheOnly = (defaultSignal, cacheOnlySignal, creationFunction, ...args) => {
  const [fetcher, setFetcher] = fetcherSignal(createFetcherWithArguments, creationFunction, args);

  let originalType, updateDefault, updateFresh;
  createRenderEffect(on(fetcher, localFetcher => {
    originalType = updateDefault = updateFresh = null;
    if (!localFetcher) {
      return;
    };

    originalType = localFetcher.settings.type;
    if (!defaultSignal() && !cacheOnlySignal()) {
      return;
    }

    if (cacheOnlySignal()) {
      updateDefault = updateFresh = true;
      localFetcher.settings.type = localizations.onlyIfCached;
    } else if (defaultSignal()) {
      updateFresh = true;
      localFetcher.settings.type = localizations.defaultVal;
    }
  }));

  createRenderEffect(on(() => [defaultSignal(), cacheOnlySignal()], ([defaultState, cacheState]) => {
    const localFetcher = untrack(fetcher);
    if (!localFetcher) {
      return;
    }

    asserts.assertTrue(originalType);

    if (cacheState) {
      localFetcher.settings.type = localizations.onlyIfCached;
    } else if (defaultState) {
      if (updateDefault) {
        const fetcher = createFetcherWithArguments(creationFunction, args);
        if (fetcher) {
          fetcher.settings.type = localizations.defaultVal;
          updateDefault = false;
          setFetcher(fetcher);
        }
      } else {
        localFetcher.settings.type = localizations.defaultVal;
      }
    } else {
      if (updateFresh) {
        const fetcher = createFetcherWithArguments(creationFunction, args);
        if (fetcher) {
          fetcher.settings.type = originalType
          updateDefault = updateFresh = false;
          setFetcher(fetcher);
        }
      } else {
        localFetcher.settings.type = originalType;
      }
    }
  }, { defer: true }));

  return fetcher;
}
