/**
 * @typedef {Object} ActiveQuery
 * @property {string} description
 * @property {Function} [icon]
 * @property {string} [image] Shown instead of the icon
 * @property {string} [imageColor] Background color behind the image
 * @property {Object} query Search params that remove this query
 * @property {boolean} clearable Removed by the clear all query and counted as an active filter
 * @property {boolean} [clearAll] Clear all button instead of a single query
 * @property {() => void} onRemove
 */

/**
 * @param {Object} activeQuery
 * @param {string} activeQuery.description
 * @param {Object} activeQuery.query Search params that remove this query
 * @param {Function} [activeQuery.icon]
 * @param {string} [activeQuery.image]
 * @param {string} [activeQuery.imageColor]
 * @param {boolean} [activeQuery.clearable=true]
 * @param {(query: Object) => void} remove Sets the search params
 * @returns {ActiveQuery}
 */
export function createActiveQuery({ description, query, icon, image, imageColor, clearable = true }, remove) {
  return { description, query, icon, image, imageColor, clearable, onRemove: () => remove(query) };
}

/**
 * One active query per value of a search param, removing a query removes only its value
 *
 * @param {string} param
 * @param {string[]} values
 * @param {(value: string) => Object | false | undefined} toActiveQuery Fields of createActiveQuery without the query, falsy skips the value
 * @param {(query: Object) => void} remove
 * @returns {ActiveQuery[]}
 */
export function createValueActiveQueries(param, values, toActiveQuery, remove) {
  const activeQueries = [];
  for (const value of values) {
    const activeQuery = toActiveQuery(value);
    if (activeQuery) activeQueries.push(createActiveQuery({ ...activeQuery, query: { [param]: values.filter(other => other !== value) } }, remove));
  }
  return activeQueries;
}

/**
 * toActiveQuery of createValueActiveQueries for values that are excluded with a "-" prefix
 *
 * @param {string} label
 * @param {Function} icon
 * @param {(id: string) => string} [describe] Description of the value without the prefix
 */
export function excludableValueActiveQuery(label, icon, describe = id => id) {
  return value => {
    const excluded = value.startsWith("-");
    const id = excluded ? value.slice(1) : value;
    return { description: (excluded ? "Exclude " : "") + label + ": " + describe(id), icon };
  };
}

/**
 * Active query of a search param that is "true" when included and "false" when excluded
 *
 * @param {string} param
 * @param {string} [value]
 * @param {{ included: string, excluded: string, icon: Function }} descriptions
 * @param {(query: Object) => void} remove
 * @returns {ActiveQuery[]} Empty when the param isn't set
 */
export function createToggleActiveQueries(param, value, { included, excluded, icon }, remove) {
  if (value !== "true" && value !== "false") return [];
  return [createActiveQuery({ description: value === "true" ? included : excluded, icon, query: { [param]: undefined } }, remove)];
}

/**
 * Adds a clear all query that removes every clearable query at once, when there are any
 *
 * @param {ActiveQuery[]} activeQueries
 * @param {(query: Object) => void} remove
 */
export function addClearAllActiveQuery(activeQueries, remove) {
  const query = {};
  let hasClearable = false;
  for (const activeQuery of activeQueries) {
    if (!activeQuery.clearable) continue;
    hasClearable = true;
    for (const key of Object.keys(activeQuery.query)) query[key] = undefined;
  }
  if (hasClearable) activeQueries.push({ description: "Clear all", query, clearable: false, clearAll: true, onRemove: () => remove(query) });
}
