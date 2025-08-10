import * as queries from "../querys.js";
import * as fetcherTemplates from "../Fetcher/fetcherTemplates.js";

export const getActivity = (token, variables, page = 1) => {
  return fetcherTemplates.anilistAuth(token, queries.anilistActivity, { ...variables, page }, res => res.data.Page);
};


export const getDemoActivity = (token, variables, page = 1) => {
  if (!variables.isFollowing) {
    switch (page) {
      case 1: return fetcherTemplates.offlineFetcher("globa-activity-page-1.json", 2000, res => res.Page);
      case 2: return fetcherTemplates.offlineFetcher("globa-activity-page-2.json", 200, res => res.Page);
      case 3: return fetcherTemplates.offlineFetcher("globa-activity-page-3.json", 200, res => res.Page);
      case 4: return fetcherTemplates.offlineFetcher("globa-activity-page-4.json", 200, res => res.Page);
      case 5: return fetcherTemplates.offlineFetcher("globa-activity-page-5.json", 200, res => res.Page);
      case 6: return fetcherTemplates.offlineFetcher("globa-activity-page-6.json", 200, res => res.Page);
      case 7: return fetcherTemplates.offlineFetcher("globa-activity-page-7.json", 200, res => res.Page);
      case 8: return fetcherTemplates.offlineFetcher("globa-activity-page-8.json", 200, res => res.Page);
      case 9: return fetcherTemplates.offlineFetcher("globa-activity-page-9.json", 200, res => res.Page);
      case 10: return fetcherTemplates.offlineFetcher("globa-activity-page-10.json", 200, res => res.Page);
      case 11: return fetcherTemplates.offlineFetcher("globa-activity-page-11.json", 200, res => res.Page);
      case 12: return fetcherTemplates.offlineFetcher("globa-activity-page-12.json", 200, res => res.Page);
      case 13: return fetcherTemplates.offlineFetcher("globa-activity-page-13.json", 200, res => res.Page);
      case 14: return fetcherTemplates.offlineFetcher("globa-activity-page-14.json", 200, res => res.Page);
    }
  } else {
    switch (page) {
      case 1: return fetcherTemplates.offlineFetcher("local-activity-page-1.json", 2000, res => res.Page);
      case 2: return fetcherTemplates.offlineFetcher("local-activity-page-2.json", 200, res => res.Page);
      case 3: return fetcherTemplates.offlineFetcher("local-activity-page-3.json", 200, res => res.Page);
      case 4: return fetcherTemplates.offlineFetcher("local-activity-page-4.json", 200, res => res.Page);
      case 5: return fetcherTemplates.offlineFetcher("local-activity-page-5.json", 200, res => res.Page);
      case 6: return fetcherTemplates.offlineFetcher("local-activity-page-6.json", 200, res => res.Page);
      case 7: return fetcherTemplates.offlineFetcher("local-activity-page-7.json", 200, res => res.Page);
      case 8: return fetcherTemplates.offlineFetcher("local-activity-page-8.json", 200, res => res.Page);
    }
  }
  return getActivity(token, variables, page);
};
