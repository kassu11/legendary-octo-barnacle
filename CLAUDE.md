# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A SolidJS single-page app that combines the AniList (GraphQL) and MyAnimeList (via the Jikan REST API) APIs into one site. Plain JavaScript/JSX, no TypeScript sources. Package manager is pnpm.

## Commands

```bash
pnpm i                              # install
pnpm run dev                        # dev server on http://localhost:5173, opens a browser (runs ESLint through vite-plugin-checker)
pnpm run build                      # production build into dist/
npx eslint "./src/**/*.{js,jsx}"    # lint (same command the dev checker uses)
```

There is no test suite. Verify changes with lint and `pnpm run build`. Lint errors fail the dev overlay; `local/scoped-component-class` is only a warning, but fix those too.

## Git and deployment

- Never commit, push or create PRs. The user reviews the diff, tests and commits themselves.
- Never run the deploy scripts (`pnpm run deploy*`, `scripts/deploy.js`) unless explicitly asked. They publish to the `gh-pages` branch and hard-reset its worktree.

## Ports and authentication

AniList OAuth client ids are chosen by host in `anilistClientId()` (`src/utils/urlUtils.js`): GitHub Pages, port 5173 (`__PORT__`) and port 5174 (`__DEBUG_PORT__`, a second dev instance used to sign in as another user). Sign-in won't work on any other port. `__PORT__`, `__DEBUG_PORT__`, `__BASE__`, `__BRANCH__` and `__DEPLOYMENT__` are injected by `vite.config.js` `define`.

## Architecture

### Layered imports (enforced by ESLint `import-x/no-restricted-paths`)

`app -> pages -> components -> state/hooks/api -> utils/constants`

Lower layers can't import from higher ones (`state`, `hooks` and `api` are peers and may import each other). A page under `src/pages/<Page>` can't import from another page. Code shared between pages belongs in `components`, `hooks` or `utils`. Use the `@/` alias for `src/`.

Always import everything explicitly. `unplugin-auto-import` is configured only for the user's editor convenience; ESLint `no-undef` fails on names that aren't imported.

Routes are all declared in `src/index.jsx`. `src/app/App.scoped.jsx` is the router root layout (nav, footer, notifications, loading bar).

### Scoped styling (custom Vite plugins in `vite-plugins/`)

This is the main thing to understand before touching UI code:
- A `Foo.scoped.jsx` file gets a hash-based data attribute added to **every native element** in it. The matching `Foo.scoped.css` has every selector scoped to that attribute. Styles in a scoped CSS file therefore only reach elements written in its own JSX file.
- Components that have any CSS use `Foo.scoped.jsx` + `Foo.scoped.css`, imported explicitly (`import "./Foo.scoped.css";`). A plain `.jsx` file is only for components without any styling.
- Each component should own all of its CSS. Variants and new features go behind a prop or a class (flag) that is styled inside the component's own scoped CSS, not styled from the parent.
- Passing the scope to a child with the `scoped` prop (`<MediaCard scoped class="media-card" />`, which lets the parent's CSS reach the child's root) exists and is used, but avoid it in new code unless there's a good reason. When it is used, the child must spread props onto its root element, and the ESLint rule `local/scoped-component-class` (`eslint-rules/`) requires the class to be the component name in kebab-case, both at the call site and on the element that receives the props. Icons from `src/assets/icons.jsx` are exempt.
- CSS custom properties named `--scoped...` are renamed per file, so they act as file-local variables.
- Don't rely on global utility classes for state classes like `.hidden`; define them in the component's scoped CSS.
- The scoping plugin comes from another repository and is tested there. Don't modify it unless asked.

CSS cascade layers are declared in `src/index.css`: `reset, base, utility, component, layout`. Scoped files usually wrap their rules in `@layer layout` or `@layer component`. Design tokens (colors, `--fs-*` font sizes, etc.) live in `src/index.css` `:root`. CSS uses native nesting; nest media/container queries inside the selector they affect.

### Data fetching (`src/api`)

- GraphQL queries are `.graphql` files in `src/api/queries/`, re-exported from `src/api/queries.js` and used as `queries.<name>` (via `import { queries } from "@/api/api"`). A Vite plugin minifies them, sorting fields, at load time. New queries need to be added to `queries.js`.
- A "fetcher" is an `[url, params]` array with a `cacheKey` built from the url and params (`createFetcher`, `createAnilistFetcher`, `createJsonGetFetcher` in `fetcherUtils.js`). Token values are replaced by user ids in AniList cache keys.
- `sendFetcher` / `sendAnilistFetcher` never return data. They pass it to `settings.setValue`, possibly twice:
  1. Cached data from IndexedDB (`settings.cache.get`) is passed to `setValue` right away.
  2. `settings.active` decides whether to fetch. If it does, the response is passed to `setValue` again with `cache: false` and written to the cache.
  
  They also handle per-host rate limits (`fetchRateLimits.js`), request deduplication, the global loading bar and error notifications.
- Caching: in production, cached entries are refetched once per session. On localhost (`modes.debug`) a cached entry is used without refetching, so live reloading doesn't get AniList to rate limit the app. Because the query and variables are part of the cache key, changing a query creates a new entry. Pass `cache: null` for requests that shouldn't be cached (mutations etc.).
- Mutations and other one-off requests use `fetcherToFetch(fetcher)`, which returns the response directly and skips the cache.
- Standard pattern in components (see `src/pages/Activity/ActivityIndex.scoped.jsx`):

  ```jsx
  const [data, setData] = createSignal(undefined, { equals: false });
  const controller = createCleanUpAbortController();
  let fetcher;
  createEffect(() => {
    const signal = controller.abortAndRenew();
    fetcher = createAnilistFetcher(queries.anilistActivityById, { id: params.id }, signal);
    sendAnilistFetcher(fetcher, {
      name: "Anilist activity",
      onFetch: () => controller.disable(),
      setValue: (res, { fetcher: f }) => {
        // Ignore responses from fetchers that have since been replaced
        if (f.cacheKey === fetcher.cacheKey) setData(res.data.data.Activity);
      },
    });
  });
  ```
- `apiTranslations.js` maps between internal search params and AniList/MAL params.

### State

`src/state` holds global signals (`globalState.js`: auth tokens via `token2`, `authUserData`, loading count), app notifications (`notifications.js`), and context providers (authentication, responsive, etc.) wired up in `src/index.jsx`.

### Workers

Heavy list processing (user media lists, compare, relations) runs in web workers in `src/workers/`, imported with Vite's `?worker` suffix.

## Style

2-space indentation (`.editorconfig`), double quotes, semicolons.

### CSS

- Nest selectors to mirror the DOM structure of the component's JSX, as deep as the markup goes, so the CSS reads like the markup. Scoping keeps selectors local, so specificity is almost never a concern; don't flatten rules or invent BEM-style class names to manage it.
- Write every media/container query nested directly under the selector it affects, even if that repeats the same breakpoint (e.g. several `@media (width < 40em)` blocks) in one file. Don't collect responsive overrides into one query block at the end of the file.
- Use range syntax for queries: `@media (width < 50em)`, `@container name (width < 42em)`.

```css
@layer component {
  .media-card {
    display: grid;
    grid-template-columns: auto 1fr;

    @media (width < 40em) {
      grid-template-columns: 1fr;
    }

    .cover {
      width: 8rem;

      @media (width < 40em) {
        width: 100%;
      }
    }

    .details {
      padding: 8px;

      h3 {
        font-size: var(--fs-500);
      }
    }
  }
}
```
