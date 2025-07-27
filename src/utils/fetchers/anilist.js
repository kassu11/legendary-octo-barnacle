import { Fetch } from "./Fetch";
import * as queries from "../querys.js";
import * as fetchers from "./fetchers.js";
import { Fetcher } from "./Fetcher.js";

export const searchMedia = (token, variables, page, extraVariables = {}) => {
  const variableObject = variables.reduce((acc, v) => {
    if (v.active) { acc[v.key] = v.value; }
    return acc;
  }, { page });

  Object.entries(extraVariables).forEach(([key, value]) => {
    if (key === "format" || key === "season" || key === "seasonYear") {
      variableObject[key] = value;
    } else if (key === "episodeGreater") {
      variableObject[key] = Math.max(value, variableObject[key] || 0);
    } else {
      variableObject[key] &&= [value, variableObject[key]].flat();
      variableObject[key] ??= value;
    }
  });

  return Fetch.authAnilist(token, queries.searchMedia, variableObject, (response) => response.data.Page);
}

export const getActivity = (token, variables, page = 1) => {
  return fetchers.anilistAuth(token, queries.anilistActivity, { ...variables, page }, res => res.data.Page);
  return Fetch.authAnilist(token, queries.anilistActivity, { ...variables, page }, res => res.data.Page)
    // .cacheKeyGenerator(keyObj => {
    //   console.log("generator", keyObj)
    //   delete keyObj.body.variables.page;
    //   return keyObj;
    // })
    // .setFormatSave((newRes, cacheRes) => {
    //   if (cacheRes == null) {
    //     return newRes;
    //   }
    //   const firstActivity = newRes.data.activities[0];
    //   const lastActivity = newRes.data.activities.at(-1);
    //   if (firstActivity == null) {
    //     cacheRes.data.activities.length = Math.min(newRes.data.pageInfo.currentPage * newRes.data.pageInfo.perPage, cacheRes.data.activities.length);
    //     return cacheRes;
    //   }
    //
    //   const index = cacheRes.data.activities.findIndex(activity => activity.id <= firstActivity.id);
    //   if (index === -1) {
    //     cacheRes.data.activities.push(...newRes.data.activities);
    //   } else {
    //     for (let i = 0; i < newRes.data.activities.length; i++) {
    //       array[index + i] = newRes.data.activities[i];
    //     }
    //     let count = 0;
    //     for (let i = 0; i < 200; i++) {
    //       if (cacheRes.data.activities[index + newRes.data.activities.length + i].id >= lastActivity.id) {
    //         count++;
    //       } else {
    //         break;
    //       }
    //     }
    //
    //     cacheRes.data.activities.splice(index + newRes.data.activities.length + 1, count);
    //   }
    //
    //   return cacheRes;
    // })
    // .setFormatLoad(res => {
    //   console.log("Format:", res.data.pageInfo);
    //   return res;
    // });
};
