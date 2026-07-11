import { objectToSearchParams } from "../utils/objectUtils";
import { arrayUtils } from "../utils/utils";

// Normal Grapql querys, no need to do anything fancy
export { default as anilistMediaById } from "./queries/anilistMediaById.graphql";
export { default as anilistGetActivityLikes } from "./queries/anilistGetActivityLikes.graphql";
export { default as anilistUserSearch } from "./queries/anilistUserSearch.graphql";
export { default as anilistRecommendationsById } from "./queries/anilistRecommendationsById.graphql";
export { default as anilistRateRecommendations } from "./queries/anilistRateRecommendations.graphql";
export { default as anilistActivityRepliedById } from "./queries/anilistActivityRepliedById.graphql";
export { default as anilistActivityById } from "./queries/anilistActivityById.graphql";
export { default as anilistUserNotifications } from "./queries/anilistUserNotifications.graphql";
export { default as anilistGetUserAnimeStats } from "./queries/anilistGetUserAnimeStats.graphql";
export { default as anilistGetUserMangaStats } from "./queries/anilistGetUserMangaStats.graphql";
export { default as anilistGetUserMangaGenres } from "./queries/anilistGetUserMangaGenres.graphql";
export { default as anilistGetUserAnimeGenres } from "./queries/anilistGetUserAnimeGenres.graphql";
export { default as anilistGetUserMangaTags } from "./queries/anilistGetUserMangaTags.graphql";
export { default as anilistGetUserAnimeTags } from "./queries/anilistGetUserAnimeTags.graphql";
export { default as anilistGetUserAnimeStudios } from "./queries/anilistGetUserAnimeStudios.graphql";
export { default as anilistGetUserAnimeVoiceActors } from "./queries/anilistGetUserAnimeVoiceActors.graphql";
export { default as anilistGetUserMangaStaff } from "./queries/anilistGetUserMangaStaff.graphql";
export { default as anilistGetUserAnimeStaff } from "./queries/anilistGetUserAnimeStaff.graphql";
export { default as anilistToggleFollow } from "./queries/anilistToggleFollow.graphql";
export { default as anilistGetUserFollowers } from "./queries/anilistGetUserFollowers.graphql";
export { default as anilistGetUserFollowing } from "./queries/anilistGetUserFollowing.graphql";
export { default as anilistGetFriendMediaScore } from "./queries/anilistGetFriendMediaScore.graphql";
export { default as anilistUserMutateFavourites } from "./queries/anilistUserMutateFavourites.graphql";
export { default as anilistUserFavouriteById } from "./queries/anilistUserFavouriteById.graphql";
export { default as anilistUserMediaList } from "./queries/anilistUserMediaList.graphql";
export { default as anilistCharacters } from "./queries/anilistCharacters.graphql";
export { default as anilistStaff } from "./queries/anilistStaff.graphql";
export { default as anilistDeleteMediaListEntry } from "./queries/anilistDeleteMediaListEntry.graphql";
export { default as anilistMutateToggleFavourite } from "./queries/anilistMutateToggleFavourite.graphql";
export { default as anilistMutateToggleLike } from "./queries/anilistMutateToggleLike.graphql";
export { default as anilistActivity } from "./queries/anilistActivity.graphql";
export { default as currentWachingMedia } from "./queries/currentWachingMedia.graphql";
export { default as anilistCurrentWachingMedia2 } from "./queries/anilistCurrentWachingMedia2.graphql";
export { default as anilistMutateMedia } from "./queries/anilistMutateMedia.graphql";
export { default as anilistStaffById } from "./queries/anilistStaffById.graphql";
export { default as anilistStudioById } from "./queries/anilistStudioById.graphql";
export { default as anilistCharacterById } from "./queries/anilistCharacterById.graphql";
export { default as anilistBrowseMedia } from "./queries/anilistBrowseMedia.graphql";
export { default as anilistBrowseManga } from "./queries/anilistBrowseManga.graphql";
export { default as anilistBrowseAnime } from "./queries/anilistBrowseAnime.graphql";
export { default as searchMedia } from "./queries/searchMedia.graphql";
export { default as anilistGenresAndTags } from "./queries/anilistGenresAndTags.graphql";
export { default as anilistExternalSources } from "./queries/anilistExternalSources.graphql";
export { default as mediaListEntry } from "./queries/mediaListEntry.graphql";
export { default as getUserByName } from "./queries/getUserByName.graphql";
export { default as profileActivity } from "./queries/profileActivity.graphql";
export { default as currentUser } from "./queries/currentUser.graphql";

// Basically normal grapql querys, but we want to dynamicly add pages so we can fetch over 50 entries with one query
// For example 250 entries are split into 5 pages, but they are all inside one query
import { default as anilistGetMediasWithIdsRaw } from "./queries/anilistGetMediasWithIds.graphql";
export const anilistGetMediasWithIds = multiPageFetchQueryGenerator(anilistGetMediasWithIdsRaw);

import { default as anilistGetCharacterIdsRaw } from "./queries/anilistGetCharacterIds.graphql";
export const anilistGetCharacterIds = multiPageFetchQueryGenerator(anilistGetCharacterIdsRaw);

// Generic Jikan and AnimeThemes post request urls
export const animeThemesByAnilistId = ({ id }) => `https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=AniList&filter[external_id]=${id}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`;
export const animeThemesByMyAnimeListId = ({ id }) => `https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=MyAnimeList&filter[external_id]=${id}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`;
export const animeThemesByArtisSlug = ({ slug }) => `https://api.animethemes.moe/artist/${slug}?include=songs.animethemes.anime,songs.animethemes.animethemeentries.videos.audio,songs.animethemes.song.artists,resources,images`;
export const myAnimeListMediaById = ({ type, id }) => `https://api.tenrai.org/v1/${type}/${id}/full`;
export const myAnimeListMediaCharactersById = ({ id, type }) => `https://api.tenrai.org/v1/${type}/${id}/characters`;
export const myAnimeListAnimeCharactersById = id => `https://api.tenrai.org/v1/anime/${id}/characters`;
export const myAnimeListMangaCharactersById = id => `https://api.tenrai.org/v1/manga/${id}/characters`;
export const myAnimeListCharacterById = ({ id }) => `https://api.tenrai.org/v1/characters/${id}/full`;
export const myAnimeListAnimeStaffById = ({ id }) => `https://api.tenrai.org/v1/anime/${id}/staff`;
export const myAnimeListMediaSearch = ({ type, ...rest }) => `https://api.tenrai.org/v1/${type}?${objectToSearchParams(rest)}`;
export const myAnimeListMediaSeasonSearch = ({ season, query }) => `https://api.tenrai.org/v1/seasons/${season}?${query}`;
export const myAnimeListMediaGenres = ({ type }) => `https://api.tenrai.org/v1/genres/${type}`;


// The expected input contains @1, @2 and @3 texts.
// We use these to split the text, repeat the right length of text, 
// and place the page number in the right place
function multiPageFetchQueryGenerator(query) {
  return count => query.replace(/@1(.+)@3/, (_, query) => {
    const callback = i => `page${++i}${query.replace("@2", i)}`;
    return arrayUtils.ArrayFromRange(callback, Math.ceil(count / 50)).join("");
  });
}
