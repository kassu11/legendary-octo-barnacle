var Ze=m=>{throw TypeError(m)};var Me=(m,v,y)=>v.has(m)||Ze("Cannot "+y);var g=(m,v,y)=>(Me(m,v,"read from private field"),y?y.call(m):v.get(m)),E=(m,v,y)=>v.has(m)?Ze("Cannot add the same private member more than once"):v instanceof WeakSet?v.add(m):v.set(m,y),P=(m,v,y,w)=>(Me(m,v,"write to private field"),w?w.call(m,y):v.set(m,y),y),_=(m,v,y)=>(Me(m,v,"access private method"),y);var Oe=(m,v,y,w)=>({set _(oe){P(m,v,oe,y)},get _(){return g(m,v,w)}});(function(){"use strict";var B,q,ae,T,Y,re,H,W,K,z,x,ke,et,we,tt,j,Ae;const m=location.hostname==="localhost",v={mal:{anime:{end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"episodes",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"}},manga:{episodes:{api:"chapters",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"},volumes:{api:"volumes",flavorText:"Volumes",alternative_key:"volumes_filtered"}}},ani:{anime:{duration:{api:"DURATION",flavorText:"Duration",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}},manga:{episodes:{api:"CHAPTERS",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"},volumes:{api:"DURATION",flavorText:"Volumes",alternative_key:"volumes_filtered"}},media:{duration:{api:"DURATION",flavorText:"Duration / Volumes",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes / Chapters",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}}}};v.flavorTexts=ne(v);const y={mal:{anime:{cm:{api:"cm",flavorText:"CM"},movie:{api:"movie",flavorText:"Movie"},music:{api:"music",flavorText:"Music"},ona:{api:"ona",flavorText:"ONA"},ova:{api:"ova",flavorText:"OVA"},pv:{api:"pv",flavorText:"PV"},special:{api:"special",flavorText:"Special"},tv:{api:"tv",flavorText:"TV"},tv_special:{api:"tv_special",flavorText:"TV special"}},manga:{doujin:{api:"doujin",flavorText:"Doujin"},lightnovel:{api:"lightnovel",flavorText:"Light novel"},manga:{api:"manga",flavorText:"Manga"},manhua:{api:"manhua",flavorText:"Manhua"},manhwa:{api:"manhwa",flavorText:"Manhwa"},novel:{api:"novel",flavorText:"Novel"},one_shot:{api:"oneshot",flavorText:"One-shot"}}},ani:{anime:{movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},ona:{api:"ONA",flavorText:"ONA"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}},manga:{manga:{api:"MANGA",flavorText:"Manga"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"}},media:{manga:{api:"MANGA",flavorText:"Manga"},movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},ona:{api:"ONA",flavorText:"ONA"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}}}};y.flavorTexts=ne(y);const w={ani:{anime:{winter:{api:"WINTER",flavorText:"Winter"},spring:{api:"SPRING",flavorText:"Spring"},summer:{api:"SUMMER",flavorText:"Summer"},fall:{api:"FALL",flavorText:"Fall"},tba:{api:null,flavorText:"TBA"}}},mal:{anime:{winter:{api:"winter",flavorText:"Winter"},spring:{api:"spring",flavorText:"Spring"},summer:{api:"summer",flavorText:"Summer"},fall:{api:"fall",flavorText:"Fall"}}}};w.flavorTexts=ne(w);const oe={mal:{anime:{releasing:{api:"airing",flavorText:"Airing"},complete:{api:"complete",flavorText:"Complete"},upcoming:{api:"upcoming",flavorText:"Upcoming"}},manga:{cancelled:{api:"discontinued",flavorText:"Cancelled"},complete:{api:"complete",flavorText:"Complete"},hiatus:{api:"hiatus",flavorText:"Hiatus"},publishing:{api:"publishing",flavorText:"Publishing"}}},ani:{anime:{releasing:{api:"RELEASING",flavorText:"Airing"},cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"}},manga:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}},media:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}}}};oe.flavorTexts=ne(oe);function ne(e){return Object.values(e).reduce((t,a)=>Object.values(a).reduce((r,i)=>Object.entries(i).reduce((s,[o,n])=>(s[o]=n.flavorText,s),r),t),{})}const b=(e,t="Not true")=>{if(!e)throw new Error(t)},at=!1,rt=(e,t)=>e===t,F=Symbol("solid-proxy"),be=Symbol("solid-track"),Fe={equals:rt};let Ue=Ve;const U=1,de=2,it={};var I=null;let Te=null,st=null,h=null,A=null,R=null,le=0;function S(e,t){t=t?Object.assign({},Fe,t):Fe;const a={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=i=>(typeof i=="function"&&(i=i(a.value)),Ge(a,i));return[dt.bind(a),r]}function ot(e,t,a){Ue=pt;const r=ct(e,t,!1,U);r.user=!0,R?R.push(r):Se(r)}function $e(e){return X(e)}function ce(e){if(h===null)return e();const t=h;h=null;try{return e()}finally{h=t}}function nt(e){return I===null||(I.cleanups===null?I.cleanups=[e]:I.cleanups.push(e)),e}function Pe(){return h}function dt(){if(this.sources&&this.state)if(this.state===U)Se(this);else{const e=A;A=null,X(()=>pe(this)),A=e}if(h){const e=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(e)):(h.sources=[this],h.sourceSlots=[e]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function Ge(e,t,a){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&X(()=>{for(let i=0;i<e.observers.length;i+=1){const s=e.observers[i],o=Te&&Te.running;o&&Te.disposed.has(s),(o?!s.tState:!s.state)&&(s.pure?A.push(s):R.push(s),s.observers&&Be(s)),o||(s.state=U)}if(A.length>1e6)throw A=[],new Error})),t}function Se(e){if(!e.fn)return;ge(e);const t=le;lt(e,e.value,t)}function lt(e,t,a){let r;const i=I,s=h;h=I=e;try{r=e.fn(t)}catch(o){return e.pure&&(e.state=U,e.owned&&e.owned.forEach(ge),e.owned=null),e.updatedAt=a+1,qe(o)}finally{h=s,I=i}(!e.updatedAt||e.updatedAt<=a)&&(e.updatedAt!=null&&"observers"in e?Ge(e,r):e.value=r,e.updatedAt=a)}function ct(e,t,a,r=U,i){const s={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:I,context:I?I.context:null,pure:a};return I===null||I!==it&&(I.owned?I.owned.push(s):I.owned=[s]),s}function ue(e){if(e.state===0)return;if(e.state===de)return pe(e);if(e.suspense&&ce(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<le);)e.state&&t.push(e);for(let a=t.length-1;a>=0;a--)if(e=t[a],e.state===U)Se(e);else if(e.state===de){const r=A;A=null,X(()=>pe(e,t[0])),A=r}}function X(e,t){if(A)return e();let a=!1;A=[],R?a=!0:R=[],le++;try{const r=e();return ut(a),r}catch(r){a||(R=null),A=null,qe(r)}}function ut(e){if(A&&(Ve(A),A=null),e)return;const t=R;R=null,t.length&&X(()=>Ue(t))}function Ve(e){for(let t=0;t<e.length;t++)ue(e[t])}function pt(e){let t,a=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[a++]=r:ue(r)}for(t=0;t<a;t++)ue(e[t])}function pe(e,t){e.state=0;for(let a=0;a<e.sources.length;a+=1){const r=e.sources[a];if(r.sources){const i=r.state;i===U?r!==t&&(!r.updatedAt||r.updatedAt<le)&&ue(r):i===de&&pe(r,t)}}}function Be(e){for(let t=0;t<e.observers.length;t+=1){const a=e.observers[t];a.state||(a.state=de,a.pure?A.push(a):R.push(a),a.observers&&Be(a))}}function ge(e){let t;if(e.sources)for(;e.sources.length;){const a=e.sources.pop(),r=e.sourceSlots.pop(),i=a.observers;if(i&&i.length){const s=i.pop(),o=a.observerSlots.pop();r<i.length&&(s.sourceSlots[o]=r,i[r]=s,a.observerSlots[r]=o)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)ge(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)ge(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function gt(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function qe(e,t=I){throw gt(e)}d`query media($id: Int, $idMal: Int, $type: MediaType, $isAdult: Boolean) {
  Media(id: $id, idMal: $idMal, type: $type, isAdult: $isAdult) {
    id
    idMal
    title {
      userPreferred
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
    }
    bannerImage
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    description
    season
    seasonYear
    type
    format
    status(version: 2)
    episodes
    duration
    chapters
    volumes
    genres
    synonyms
    source(version: 3)
    isAdult
    isLocked
    meanScore
    averageScore
    popularity
    favourites
    isFavouriteBlocked
    hashtag
    countryOfOrigin
    isLicensed
    isFavourite
    isRecommendationBlocked
    isFavouriteBlocked
    isReviewBlocked
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    relations {
      edges {
        id
        relationType(version: 2)
        node {
          id
          title {
            userPreferred
          }
          format
          type
          status(version: 2)
          bannerImage
          coverImage {
            large
          }
        }
      }
    }
    characterPreview: characters(perPage: 6, sort: [ROLE, RELEVANCE, ID]) {
      edges {
        id
        role
        name
        voiceActors(sort: [RELEVANCE, ID]) {
          id
          name {
            userPreferred
          }
          language: languageV2
          image {
            large
          }
        }
        node {
          id
          name {
            userPreferred
          }
          image {
            large
          }
        }
      }
    }
    staffPreview: staff(perPage: 8, sort: [RELEVANCE, ID]) {
      edges {
        id
        role
        node {
          id
          name {
            userPreferred
          }
          language: languageV2
          image {
            large
          }
        }
      }
    }
    studios {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
    reviewPreview: reviews(perPage: 2, sort: [RATING_DESC, ID]) {
      pageInfo {
        total
      }
      nodes {
        id
        summary
        rating
        ratingAmount
        user {
          id
          name
          avatar {
            large
          }
        }
      }
    }
    recommendations(perPage: 7, sort: [RATING_DESC, ID]) {
      pageInfo {
        total
      }
      nodes {
        id
        rating
        userRating
        mediaRecommendation {
          id
          title {
            userPreferred
          }
          averageScore
          format
          type
          status(version: 2)
          bannerImage
          coverImage {
            large
          }
        }
        user {
          id
          name
          avatar {
            large
          }
        }
      }
    }
    externalLinks {
      id
      site
      url
      type
      language
      color
      icon
      notes
      isDisabled
    }
    streamingEpisodes {
      site
      title
      thumbnail
      url
    }
    trailer {
      id
      site
    }
    rankings {
      id
      rank
      type
      format
      year
      season
      allTime
      context
    }
    tags {
      id
      name
      description
      rank
      isMediaSpoiler
      isGeneralSpoiler
      userId
    }
    mediaListEntry {
      id
      progress
      progressVolumes
      repeat
      score
      status
    }
    stats {
      statusDistribution {
        status
        amount
      }
      scoreDistribution {
        score
        amount
      }
    }
  }
}`,d`query ($page: Int, $id: Int, $type: LikeableType) {
  Page(page: $page, perPage: 5) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    likes(likeableId: $id, type: $type) {
      id
      name
      avatar {
        large
      }
    }
  }
}`,d`query (
  $page: Int = 1
  $search: String
  $sort: [UserSort] = SEARCH_MATCH
) {
  Page(page: $page, perPage: 20) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    users(search: $search, sort: $sort) {
      id
      name
      avatar {
        large
      }
    }
  }
}`,d`query media($id: Int, $page: Int) {
  Media(id: $id) {
    id
    title {
      userPreferred
    }
    recommendations(page: $page, sort: [RATING_DESC, ID]) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      nodes {
        id
        rating
        userRating
        mediaRecommendation {
          id
          title {
            userPreferred
          }
          format
          type
          averageScore
          status(version: 2)
          bannerImage
          coverImage {
            large
          }
        }
        user {
          id
          name
          avatar {
            large
          }
        }
      }
    }
  }
}`,d`mutation (
  $mediaId: Int
  $mediaRecommendationId: Int
  $rating: RecommendationRating
) {
  SaveRecommendation(
    mediaId: $mediaId
    mediaRecommendationId: $mediaRecommendationId
    rating: $rating
  ) {
    id
    rating
    userRating
    mediaRecommendation {
      id
      title {
        userPreferred
      }
      format
      type
      status(version: 2)
      bannerImage
      coverImage {
        large
      }
    }
  }
}`,d`query ($id: Int, $page: Int) {
  Page(page: $page, perPage: 25) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    activityReplies(activityId: $id) {
      id
      userId
      text
      createdAt
      activityId
      isLiked
      likeCount
      user {
        id
        name
        moderatorRoles
        avatar {
          large
        }
      }
    }
  }
}`,d`query ($id: Int) {
  Activity(id: $id) {
    ... on ListActivity {
      id
      type
      replyCount
      status
      progress
      isLocked
      isSubscribed
      isLiked
      likeCount
      createdAt
      user {
        id
        name
        donatorTier
        donatorBadge
        avatar {
          large
        }
      }
      media {
        id
        type
        status(version: 2)
        isAdult
        title {
          userPreferred
        }
        bannerImage
        coverImage {
          large
        }
      }
    }
    ... on TextActivity {
      id
      type
      text
      replyCount
      isLocked
      isSubscribed
      isLiked
      likeCount
      createdAt
      user {
        id
        name
        donatorTier
        donatorBadge
        moderatorRoles
        avatar {
          large
        }
      }
    }
    ... on MessageActivity {
      id
      type
      message
      replyCount
      isLocked
      isPrivate
      isSubscribed
      isLiked
      likeCount
      createdAt
      user: recipient {
        id
        name
        avatar {
          large
        }
      }
      messenger {
        id
        name
        donatorTier
        donatorBadge
        moderatorRoles
        avatar {
          large
        }
      }
    }
  }
}`,d`query ($page: Int, $types: [NotificationType]) {
  Page(page: $page, perPage: 15) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    notifications(type_in: $types, resetNotificationCount: true) {
      ... on AiringNotification {
        id
        type
        episode
        contexts
        media {
          id
          type
          bannerImage
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
        createdAt
      }
      ... on RelatedMediaAdditionNotification {
        id
        type
        context
        media {
          id
          type
          bannerImage
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
        createdAt
      }
      ... on FollowingNotification {
        id
        type
        context
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ActivityMessageNotification {
        id
        type
        context
        activityId
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ActivityMentionNotification {
        id
        type
        context
        activityId
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ActivityReplyNotification {
        id
        type
        context
        activityId
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ActivityReplySubscribedNotification {
        id
        type
        context
        activityId
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ActivityLikeNotification {
        id
        type
        context
        activityId
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ActivityReplyLikeNotification {
        id
        type
        context
        activityId
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ThreadCommentMentionNotification {
        id
        type
        context
        commentId
        thread {
          id
          title
        }
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ThreadCommentReplyNotification {
        id
        type
        context
        commentId
        thread {
          id
          title
        }
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ThreadCommentSubscribedNotification {
        id
        type
        context
        commentId
        thread {
          id
          title
        }
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ThreadCommentLikeNotification {
        id
        type
        context
        commentId
        thread {
          id
          title
        }
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ThreadLikeNotification {
        id
        type
        context
        thread {
          id
          title
        }
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on MediaDataChangeNotification {
        id
        type
        context
        media {
          id
          type
          bannerImage
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
        reason
        createdAt
      }
      ... on MediaMergeNotification {
        id
        type
        context
        media {
          id
          type
          bannerImage
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
        deletedMediaTitles
        reason
        createdAt
      }
      ... on MediaDeletionNotification {
        id
        type
        context
        deletedMediaTitle
        reason
        createdAt
      }
    }
  }
}`;const Ye=e=>d`query ($name: String) {
  User(name: $name) {
    id
    name
    statistics {
      ${e} {
        formats {
          format
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
        statuses {
          status
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
        scores {
          score
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
        lengths {
          length
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
        releaseYears {
          releaseYear
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
        startYears {
          startYear
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
        countries {
          country
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
      }
    }
  }
}`;Ye("anime"),Ye("manga");const He=e=>d`query ($name: String) {
  User(name: $name) {
    id
    name
    statistics {
      ${e} {
        genres {
          genre
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
      }
    }
  }
}`;He("manga"),He("anime");const We=e=>d`query ($name: String) {
  User(name: $name) {
    id
    name
    statistics {
      ${e} {
        tags {
          tag {
            id
            name
          }
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
      }
    }
  }
}`;We("manga"),We("anime"),d`query ($name: String) {
  User(name: $name) {
    id
    name
    statistics {
      anime {
        studios {
          studio {
            id
            name
          }
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
      }
    }
  }
}`,d`query ($name: String) {
  User(name: $name) {
    id
    name
    statistics {
      anime {
        voiceActors {
          voiceActor {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
          characterIds
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
      }
    }
  }
}`;const Ke=e=>d`query ($name: String) {
  User(name: $name) {
    id
    name
    statistics {
      ${e} {
        staff {
          staff {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
      }
    }
  }
}`;Ke("manga"),Ke("anime"),d`mutation ($id: Int) {
  ToggleFollow(userId: $id) {
    id
    name
    isFollowing
  }
}`,d`query ($id: Int!, $page: Int) {
  Page(page: $page) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    followers(userId: $id, sort: USERNAME) {
      id
      name
      avatar {
        large
      }
    }
  }
}`,d`query ($id: Int!, $page: Int) {
  Page(page: $page) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    following(userId: $id, sort: USERNAME) {
      id
      name
      avatar {
        large
      }
    }
  }
}`,d`query ($id: Int, $page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    mediaList(mediaId: $id, isFollowing: true, sort: UPDATED_TIME_DESC) {
      id
      status
      repeat
      score
      progress
      progressVolumes
      user {
        id
        name
        avatar {
          large
        }
        mediaListOptions {
          scoreFormat
        }
      }
    }
  }
}`,d`mutation (
  $animeIds: [Int]
  $mangaIds: [Int]
  $characterIds: [Int]
  $staffIds: [Int]
  $studioIds: [Int]
  $animeOrder: [Int]
  $mangaOrder: [Int]
  $characterOrder: [Int]
  $staffOrder: [Int]
  $studioOrder: [Int]
) {
  UpdateFavouriteOrder(
    animeIds: $animeIds
    mangaIds: $mangaIds
    characterIds: $characterIds
    staffIds: $staffIds
    studioIds: $studioIds
    animeOrder: $animeOrder
    mangaOrder: $mangaOrder
    characterOrder: $characterOrder
    staffOrder: $staffOrder
    studioOrder: $studioOrder
  ) {
    anime {
      pageInfo {
        total
      }
    }
  }
}`,d`query (
  $id: Int
  $name: String
  $page: Int
) {
  User(id: $id, name: $name) {
    id
    name
    favourites {
      anime(page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          favouriteOrder
          node {
            id
            type
            status(version: 2)
            format
            isAdult
            bannerImage
            title {
              userPreferred
            }
            coverImage {
              large
            }
            startDate {
              year
            }
          }
        }
      }
      manga(page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          favouriteOrder
          node {
            id
            type
            status(version: 2)
            format
            isAdult
            bannerImage
            title {
              userPreferred
            }
            coverImage {
              large
            }
            startDate {
              year
            }
          }
        }
      }
      characters(page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          favouriteOrder
          node {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
        }
      }
      staff(page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          favouriteOrder
          node {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
        }
      }
      studios(page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          favouriteOrder
          node {
            id
            name
          }
        }
      }
    }
  }
}`,d`query ($userId: Int, $userName: String, $type: MediaType) {
  MediaListCollection(userId: $userId, userName: $userName, type: $type) {
    lists {
      name
      isCustomList
      isCompletedList: isSplitCompletedList
      entries {
        ...mediaListEntry
      }
    }
    user {
      id
      name
      avatar {
        large
      }
      mediaListOptions {
        scoreFormat
        rowOrder
        animeList {
          sectionOrder
          customLists
          splitCompletedSectionByFormat
          theme
        }
        mangaList {
          sectionOrder
          customLists
          splitCompletedSectionByFormat
          theme
        }
      }
    }
  }
}
fragment mediaListEntry on MediaList {
  status
  score
  progress
  progressVolumes
  repeat
  priority
  private
  hiddenFromStatusLists
  customLists
  advancedScores
  notes
  updatedAt
  startedAt {
    year
    month
    day
  }
  completedAt {
    year
    month
    day
  }
  media {
    id
    idMal
    synonyms
    title {
      userPreferred
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
      color
    }
    type
    season
    seasonYear
    format
    status(version: 2)
    episodes
    volumes
    chapters
    averageScore
    popularity
    isAdult
    countryOfOrigin
    genres
    bannerImage
    tags {
      name
      rank
      isMediaSpoiler
      isGeneralSpoiler
    }
    studios(isMain: true) {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
    startDate {
      year
      month
      day
    }
  }
}`,d`query media($id: Int, $page: Int) {
  Media(id: $id) {
    id
    idMal
    countryOfOrigin,
    characters(page: $page, sort: [ROLE, RELEVANCE, ID]) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        id
        role
        name
        voiceActorRoles(sort: [RELEVANCE, ID]) {
          roleNotes
          dubGroup
          voiceActor {
            id
            name {
              userPreferred
            }
            language: languageV2
            image {
              large
            }
          }
        }
        node {
          id
          name {
            userPreferred
          }
          image {
            large
          }
        }
      }
    }
  }
}`,d`query media($id: Int, $page: Int) {
  Media(id: $id) {
    id
    idMal
    staff(page: $page, sort: [RELEVANCE, ID]) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        id
        role
        node {
          id
          name {
            userPreferred
          }
          image {
            large
          }
        }
      }
    }
  }
}`,d`mutation ($id: Int) {
  DeleteMediaListEntry(id: $id) {
    deleted
  }
}`,d`mutation (
  $ANIME: Int
  $MANGA: Int
  $CHARACTER: Int
  $STAFF: Int
  $STUDIO: Int
) {
  ToggleFavourite(
    animeId: $ANIME
    mangaId: $MANGA
    characterId: $CHARACTER
    staffId: $STAFF
    studioId: $STUDIO
  ) {
    anime {
      pageInfo {
        total
      }
    }
    manga {
      pageInfo {
        total
      }
    }
    characters {
      pageInfo {
        total
      }
    }
    staff {
      pageInfo {
        total
      }
    }
    studios {
      pageInfo {
        total
      }
    }
  }
}`,d`mutation ($id: Int, $type: LikeableType) {
  ToggleLike: ToggleLikeV2(id: $id, type: $type) {
    ... on ListActivity {
      id
      likeCount
      isLiked
    }
    ... on MessageActivity {
      id
      likeCount
      isLiked
    }
    ... on TextActivity {
      id
      likeCount
      isLiked
    }
    ... on ActivityReply {
      id
      likeCount
      isLiked
    }
    ... on Thread {
      id
      likeCount
      isLiked
    }
    ... on ThreadComment {
      id
      likeCount
      isLiked
    }
  }
}`,d`query (
  $isFollowing: Boolean = true
  $hasReplies: Boolean = false
  $activityType: ActivityType
  $page: Int
) {
  Page(page: $page, perPage: 25) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    activities(
      isFollowing: $isFollowing
      type: $activityType
      hasRepliesOrTypeText: $hasReplies
      type_in: [TEXT, ANIME_LIST, MANGA_LIST]
      sort: ID_DESC
    ) {
      ... on TextActivity {
        id
        userId
        type
        replyCount
        text
        isLocked
        isSubscribed
        isLiked
        likeCount
        createdAt
        user {
          id
          name
          donatorTier
          donatorBadge
          moderatorRoles
          avatar {
            large
          }
        }
      }
      ... on ListActivity {
        id
        userId
        type
        status
        progress
        replyCount
        isLocked
        isSubscribed
        isLiked
        likeCount
        createdAt
        user {
          id
          name
          donatorTier
          donatorBadge
          avatar {
            large
          }
        }
        media {
          id
          type
          status
          isAdult
          title {
            userPreferred
          }
          bannerImage
          coverImage {
            large
          }
        }
      }
    }
  }
}`,d`query ($userId: Int, $type: MediaType, $perPage: Int) {
  Page(perPage: $perPage) {
    mediaList(
      userId: $userId
      type: $type
      status_in: [CURRENT, REPEATING]
      sort: UPDATED_TIME_DESC
    ) {
      id
      status
      score
      progress
      progressVolumes
      media {
        id
        type
        status(version: 2)
        format
        episodes
        chapters
        bannerImage
        title {
          userPreferred
        }
        coverImage {
          large
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }
}`,d`mutation (
  $id: Int
  $mediaId: Int
  $status: MediaListStatus
  $score: Float
  $progress: Int
  $progressVolumes: Int
  $repeat: Int
  $private: Boolean
  $notes: String
  $customLists: [String]
  $hiddenFromStatusLists: Boolean
  $advancedScores: [Float]
  $startedAt: FuzzyDateInput
  $completedAt: FuzzyDateInput
) {
  SaveMediaListEntry(
    id: $id
    mediaId: $mediaId
    status: $status
    score: $score
    progress: $progress
    progressVolumes: $progressVolumes
    repeat: $repeat
    private: $private
    notes: $notes
    customLists: $customLists
    hiddenFromStatusLists: $hiddenFromStatusLists
    advancedScores: $advancedScores
    startedAt: $startedAt
    completedAt: $completedAt
  ) {
    id
    mediaId
    status
    score
    advancedScores
    progress
    progressVolumes
    repeat
    priority
    private
    hiddenFromStatusLists
    customLists
    notes
    updatedAt
    startedAt {
      year
      month
      day
    }
    completedAt {
      year
      month
      day
    }
    user {
      id
      name
    }
    media {
      id
      title {
        userPreferred
      }
      coverImage {
        large
      }
      type
      format
      status
      episodes
      volumes
      chapters
      averageScore
      popularity
      isAdult
      startDate {
        year
      }
    }
  }
}`,d`query staff(
  $id: Int
  $sort: [MediaSort]
  $characterPage: Int
  $staffPage: Int
  $onList: Boolean
  $type: MediaType
  $withCharacterRoles: Boolean = false
  $withStaffRoles: Boolean = false
) {
  Staff(id: $id) {
    id
    name {
      first
      middle
      last
      full
      native
      userPreferred
      alternative
    }
    image {
      large
    }
    description
    favourites
    isFavourite
    isFavouriteBlocked
    age
    gender
    yearsActive
    homeTown
    bloodType
    primaryOccupations
    dateOfBirth {
      year
      month
      day
    }
    dateOfDeath {
      year
      month
      day
    }
    language: languageV2
    characterMedia(page: $characterPage, sort: $sort, onList: $onList)
      @include(if: $withCharacterRoles) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        characterRole
        characterName
        node {
          id
          type
          bannerImage
          isAdult
          title {
            userPreferred
          }
          coverImage {
            large
          }
          startDate {
            year
          }
          mediaListEntry {
            id
            status
          }
        }
        characters {
          id
          name {
            userPreferred
          }
          image {
            large
          }
        }
      }
    }
    staffMedia(page: $staffPage, type: $type, sort: $sort, onList: $onList)
      @include(if: $withStaffRoles) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        staffRole
        node {
          id
          type
          isAdult
          startDate {
            year
          }
          title {
            userPreferred
          }
          coverImage {
            large
          }
          mediaListEntry {
            id
            status
          }
        }
      }
    }
  }
}`,d`query ($id: Int, $page: Int, $sort: [MediaSort], $onList: Boolean) {
  Studio(id: $id) {
    id
    name
    isAnimationStudio
    favourites
    isFavourite
    media(page: $page, sort: $sort, onList: $onList) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        isMainStudio
        node {
          id
          title {
            userPreferred
          }
          coverImage {
            extraLarge
            large
            color
          }
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          bannerImage
          season
          description
          type
          format
          status(version: 2)
          episodes
          duration
          chapters
          volumes
          genres
          isAdult
          averageScore
          popularity
          mediaListEntry {
            id
            status
          }
          nextAiringEpisode {
            airingAt
            timeUntilAiring
            episode
          }
        }
      }
    }
  }
}`,d`query character(
  $id: Int
  $page: Int = 1
  $sort: [MediaSort]
  $onList: Boolean
  $withRoles: Boolean = false
) {
  Character(id: $id) {
    id
    name {
      first
      middle
      last
      full
      native
      userPreferred
      alternative
      alternativeSpoiler
    }
    image {
      large
    }
    favourites
    isFavourite
    isFavouriteBlocked
    description
    age
    gender
    bloodType
    dateOfBirth {
      year
      month
      day
    }
    media(page: $page, sort: $sort, onList: $onList) @include(if: $withRoles) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        id
        characterRole
        voiceActorRoles(sort: [RELEVANCE, ID]) {
          roleNotes
          dubGroup
          voiceActor {
            id
            name {
              userPreferred
            }
            image {
              large
            }
            language: languageV2
          }
        }
        node {
          id
          type
          isAdult
          bannerImage
          title {
            userPreferred
          }
          coverImage {
            large
          }
          startDate {
            year
          }
          mediaListEntry {
            id
            status
          }
        }
      }
    }
  }
}`,d`query {
  trending: Page(page: 1, perPage: 6) {
    media(sort: TRENDING_DESC, isAdult: false) {
      ...media
    }
  }
  newAnime: Page(page: 1, perPage: 6) {
    media(sort: ID_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
  newManga: Page(page: 1, perPage: 6) {
    media(sort: ID_DESC, type: MANGA, isAdult: false) {
      ...media
    }
  }
  finishedAnime: Page(page: 1, perPage: 6) {
    media(sort: END_DATE_DESC, type: ANIME, isAdult: false, status: FINISHED) {
      ...media
    }
  }
  finishedManga: Page(page: 1, perPage: 6) {
    media(sort: END_DATE_DESC, type: MANGA, isAdult: false, status: FINISHED) {
      ...media
    }
  }
  top: Page(page: 1, perPage: 10) {
    media(sort: SCORE_DESC, isAdult: false) {
      ...media
    }
  }
}
fragment media on Media {
  id
  title {
    userPreferred
  }
  coverImage {
    extraLarge
    large
    color
  }
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  bannerImage
  season
  seasonYear
  description
  type
  format
  status(version: 2)
  episodes
  duration
  chapters
  volumes
  genres
  isAdult
  averageScore
  popularity
  mediaListEntry {
    id
    status
  }
  nextAiringEpisode {
    airingAt
    timeUntilAiring
    episode
  }
  studios(isMain: true) {
    edges {
      isMain
      node {
        id
        name
      }
    }
  }
}`,d`query {
  trending: Page(page: 1, perPage: 6) {
    media(sort: TRENDING_DESC, type: MANGA, isAdult: false) {
      ...media
    }
  }
  popular: Page(page: 1, perPage: 6) {
    media(sort: POPULARITY_DESC, type: MANGA, isAdult: false) {
      ...media
    }
  }
  finishedManga: Page(page: 1, perPage: 6) {
    media(sort: END_DATE_DESC, type: MANGA, isAdult: false, status: FINISHED, format: MANGA) {
      ...media
    }
  }
  finishedNovel: Page(page: 1, perPage: 6) {
    media(sort: END_DATE_DESC, type: MANGA, isAdult: false, status: FINISHED, format: NOVEL) {
      ...media
    }
  }
  manhwa: Page(page: 1, perPage: 6) {
    media(sort: POPULARITY_DESC type: MANGA countryOfOrigin: KR isAdult: false) {
      ...media
    }
  }
  novel: Page(page: 1, perPage: 6) {
    media(sort: POPULARITY_DESC type: MANGA isAdult: false format: NOVEL) {
      ...media
    }
  }
  top: Page(page: 1, perPage: 10) {
    media(sort: SCORE_DESC, type: MANGA, isAdult: false) {
      ...media
    }
  }
}
fragment media on Media {
  id
  title {
    userPreferred
  }
  coverImage {
    extraLarge
    large
    color
  }
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  bannerImage
  season
  description
  type
  format
  status(version: 2)
  episodes
  duration
  chapters
  volumes
  genres
  isAdult
  averageScore
  popularity
  mediaListEntry {
    id
    status
  }
}`,d`query (
  $season: MediaSeason
  $seasonYear: Int
  $nextSeason: MediaSeason
  $nextYear: Int
) {
  trending: Page(page: 1, perPage: 6) {
    media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
  season: Page(page: 1, perPage: 6) {
    media(
      season: $season
      seasonYear: $seasonYear
      sort: POPULARITY_DESC
      type: ANIME
      isAdult: false
    ) {
      ...media
    }
  }
  nextSeason: Page(page: 1, perPage: 6) {
    media(
      season: $nextSeason
      seasonYear: $nextYear
      sort: POPULARITY_DESC
      type: ANIME
      isAdult: false
    ) {
      ...media
    }
  }
  finished: Page(page: 1, perPage: 6) {
    media(sort: END_DATE_DESC, type: ANIME, isAdult: false, status: FINISHED) {
      ...media
    }
  }
  popular: Page(page: 1, perPage: 6) {
    media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
  top: Page(page: 1, perPage: 10) {
    media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
}
fragment media on Media {
  id
  title {
    userPreferred
  }
  coverImage {
    extraLarge
    large
    color
  }
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  bannerImage
  season
  seasonYear
  description
  type
  format
  status(version: 2)
  episodes
  duration
  chapters
  volumes
  genres
  isAdult
  averageScore
  popularity
  mediaListEntry {
    id
    status
  }
  nextAiringEpisode {
    airingAt
    timeUntilAiring
    episode
  }
  studios(isMain: true) {
    edges {
      isMain
      node {
        id
        name
      }
    }
  }
}`,d`query (
  $page: Int = 1
  $id: Int
  $type: MediaType
  $isAdult: Boolean
  $search: String
  $format: [MediaFormat]
  $status: MediaStatus
  $countryOfOrigin: CountryCode
  $source: MediaSource
  $season: MediaSeason
  $year: String
  $seasonYear: Int
  $endDateLike: String
  $endDateLesser: FuzzyDateInt 
  $endDateGreater: FuzzyDateInt 
  $onList: Boolean
  $yearLesser: FuzzyDateInt
  $yearGreater: FuzzyDateInt
  $episodeLesser: Int
  $episodeGreater: Int
  $durationLesser: Int
  $durationGreater: Int
  $chapterLesser: Int
  $chapterGreater: Int
  $volumeLesser: Int
  $volumeGreater: Int
  $licensedBy: [Int]
  $isLicensed: Boolean
  $genres: [String]
  $excludedGenres: [String]
  $tags: [String]
  $excludedTags: [String]
  $minimumTagRank: Int
  $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
) {
  Page(page: $page) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(
      id: $id
      type: $type
      season: $season
      format_in: $format
      status: $status
      countryOfOrigin: $countryOfOrigin
      source: $source
      search: $search
      onList: $onList
      seasonYear: $seasonYear
      startDate_like: $year
      startDate_lesser: $yearLesser
      startDate_greater: $yearGreater
      endDate_like: $endDateLike
      endDate_lesser: $endDateLesser
      endDate_greater: $endDateGreater
      episodes_lesser: $episodeLesser
      episodes_greater: $episodeGreater
      duration_lesser: $durationLesser
      duration_greater: $durationGreater
      chapters_lesser: $chapterLesser
      chapters_greater: $chapterGreater
      volumes_lesser: $volumeLesser
      volumes_greater: $volumeGreater
      licensedById_in: $licensedBy
      isLicensed: $isLicensed
      genre_in: $genres
      genre_not_in: $excludedGenres
      tag_in: $tags
      tag_not_in: $excludedTags
      minimumTagRank: $minimumTagRank
      sort: $sort
      isAdult: $isAdult
    ) {
      id
      title {
        userPreferred
      }
      coverImage {
        extraLarge
        large
        color
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      bannerImage
      season
      seasonYear
      description
      type
      format
      status(version: 2)
      episodes
      duration
      chapters
      volumes
      genres
      isAdult
      averageScore
      popularity
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      mediaListEntry {
        id
        status
      }
      studios(isMain: true) {
        edges {
          isMain
          node {
            id
            name
          }
        }
      }
    }
  }
}`,d`query{genres:GenreCollection tags:MediaTagCollection{name description category isAdult}}`,d`query($type:ExternalLinkMediaType){ExternalLinkSourceCollection(mediaType:$type,type:STREAMING){id url site type language color icon}}`,d`query ($mediaId: Int) {
  Media(id: $mediaId) {
    id
    title {
      userPreferred
    }
    coverImage {
      large
    }
    bannerImage
    type
    status(version: 2)
    episodes
    chapters
    volumes
    isFavourite
    mediaListEntry {
      id
      mediaId
      status
      score
      advancedScores
      progress
      progressVolumes
      repeat
      priority
      private
      hiddenFromStatusLists
      customLists
      notes
      updatedAt
      startedAt {
        year
        month
        day
      }
      completedAt {
        year
        month
        day
      }
      user {
        id
        name
      }
    }
  }
}`,d`query ($id: Int, $name: String) {
  User(id: $id, name: $name) {
    id
    name
    previousNames {
      name
      updatedAt
    }
    avatar {
      large
    }
    bannerImage
    about
    isFollowing
    isFollower
    donatorTier
    donatorBadge
    createdAt
    moderatorRoles
    isBlocked
    bans
    options {
      profileColor
      restrictMessagesToFollowing
    }
    mediaListOptions {
      scoreFormat
    }
    statistics {
      anime {
        count
        meanScore
        standardDeviation
        minutesWatched
        episodesWatched
        genrePreview: genres(limit: 10, sort: COUNT_DESC) {
          genre
          count
        }
      }
      manga {
        count
        meanScore
        standardDeviation
        chaptersRead
        volumesRead
        genrePreview: genres(limit: 10, sort: COUNT_DESC) {
          genre
          count
        }
      }
    }
    stats {
      activityHistory {
        date
        amount
        level
      }
    }
    favourites {
      anime {
        edges {
          favouriteOrder
          node {
            id
            type
            status(version: 2)
            format
            isAdult
            bannerImage
            title {
              userPreferred
            }
            coverImage {
              large
            }
            startDate {
              year
            }
          }
        }
      }
      manga {
        edges {
          favouriteOrder
          node {
            id
            type
            status(version: 2)
            format
            isAdult
            bannerImage
            title {
              userPreferred
            }
            coverImage {
              large
            }
            startDate {
              year
            }
          }
        }
      }
      characters {
        edges {
          favouriteOrder
          node {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
        }
      }
      staff {
        edges {
          favouriteOrder
          node {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
        }
      }
      studios {
        edges {
          favouriteOrder
          node {
            id
            name
          }
        }
      }
    }
  }
}`,d`query ($id: Int, $type: ActivityType, $page: Int) {
  Page(page: $page, perPage: 25) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    activities(userId: $id, type: $type, sort: [PINNED, ID_DESC]) {
      ... on ListActivity {
        id
        type
        replyCount
        status
        progress
        isLocked
        isSubscribed
        isLiked
        isPinned
        likeCount
        createdAt
        user {
          id
          name
          avatar {
            large
          }
        }
        media {
          id
          type
          status(version: 2)
          isAdult
          bannerImage
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
      }
      ... on TextActivity {
        id
        type
        text
        replyCount
        isLocked
        isSubscribed
        isLiked
        isPinned
        likeCount
        createdAt
        user {
          id
          name
          avatar {
            large
          }
        }
      }
      ... on MessageActivity {
        id
        type
        message
        replyCount
        isPrivate
        isLocked
        isSubscribed
        isLiked
        likeCount
        createdAt
        user: recipient {
          id
        }
        messenger {
          id
          name
          donatorTier
          donatorBadge
          moderatorRoles
          avatar {
            large
          }
        }
      }
    }
  }
}`,d`query {
  Viewer {
    id
    name
    about
    avatar {
      large
    }
    bannerImage
    unreadNotificationCount
    donatorTier
    donatorBadge
    moderatorRoles
    options {
      titleLanguage
      staffNameLanguage
      restrictMessagesToFollowing
      airingNotifications
      displayAdultContent
      profileColor
      notificationOptions {
        type
        enabled
      }
      disabledListActivity {
        type
        disabled
      }
    }
    mediaListOptions {
      scoreFormat
      rowOrder
      animeList {
        customLists
        sectionOrder
        splitCompletedSectionByFormat
        advancedScoring
        advancedScoringEnabled
      }
      mangaList {
        customLists
        sectionOrder
        splitCompletedSectionByFormat
        advancedScoring
        advancedScoringEnabled
      }
    }
  }
}`;function d(e,...t){const a=[];for(let i=0;i<e.length;i++)a.push(e[i],t[i]||"");const r=/\s*([{}():,\[\]])\s*/g;return a.join("").replace(/\n|\r/g," ").replace(r,"$1").replace(/\s{2,}/g," ")}S(0),S(0),S(0),S(0),S(0),S(0),S(0),S(0);const Ee=Symbol("store-raw"),V=Symbol("store-node"),C=Symbol("store-has"),ze=Symbol("store-self");function je(e){let t=e[F];if(!t&&(Object.defineProperty(e,F,{value:t=new Proxy(e,vt)}),!Array.isArray(e))){const a=Object.keys(e),r=Object.getOwnPropertyDescriptors(e);for(let i=0,s=a.length;i<s;i++){const o=a[i];r[o].get&&Object.defineProperty(e,o,{enumerable:r[o].enumerable,get:r[o].get.bind(t)})}}return t}function me(e){let t;return e!=null&&typeof e=="object"&&(e[F]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function Z(e,t=new Set){let a,r,i,s;if(a=e!=null&&e[Ee])return a;if(!me(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let o=0,n=e.length;o<n;o++)i=e[o],(r=Z(i,t))!==i&&(e[o]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const o=Object.keys(e),n=Object.getOwnPropertyDescriptors(e);for(let l=0,f=o.length;l<f;l++)s=o[l],!n[s].get&&(i=e[s],(r=Z(i,t))!==i&&(e[s]=r))}return e}function fe(e,t){let a=e[t];return a||Object.defineProperty(e,t,{value:a=Object.create(null)}),a}function ee(e,t,a){if(e[t])return e[t];const[r,i]=S(a,{equals:!1,internal:!0});return r.$=i,e[t]=r}function mt(e,t){const a=Reflect.getOwnPropertyDescriptor(e,t);return!a||a.get||!a.configurable||t===F||t===V||(delete a.value,delete a.writable,a.get=()=>e[F][t]),a}function Je(e){Pe()&&ee(fe(e,V),ze)()}function ft(e){return Je(e),Reflect.ownKeys(e)}const vt={get(e,t,a){if(t===Ee)return e;if(t===F)return a;if(t===be)return Je(e),a;const r=fe(e,V),i=r[t];let s=i?i():e[t];if(t===V||t===C||t==="__proto__")return s;if(!i){const o=Object.getOwnPropertyDescriptor(e,t);Pe()&&(typeof s!="function"||e.hasOwnProperty(t))&&!(o&&o.get)&&(s=ee(r,t,s)())}return me(s)?je(s):s},has(e,t){return t===Ee||t===F||t===be||t===V||t===C||t==="__proto__"?!0:(Pe()&&ee(fe(e,C),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:ft,getOwnPropertyDescriptor:mt};function ve(e,t,a,r=!1){if(!r&&e[t]===a)return;const i=e[t],s=e.length;a===void 0?(delete e[t],e[C]&&e[C][t]&&i!==void 0&&e[C][t].$()):(e[t]=a,e[C]&&e[C][t]&&i===void 0&&e[C][t].$());let o=fe(e,V),n;if((n=ee(o,t,i))&&n.$(()=>a),Array.isArray(e)&&e.length!==s){for(let l=e.length;l<s;l++)(n=o[l])&&n.$();(n=ee(o,"length",s))&&n.$(e.length)}(n=o[ze])&&n.$()}function Qe(e,t){const a=Object.keys(t);for(let r=0;r<a.length;r+=1){const i=a[r];ve(e,i,t[i])}}function ht(e,t){if(typeof t=="function"&&(t=t(e)),t=Z(t),Array.isArray(t)){if(e===t)return;let a=0,r=t.length;for(;a<r;a++){const i=t[a];e[a]!==i&&ve(e,a,i)}ve(e,"length",r)}else Qe(e,t)}function te(e,t,a=[]){let r,i=e;if(t.length>1){r=t.shift();const o=typeof r,n=Array.isArray(e);if(Array.isArray(r)){for(let l=0;l<r.length;l++)te(e,[r[l]].concat(t),a);return}else if(n&&o==="function"){for(let l=0;l<e.length;l++)r(e[l],l)&&te(e,[l].concat(t),a);return}else if(n&&o==="object"){const{from:l=0,to:f=e.length-1,by:$=1}=r;for(let L=l;L<=f;L+=$)te(e,[L].concat(t),a);return}else if(t.length>1){te(e[r],t,[r].concat(a));return}i=e[r],a=[r].concat(a)}let s=t[0];typeof s=="function"&&(s=s(i,a),s===i)||r===void 0&&s==null||(s=Z(s),r===void 0||me(i)&&me(s)&&!Array.isArray(s)?Qe(i,s):ve(e,r,s))}function yt(...[e,t]){const a=Z(e||{}),r=Array.isArray(a),i=je(a);function s(...o){$e(()=>{r&&o.length===1?ht(a,o[0]):te(a,o)})}return[i,s]}yt({});const Ne=class Ne{constructor({start:t,limit:a,interval:r=60,fillAmount:i=1,pool:s,defaultDelay:o=30}){E(this,x);E(this,B,[]);E(this,q,null);E(this,ae,null);E(this,T);E(this,Y);E(this,re);E(this,H);E(this,W);E(this,K);E(this,z,Promise.resolve());P(this,T,t),P(this,Y,a),P(this,re,r),P(this,H,i),P(this,K,o),P(this,W,s),_(this,x,ke).call(this)}requestToken(){return g(this,T)>0?(Oe(this,T)._--,!0):!1}enqueue(t){return P(this,z,g(this,z).then(t).catch(a=>{console.error("Request error:",a)})),g(this,z)}getDefaultDelay(){return g(this,K)}getsNextToken(){const{promise:t,resolve:a}=Promise.withResolvers();return this.addToBucket(a),t}addToBucket(t){g(this,B).push(t)}delayBucket(t){_(this,x,et).call(this,t||g(this,K))}};B=new WeakMap,q=new WeakMap,ae=new WeakMap,T=new WeakMap,Y=new WeakMap,re=new WeakMap,H=new WeakMap,W=new WeakMap,K=new WeakMap,z=new WeakMap,x=new WeakSet,ke=function(){clearInterval(g(this,q)),P(this,q,setInterval(()=>_(this,x,we).call(this),g(this,re)*1e3))},et=function(t){P(this,T,0),clearInterval(g(this,q)),clearTimeout(g(this,ae)),P(this,ae,setTimeout(()=>{_(this,x,ke).call(this),_(this,x,we).call(this)},t*1e3))},we=function(){var a;g(this,W)instanceof Ne?P(this,T,Math.min(g(this,T)+Math.min(g(this,H),_(a=g(this,W),x,tt).call(a)),g(this,Y))):P(this,T,Math.min(g(this,T)+g(this,H),g(this,Y)));const t=g(this,B).slice();g(this,B).length=0,t.forEach(r=>r())},tt=function(){return g(this,T)>0?Oe(this,T)._--:g(this,T)};let k=Ne;const xe=m;ye({storeName:"results",type:"reload",expiresInSeconds:60*60*24*365}),ye({storeName:"results",type:"reload",expiresInSeconds:60*60*7}),ye({storeName:"results",type:"fetch-once",expiresInSeconds:60*60*24*365}),ye({storeName:"results",type:"only-if-cached",expiresInSeconds:60*60*24*365}),new k({start:90,limit:90,interval:60,defaultDelay:20}),new k({start:5,limit:5,interval:2,defaultDelay:20,pool:new k({start:60,limit:90,interval:60,fillAmount:60})}),new k({start:1,limit:1,interval:1/3,defaultDelay:1,pool:new k({start:3,limit:3,interval:1.25,pool:new k({start:60,limit:60,interval:60,fillAmount:60})})});const Le=new Map,he=new Map;function ye(e){return e.storeName??(e.storeName=""),e.fetchOnDebug??(e.fetchOnDebug=!1),e.type??(e.type="default"),b(e.type==="no-store"||Number.isInteger(e.expiresInSeconds),"Give explisite expiration time. 0 if the data never expires"),b(e.type==="no-store"||e.expiresInSeconds>0,"Expiration time should be more than 0"),b(e.type!=="no-store"||!e.storeName,"StoreName is not used because cache type is no-store"),function(a){return(...r)=>{const[i,s]=S(void 0),[o,n]=S(!1),[l,f]=S(!1),[$,L]=S(!0);let p=null;const G=e.type=="default"||e.type=="only-if-cached",ie=(xe==!1||e.fetchOnDebug||e.type=="no-store"||!e.storeName)&&G==!1,Xe=(u,O)=>{if(typeof u=="function"&&(u=u(ce(i))),u=structuredClone(u),b(ce(i)!==null||e.type!=="only-if-cached","Can't mutate null data"),b(typeof u=="object","Data should always be JSON object data"),e.type!=="no-store"&&(Le.set(p.cacheKey,u),e.storeName)){L(!1);const D=N.fetchCache();D.onsuccess=_e=>{const Re=_e.target.result,Ie=N.store(Re,e.storeName,"readwrite",()=>L(!0),()=>L(!0)).put(u);O&&(Ie.onsuccess=O)}}},De=u=>{u.cacheKey===p.cacheKey&&s(u)},St=u=>{typeof u=="function"&&(u=u(ce(i))),s(u)},Q=async()=>{if(e.type==="only-if-cached")return f(!1),s(null);he.has(p.cacheKey)||he.set(p.cacheKey,p.send());const u=await he.get(p.cacheKey);if(he.delete(p.cacheKey),u!==null){if(e.expiresInSeconds){const O=new Date;u.expires=O.setSeconds(O.getSeconds()+e.expiresInSeconds)}$e(()=>{u.error?(n(!0),console.assert(!xe,"Fetch error, not saving data to cache")):(Xe(u),De(u)),f(!1)})}};return ot(()=>{const u=r.map(D=>typeof D=="function"?D():D);if(u.some(D=>D===void 0))return;p==null||p.abort(),p=a(...u),xe&&console.log("Fetching",e.type,p.body||p.url),$e(()=>{f(!0),n(!1)});const O=Le.get(p.cacheKey);if(O&&O.expires>new Date)if(De({...O,fromCache:!0}),e.type==="fetch-once"){f(!1);return}else ie===!1&&f(!1);else if(e.type!=="no-store"&&e.storeName){const D=N.fetchCache();D.onerror=Q,D.onsuccess=_e=>{const Re=_e.target.result,Ie=N.store(Re,e.storeName,"readonly").get(p.cacheKey);Ie.onerror=Q,Ie.onsuccess=se=>{if(se.target.result&&(b(se.target.result.expires,"Cache should have a expiration date"),b(se.target.result.data,"Cache should always have data"),se.target.result.expires>new Date)){ie==!1&&f(!1);const Ce={...se.target.result,fromCache:!0};return e.type!=="only-if-cached"&&Le.set(Ce.cacheKey,Ce),De(Ce)}ie==!1&&Q()}}}else ie==!1&&Q();ie&&Q()}),Object.defineProperties(i,{error:{get:()=>o()},loading:{get:()=>l()},indexedDBClosed:{get:()=>$()}}),nt(()=>p==null?void 0:p.abort()),[i,{mutate:St,refetch:Q,mutateCache:Xe}]}}}const J=class J{static store(t,a,r,i,s){const o=t.transaction(a,r);return i?o.onerror=i:o.onerror=console.warn,s&&(o.oncomplete=s),o.objectStore(a)}static fetchCache(t){const a=indexedDB.open("legendary-octo-barnacle-cache",2);return t&&(a.onerror=t),a.onupgradeneeded=r=>{var s,o;const i=r.target.result;switch(r.oldVersion){case 0:_(s=J,j,Ae).call(s,i,"results",{keyPath:"cacheKey"});case 1:_(o=J,j,Ae).call(o,i,"debug",{keyPath:"cacheKey"})}},a}static user(t){const a=indexedDB.open("legendary-octo-barnacle-users",1);return t&&(a.onerror=t),a.onupgradeneeded=r=>{var s;const i=r.target.result;switch(r.oldVersion){case 0:_(s=J,j,Ae).call(s,i,"data")}},a}};j=new WeakSet,Ae=function(t,a,r){t.objectStoreNames.contains(a)||t.createObjectStore(a,r)},E(J,j);let N=J;onmessage=({data:{includeKeys:e,excludeKeys:t,type:a,...r}})=>{const i=N.fetchCache();i.onerror=M,i.onsuccess=s=>{const o=s.target.result,n=N.store(o,"results","readonly"),l={};let f=0;function $(){e.length+t.length===++f&&Tt(l,Math.min(+r.reviewsNeeded||e.length,e.length),r)}for(const L of e){const p=n.get(L);p.onerror=M,p.onsuccess=G=>{G.target.result?It(G.target.result,l,a,r,$):M()}}for(const L of t){const p=n.get(L);p.onerror=M,p.onsuccess=G=>{G.target.result?At(G.target.result,l,$):M()}}}};function It(e,t,a,r,i){r.search&&(r.search=r.search.replace(/[#-.]|[[-^]|[?|{}]/g,"\\$&"),r.search.trim()===""?r.searchRegex=new RegExp(r.search,"i"):r.search.match(/\W/)?r.searchRegex=new RegExp(r.search.replace(/ +/g,"\\W"),"i"):r.searchRegex=new RegExp(r.search.split("").join("\\W?"),"i")),e.data.lists.forEach(s=>{s.entries.forEach(o=>{var n,l,f;if(Pt(o,r)){const $=o.media.id;t[$]??(t[$]=o.media),(n=t[$]).mediaEntries??(n.mediaEntries={}),delete o.media,o.name=e.data.user.name,(l=t[$].mediaEntries)[f=e.data.user.name]??(l[f]=o)}})}),i()}function At(e,t,a){e.data.lists.forEach(r=>{r.entries.forEach(i=>{var s;t[s=i.media.id]??(t[s]=i.media),t[i.media.id].exclude=!0})}),a()}function Tt(e,t,a){e=Object.values(e).filter(s=>{if(s.exclude)return!1;s.mediaEntries=Object.values(s.mediaEntries),s.mediaEntries.sort((f,$)=>$.score-f.score);let o=0,n=0,l=0;return s.mediaEntries.forEach(f=>{f.score>0&&(n+=f.score,o++),l+=f.repeat}),s.score=n/o,s.users=s.mediaEntries.length,s.repeat=l,a.repeat&&l===0?!1:s.mediaEntries.length>=t});const r=$t(a.sort,a.reverse?-1:1);e.sort(r);const i=N.user();i.onerror=M,i.onsuccess=s=>{const o=s.target.result,n=N.store(o,"data","readwrite",M);n.onerror=M;const l=n.put(e,"compare_list");l.onerror=M,l.onsuccess=()=>{postMessage("success")}}}function $t(e,t=1){switch(e){case"score":return(a,r)=>c.score(a,r)*t||c.title(a,r);case"title":return(a,r)=>c.title(a,r)*t||c.score(a,r);case"episodes":return(a,r)=>c.episodes(a,r)*t||c.title(a,r);case"chapters":return(a,r)=>c.chapters(a,r)*t||c.title(a,r);case"volumes":return(a,r)=>c.volumes(a,r)*t||c.title(a,r);case"updatedAt":return(a,r)=>c.updatedAt(a,r)*t||c.title(a,r);case"startedAt":return(a,r)=>(c.startedAt(a,r)||c.completedAt(a,r))*t||c.title(a,r);case"completedAt":return(a,r)=>(c.completedAt(a,r)||c.updatedAt(a,r))*t;case"releaseDate":return(a,r)=>c.releaseDate(a,r)*t||c.title(a,r);case"averageScore":return(a,r)=>c.averageScore(a,r)*t||c.title(a,r);case"popularity":return(a,r)=>c.popularity(a,r)*t||c.title(a,r);case"repeat":return(a,r)=>(c.repeat(a,r)||c.episodes(a,r)||c.chapters(a,r)||c.volumes(a,r)||c.score(a,r))*t||c.title(a,r);default:return console.error("No sort given"),(a,r)=>c.score(a,r)*t||c.title(a,r)}}const c={score:(e,t)=>(t.score||0)-(e.score||0),episodes:(e,t)=>(t.episodes||0)-(e.episodes||0),chapters:(e,t)=>(t.chapters||0)-(e.chapters||0),volumes:(e,t)=>(t.volumes||0)-(e.volumes||0),title:(e,t)=>e.title.userPreferred.localeCompare(t.title.userPreferred),progress:(e,t)=>(t.progress||0)-(e.progress||0),updatedAt:(e,t)=>(e.updatedAt||0)>(t.updatedAt||0)?-1:1,startedAt:(e,t)=>{var a,r,i,s,o,n;return(((a=t.startedAt)==null?void 0:a.year)||0)-(((r=e.startedAt)==null?void 0:r.year)||0)||(((i=t.startedAt)==null?void 0:i.month)||0)-(((s=e.startedAt)==null?void 0:s.month)||0)||(((o=t.startedAt)==null?void 0:o.day)||0)-(((n=e.startedAt)==null?void 0:n.day)||0)},completedAt:(e,t)=>{var a,r,i,s,o,n;return(((a=t.completedAt)==null?void 0:a.year)||0)-(((r=e.completedAt)==null?void 0:r.year)||0)||(((i=t.completedAt)==null?void 0:i.month)||0)-(((s=e.completedAt)==null?void 0:s.month)||0)||(((o=t.completedAt)==null?void 0:o.day)||0)-(((n=e.completedAt)==null?void 0:n.day)||0)},releaseDate:(e,t)=>{var a,r,i,s,o,n;return(((a=t.startDate)==null?void 0:a.year)||0)-(((r=e.startDate)==null?void 0:r.year)||0)||(((i=t.startDate)==null?void 0:i.month)||0)-(((s=e.startDate)==null?void 0:s.month)||0)||(((o=t.startDate)==null?void 0:o.day)||0)-(((n=e.startDate)==null?void 0:n.day)||0)},averageScore:(e,t)=>(t.averageScore||0)-(e.averageScore||0),popularity:(e,t)=>(t.popularity||0)-(e.popularity||0),repeat:(e,t)=>(t.repeat||0)-(e.repeat||0)};function Pt(e,t){var a,r,i,s,o;if(t.searchRegex)e:{if((e.searchMatch=e.media.title.userPreferred.match(t.searchRegex))||(e.searchMatch=(a=e.media.title.native)==null?void 0:a.match(t.searchRegex))||(e.searchMatch=(r=e.media.title.english)==null?void 0:r.match(t.searchRegex))||(e.searchMatch=(i=e.media.title.romaji)==null?void 0:i.match(t.searchRegex))||(e.searchMatch=(s=e.media.synonyms)==null?void 0:s.some(n=>n.match(t.searchRegex))))break e;return!1}return!(t.format&&e.media.format!==t.format||t.status&&e.media.status!==t.status||t.countryOfOrigin&&e.media.countryOfOrigin!==t.countryOfOrigin||t.year&&((o=e.media.startDate)==null?void 0:o.year)!==t.year||typeof t.isAdult=="boolean"&&e.media.isAdult!==t.isAdult||t.genre&&e.media.genres.every(n=>n!==t.genre)||t.userStatus&&e.status!==t.userStatus||t.missingScore===!1&&e.score===0)}function M(e){console.trace(e),postMessage("error")}})();
