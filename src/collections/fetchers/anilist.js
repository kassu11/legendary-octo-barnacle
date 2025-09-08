import { asserts, fetcherTemplates, localizations, queries } from "../collections.js";
import { fetcherUtils } from "../../utils/utils.js";

const formatPage = res => res.data.Page;

export const activityPage = (token, variables, page = 1) => {
  return fetcherTemplates.anilistAuthNoStore(token, queries.anilistActivity, { ...variables, page }, formatPage);
};

export const activityPageless = (token, variables) => {
  const fetcher = activityPage(token, variables, "pageless");
  return fetcherUtils.changeCacheType(fetcher, localizations.onlyIfCached);
};

export const getMediaById = (token, id) => {
  return fetcherTemplates.anilistAuth(token, queries.anilistMediaById, { id }, res => res.data.Media);
};

export const getFrendScoresFromMedia = (token, id, variables) => {
  return fetcherTemplates.anilistAuth(token, queries.anilistGetFriendMediaScore, { id, ...variables }, formatPage);
};

const notificationTypes = type => {
  switch (type) {
    case "airing": return [ "AIRING" ];
    case "activity": return [ "ACTIVITY_MESSAGE", "ACTIVITY_MENTION", "ACTIVITY_REPLY", "ACTIVITY_LIKE", "ACTIVITY_REPLY_LIKE" ];
    case "forum": return [ "THREAD_COMMENT_REPLY", "THREAD_SUBSCRIBED", "THREAD_COMMENT_MENTION", "THREAD_LIKE", "THREAD_COMMENT_LIKE" ];
    case "follows": return [ "FOLLOWING" ];
    case "media": return [ "RELATED_MEDIA_ADDITION", "MEDIA_DATA_CHANGE", "MEDIA_MERGE", "MEDIA_DELETION" ];
    case "all": return undefined;
    default: asserts.unreachable("Unknown notification type");
  }
};

export const notificationPage = (token, type, page = 1) => {
  const types = notificationTypes(type);
  return fetcherTemplates.anilistAuthNoStore(token, queries.anilistUserNotifications, { page, types }, formatPage);
};

export const notificationPageless = (token, type) => {
  const fetcher = notificationPage(token, type, "pageless");
  return fetcherUtils.changeCacheType(fetcher, localizations.onlyIfCached);
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
  return activityPage(token, variables, page);
};
