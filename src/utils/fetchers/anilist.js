import * as queries from "../querys.js";
import * as fetcherTemplates from "../Fetcher/fetcherTemplates.js";

export const getActivity = (token, variables, page = 1) => {
  return fetcherTemplates.anilistAuth(token, queries.anilistActivity, { ...variables, page }, res => res.data.Page);
};
