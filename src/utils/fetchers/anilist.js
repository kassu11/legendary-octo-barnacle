import { fetcherTemplates, queries } from "../utils.js";

const formatPage = res => res.data.Page;

export const getActivity = (token, variables, page = 1) => {
  return fetcherTemplates.anilistAuth(token, queries.anilistActivity, { ...variables, page }, formatPage);
};

export const getMediaById = (token, id) => {
  return fetcherTemplates.anilistAuth(token, queries.anilistMediaById, { id }, res => res.data.Media);
};

export const getFrendScoresFromMedia = (token, id, variables) => {
  return fetcherTemplates.anilistAuth(token, queries.anilistGetFriendMediaScore, { id, ...variables }, formatPage);
};


export const getDemoActivity = (token, variables, page = 1) => {
  if (!variables.isFollowing) {
    switch (page) {
      case 1: return fetcherTemplates.offlineFetcher("globa-activity-page-1.json", res => res.Page, 200);
    }
  } else {
    switch (page) {
      case 1: return fetcherTemplates.offlineFetcher("local-activity-page-1.json", res => res.Page, 200);
      case 2: return fetcherTemplates.offlineFetcher("local-activity-page-2.json", res => res.Page, 200);
      case 3: return fetcherTemplates.offlineFetcher("local-activity-page-3.json", res => res.Page, 200);
      case 4: return fetcherTemplates.offlineFetcher("local-activity-page-4.json", res => res.Page, 200);
    }
  }
  return getActivity(token, variables, page);
};
