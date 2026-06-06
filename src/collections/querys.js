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

export const anilistGetMediasWithIds = count => format`query ($type: MediaType, $id_in: [Int], $idMal_in: [Int]) {
  ${[...Array(Math.ceil(count / 50))].map((_, i) => {
    return `page${i + 1}: Page(page: ${i + 1}) {
      media(type: $type, id_in: $id_in, idMal_in: $idMal_in) {
        ...media
      }
    }`;
  }).join(" ")}
}

fragment media on Media {
  id
  idMal
  type
  bannerImage
  title {
    userPreferred
  }
  coverImage {
    large
  }
}`;

export const anilistGetCharacterIds = count => format`query ($ids: [Int]) {
  ${[...Array(Math.ceil(count / 50))].map((_, i) => {
    return `page${i + 1}: Page(page: ${i + 1}) {
      characters(id_in: $ids) {
        ...characters
      }
    }`;
  }).join(" ")}
}

fragment characters on Character {
  id
  name {
    userPreferred
  }
  image {
    large
  }
}`;

export const animeThemesByAnilistId = ({ id }) => `https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=AniList&filter[external_id]=${id}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`;
export const animeThemesByMyAnimeListId = ({ id }) => `https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=MyAnimeList&filter[external_id]=${id}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`;
export const animeThemesByArtisSlug = ({ slug }) => `https://api.animethemes.moe/artist/${slug}?include=songs.animethemes.anime,songs.animethemes.animethemeentries.videos.audio,songs.animethemes.song.artists,resources,images`;
export const myAnimeListMediaById = ({ type, id }) => `https://api.jikan.moe/v4/${type}/${id}/full`;
export const myAnimeListMediaCharactersById = ({ id, type }) => `https://api.jikan.moe/v4/${type}/${id}/characters`;
export const myAnimeListAnimeCharactersById = id => `https://api.jikan.moe/v4/anime/${id}/characters`;
export const myAnimeListMangaCharactersById = id => `https://api.jikan.moe/v4/manga/${id}/characters`;
export const myAnimeListCharacterById = ({ id }) => `https://api.jikan.moe/v4/characters/${id}/full`;
export const myAnimeListAnimeStaffById = ({ id }) => `https://api.jikan.moe/v4/anime/${id}/staff`;
export const myAnimeListMediaSearch = ({ type, query }) => `https://api.jikan.moe/v4/${type}?${query}`;
export const myAnimeListMediaSeasonSearch = ({ season, query }) => `https://api.jikan.moe/v4/seasons/${season}?${query}`;
export const myAnimeListMediaGenres = ({ type }) => `https://api.jikan.moe/v4/genres/${type}`;


function format(strings, ...templates) {
  const array = [];
  for (let i = 0; i < strings.length; i++) {
    array.push(strings[i], templates[i] || "");
  }

  const whitespaceAroundChar = /\s*([{}():,[\]])\s*/g;

  return array.join("").replace(/\n|\r/g, " ").replace(whitespaceAroundChar, "$1").replace(/\s{2,}/g, " ");
}
