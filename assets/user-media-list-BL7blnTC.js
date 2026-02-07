var et=m=>{throw TypeError(m)};var ke=(m,f,h)=>f.has(m)||et("Cannot "+h);var p=(m,f,h)=>(ke(m,f,"read from private field"),h?h.call(m):f.get(m)),x=(m,f,h)=>f.has(m)?et("Cannot add the same private member more than once"):f instanceof WeakSet?f.add(m):f.set(m,h),S=(m,f,h,b)=>(ke(m,f,"write to private field"),b?b.call(m,h):f.set(m,h),h),D=(m,f,h)=>(ke(m,f,"access private method"),h);var we=(m,f,h,b)=>({set _(de){S(m,f,de,h)},get _(){return p(m,f,b)}});(function(){"use strict";var q,Y,re,$,H,ie,W,K,z,j,L,be,tt,Fe,at,J,Se;const m=location.hostname==="localhost",f={mal:{anime:{end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"episodes",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"}},manga:{episodes:{api:"chapters",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"},volumes:{api:"volumes",flavorText:"Volumes",alternative_key:"volumes_filtered"}}},ani:{anime:{duration:{api:"DURATION",flavorText:"Duration",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}},manga:{episodes:{api:"CHAPTERS",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"},volumes:{api:"DURATION",flavorText:"Volumes",alternative_key:"volumes_filtered"}},media:{duration:{api:"DURATION",flavorText:"Duration / Volumes",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes / Chapters",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}}}};f.flavorTexts=le(f);const h={mal:{anime:{cm:{api:"cm",flavorText:"CM"},movie:{api:"movie",flavorText:"Movie"},music:{api:"music",flavorText:"Music"},ona:{api:"ona",flavorText:"ONA"},ova:{api:"ova",flavorText:"OVA"},pv:{api:"pv",flavorText:"PV"},special:{api:"special",flavorText:"Special"},tv:{api:"tv",flavorText:"TV"},tv_special:{api:"tv_special",flavorText:"TV special"}},manga:{doujin:{api:"doujin",flavorText:"Doujin"},lightnovel:{api:"lightnovel",flavorText:"Light novel"},manga:{api:"manga",flavorText:"Manga"},manhua:{api:"manhua",flavorText:"Manhua"},manhwa:{api:"manhwa",flavorText:"Manhwa"},novel:{api:"novel",flavorText:"Novel"},one_shot:{api:"oneshot",flavorText:"One-shot"}}},ani:{anime:{movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},ona:{api:"ONA",flavorText:"ONA"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}},manga:{manga:{api:"MANGA",flavorText:"Manga"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"}},media:{manga:{api:"MANGA",flavorText:"Manga"},movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},ona:{api:"ONA",flavorText:"ONA"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}}}};h.flavorTexts=le(h);const b={ani:{anime:{winter:{api:"WINTER",flavorText:"Winter"},spring:{api:"SPRING",flavorText:"Spring"},summer:{api:"SUMMER",flavorText:"Summer"},fall:{api:"FALL",flavorText:"Fall"},tba:{api:null,flavorText:"TBA"}}},mal:{anime:{winter:{api:"winter",flavorText:"Winter"},spring:{api:"spring",flavorText:"Spring"},summer:{api:"summer",flavorText:"Summer"},fall:{api:"fall",flavorText:"Fall"}}}};b.flavorTexts=le(b);const de={mal:{anime:{releasing:{api:"airing",flavorText:"Airing"},complete:{api:"complete",flavorText:"Complete"},upcoming:{api:"upcoming",flavorText:"Upcoming"}},manga:{cancelled:{api:"discontinued",flavorText:"Cancelled"},complete:{api:"complete",flavorText:"Complete"},hiatus:{api:"hiatus",flavorText:"Hiatus"},publishing:{api:"publishing",flavorText:"Publishing"}}},ani:{anime:{releasing:{api:"RELEASING",flavorText:"Airing"},cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"}},manga:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}},media:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}}}};de.flavorTexts=le(de);function le(e){return Object.values(e).reduce((t,a)=>Object.values(a).reduce((r,i)=>Object.entries(i).reduce((s,[o,d])=>(s[o]=d.flavorText,s),r),t),{})}const F=(e,t="Not true")=>{if(!e)throw new Error(t)},rt=!1,it=(e,t)=>e===t,U=Symbol("solid-proxy"),Ue=Symbol("solid-track"),Ge={equals:it};let Ve=qe;const G=1,ce=2,st={};var I=null;let Pe=null,ot=null,v=null,A=null,R=null,ue=0;function P(e,t){t=t?Object.assign({},Ge,t):Ge;const a={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=i=>(typeof i=="function"&&(i=i(a.value)),Be(a,i));return[lt.bind(a),r]}function nt(e,t,a){Ve=pt;const r=ut(e,t,!1,G);r.user=!0,R?R.push(r):Le(r)}function Ee(e){return Z(e)}function ge(e){if(v===null)return e();const t=v;v=null;try{return e()}finally{v=t}}function dt(e){return I===null||(I.cleanups===null?I.cleanups=[e]:I.cleanups.push(e)),e}function xe(){return v}function lt(){if(this.sources&&this.state)if(this.state===G)Le(this);else{const e=A;A=null,Z(()=>me(this)),A=e}if(v){const e=this.observers?this.observers.length:0;v.sources?(v.sources.push(this),v.sourceSlots.push(e)):(v.sources=[this],v.sourceSlots=[e]),this.observers?(this.observers.push(v),this.observerSlots.push(v.sources.length-1)):(this.observers=[v],this.observerSlots=[v.sources.length-1])}return this.value}function Be(e,t,a){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&Z(()=>{for(let i=0;i<e.observers.length;i+=1){const s=e.observers[i],o=Pe&&Pe.running;o&&Pe.disposed.has(s),(o?!s.tState:!s.state)&&(s.pure?A.push(s):R.push(s),s.observers&&Ye(s)),o||(s.state=G)}if(A.length>1e6)throw A=[],new Error})),t}function Le(e){if(!e.fn)return;fe(e);const t=ue;ct(e,e.value,t)}function ct(e,t,a){let r;const i=I,s=v;v=I=e;try{r=e.fn(t)}catch(o){return e.pure&&(e.state=G,e.owned&&e.owned.forEach(fe),e.owned=null),e.updatedAt=a+1,He(o)}finally{v=s,I=i}(!e.updatedAt||e.updatedAt<=a)&&(e.updatedAt!=null&&"observers"in e?Be(e,r):e.value=r,e.updatedAt=a)}function ut(e,t,a,r=G,i){const s={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:I,context:I?I.context:null,pure:a};return I===null||I!==st&&(I.owned?I.owned.push(s):I.owned=[s]),s}function pe(e){if(e.state===0)return;if(e.state===ce)return me(e);if(e.suspense&&ge(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ue);)e.state&&t.push(e);for(let a=t.length-1;a>=0;a--)if(e=t[a],e.state===G)Le(e);else if(e.state===ce){const r=A;A=null,Z(()=>me(e,t[0])),A=r}}function Z(e,t){if(A)return e();let a=!1;A=[],R?a=!0:R=[],ue++;try{const r=e();return gt(a),r}catch(r){a||(R=null),A=null,He(r)}}function gt(e){if(A&&(qe(A),A=null),e)return;const t=R;R=null,t.length&&Z(()=>Ve(t))}function qe(e){for(let t=0;t<e.length;t++)pe(e[t])}function pt(e){let t,a=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[a++]=r:pe(r)}for(t=0;t<a;t++)pe(e[t])}function me(e,t){e.state=0;for(let a=0;a<e.sources.length;a+=1){const r=e.sources[a];if(r.sources){const i=r.state;i===G?r!==t&&(!r.updatedAt||r.updatedAt<ue)&&pe(r):i===ce&&me(r,t)}}}function Ye(e){for(let t=0;t<e.observers.length;t+=1){const a=e.observers[t];a.state||(a.state=ce,a.pure?A.push(a):R.push(a),a.observers&&Ye(a))}}function fe(e){let t;if(e.sources)for(;e.sources.length;){const a=e.sources.pop(),r=e.sourceSlots.pop(),i=a.observers;if(i&&i.length){const s=i.pop(),o=a.observerSlots.pop();r<i.length&&(s.sourceSlots[o]=r,i[r]=s,a.observerSlots[r]=o)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)fe(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)fe(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function mt(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function He(e,t=I){throw mt(e)}n`query media($id: Int, $idMal: Int, $type: MediaType, $isAdult: Boolean) {
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
}`,n`query ($page: Int, $id: Int, $type: LikeableType) {
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
}`,n`query (
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
}`,n`query media($id: Int, $page: Int) {
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
}`,n`mutation (
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
}`,n`query ($id: Int, $page: Int) {
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
}`,n`query ($id: Int) {
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
}`,n`query ($page: Int, $types: [NotificationType]) {
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
}`;const We=e=>n`query ($name: String) {
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
}`;We("anime"),We("manga");const Ke=e=>n`query ($name: String) {
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
}`;Ke("manga"),Ke("anime");const ze=e=>n`query ($name: String) {
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
}`;ze("manga"),ze("anime"),n`query ($name: String) {
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
}`,n`query ($name: String) {
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
}`;const je=e=>n`query ($name: String) {
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
}`;je("manga"),je("anime"),n`mutation ($id: Int) {
  ToggleFollow(userId: $id) {
    id
    name
    isFollowing
  }
}`,n`query ($id: Int!, $page: Int) {
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
}`,n`query ($id: Int!, $page: Int) {
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
}`,n`query ($id: Int, $page: Int, $perPage: Int) {
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
}`,n`mutation (
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
}`,n`query (
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
}`,n`query ($userId: Int, $userName: String, $type: MediaType) {
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
}`,n`query media($id: Int, $page: Int) {
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
}`,n`query media($id: Int, $page: Int) {
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
}`,n`mutation ($id: Int) {
  DeleteMediaListEntry(id: $id) {
    deleted
  }
}`,n`mutation (
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
}`,n`mutation ($id: Int, $type: LikeableType) {
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
}`,n`query (
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
}`,n`query ($userId: Int, $type: MediaType, $perPage: Int) {
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
}`,n`mutation (
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
}`,n`query staff(
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
}`,n`query ($id: Int, $page: Int, $sort: [MediaSort], $onList: Boolean) {
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
}`,n`query character(
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
}`,n`query {
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
}`,n`query {
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
}`,n`query (
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
}`,n`query (
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
}`,n`query{genres:GenreCollection tags:MediaTagCollection{name description category isAdult}}`,n`query($type:ExternalLinkMediaType){ExternalLinkSourceCollection(mediaType:$type,type:STREAMING){id url site type language color icon}}`,n`query ($mediaId: Int) {
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
}`,n`query ($id: Int, $name: String) {
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
}`,n`query ($id: Int, $type: ActivityType, $page: Int) {
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
}`,n`query {
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
}`;function n(e,...t){const a=[];for(let i=0;i<e.length;i++)a.push(e[i],t[i]||"");const r=/\s*([{}():,\[\]])\s*/g;return a.join("").replace(/\n|\r/g," ").replace(r,"$1").replace(/\s{2,}/g," ")}P(0),P(0),P(0),P(0),P(0),P(0),P(0),P(0);const Ne=Symbol("store-raw"),B=Symbol("store-node"),C=Symbol("store-has"),Je=Symbol("store-self");function Qe(e){let t=e[U];if(!t&&(Object.defineProperty(e,U,{value:t=new Proxy(e,yt)}),!Array.isArray(e))){const a=Object.keys(e),r=Object.getOwnPropertyDescriptors(e);for(let i=0,s=a.length;i<s;i++){const o=a[i];r[o].get&&Object.defineProperty(e,o,{enumerable:r[o].enumerable,get:r[o].get.bind(t)})}}return t}function ve(e){let t;return e!=null&&typeof e=="object"&&(e[U]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function ee(e,t=new Set){let a,r,i,s;if(a=e!=null&&e[Ne])return a;if(!ve(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let o=0,d=e.length;o<d;o++)i=e[o],(r=ee(i,t))!==i&&(e[o]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const o=Object.keys(e),d=Object.getOwnPropertyDescriptors(e);for(let l=0,E=o.length;l<E;l++)s=o[l],!d[s].get&&(i=e[s],(r=ee(i,t))!==i&&(e[s]=r))}return e}function ye(e,t){let a=e[t];return a||Object.defineProperty(e,t,{value:a=Object.create(null)}),a}function te(e,t,a){if(e[t])return e[t];const[r,i]=P(a,{equals:!1,internal:!0});return r.$=i,e[t]=r}function ft(e,t){const a=Reflect.getOwnPropertyDescriptor(e,t);return!a||a.get||!a.configurable||t===U||t===B||(delete a.value,delete a.writable,a.get=()=>e[U][t]),a}function Xe(e){xe()&&te(ye(e,B),Je)()}function vt(e){return Xe(e),Reflect.ownKeys(e)}const yt={get(e,t,a){if(t===Ne)return e;if(t===U)return a;if(t===Ue)return Xe(e),a;const r=ye(e,B),i=r[t];let s=i?i():e[t];if(t===B||t===C||t==="__proto__")return s;if(!i){const o=Object.getOwnPropertyDescriptor(e,t);xe()&&(typeof s!="function"||e.hasOwnProperty(t))&&!(o&&o.get)&&(s=te(r,t,s)())}return ve(s)?Qe(s):s},has(e,t){return t===Ne||t===U||t===Ue||t===B||t===C||t==="__proto__"?!0:(xe()&&te(ye(e,C),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:vt,getOwnPropertyDescriptor:ft};function he(e,t,a,r=!1){if(!r&&e[t]===a)return;const i=e[t],s=e.length;a===void 0?(delete e[t],e[C]&&e[C][t]&&i!==void 0&&e[C][t].$()):(e[t]=a,e[C]&&e[C][t]&&i===void 0&&e[C][t].$());let o=ye(e,B),d;if((d=te(o,t,i))&&d.$(()=>a),Array.isArray(e)&&e.length!==s){for(let l=e.length;l<s;l++)(d=o[l])&&d.$();(d=te(o,"length",s))&&d.$(e.length)}(d=o[Je])&&d.$()}function Ze(e,t){const a=Object.keys(t);for(let r=0;r<a.length;r+=1){const i=a[r];he(e,i,t[i])}}function ht(e,t){if(typeof t=="function"&&(t=t(e)),t=ee(t),Array.isArray(t)){if(e===t)return;let a=0,r=t.length;for(;a<r;a++){const i=t[a];e[a]!==i&&he(e,a,i)}he(e,"length",r)}else Ze(e,t)}function ae(e,t,a=[]){let r,i=e;if(t.length>1){r=t.shift();const o=typeof r,d=Array.isArray(e);if(Array.isArray(r)){for(let l=0;l<r.length;l++)ae(e,[r[l]].concat(t),a);return}else if(d&&o==="function"){for(let l=0;l<e.length;l++)r(e[l],l)&&ae(e,[l].concat(t),a);return}else if(d&&o==="object"){const{from:l=0,to:E=e.length-1,by:X=1}=r;for(let y=l;y<=E;y+=X)ae(e,[y].concat(t),a);return}else if(t.length>1){ae(e[r],t,[r].concat(a));return}i=e[r],a=[r].concat(a)}let s=t[0];typeof s=="function"&&(s=s(i,a),s===i)||r===void 0&&s==null||(s=ee(s),r===void 0||ve(i)&&ve(s)&&!Array.isArray(s)?Ze(i,s):he(e,r,s))}function It(...[e,t]){const a=ee(e||{}),r=Array.isArray(a),i=Qe(a);function s(...o){Ee(()=>{r&&o.length===1?ht(a,o[0]):ae(a,o)})}return[i,s]}It({});const Re=class Re{constructor({start:t,limit:a,interval:r=60,fillAmount:i=1,pool:s,defaultDelay:o=30}){x(this,L);x(this,q,[]);x(this,Y,null);x(this,re,null);x(this,$);x(this,H);x(this,ie);x(this,W);x(this,K);x(this,z);x(this,j,Promise.resolve());S(this,$,t),S(this,H,a),S(this,ie,r),S(this,W,i),S(this,z,o),S(this,K,s),D(this,L,be).call(this)}requestToken(){return p(this,$)>0?(we(this,$)._--,!0):!1}enqueue(t){return S(this,j,p(this,j).then(t).catch(a=>{console.error("Request error:",a)})),p(this,j)}getDefaultDelay(){return p(this,z)}getsNextToken(){const{promise:t,resolve:a}=Promise.withResolvers();return this.addToBucket(a),t}addToBucket(t){p(this,q).push(t)}delayBucket(t){D(this,L,tt).call(this,t||p(this,z))}};q=new WeakMap,Y=new WeakMap,re=new WeakMap,$=new WeakMap,H=new WeakMap,ie=new WeakMap,W=new WeakMap,K=new WeakMap,z=new WeakMap,j=new WeakMap,L=new WeakSet,be=function(){clearInterval(p(this,Y)),S(this,Y,setInterval(()=>D(this,L,Fe).call(this),p(this,ie)*1e3))},tt=function(t){S(this,$,0),clearInterval(p(this,Y)),clearTimeout(p(this,re)),S(this,re,setTimeout(()=>{D(this,L,be).call(this),D(this,L,Fe).call(this)},t*1e3))},Fe=function(){var a;p(this,K)instanceof Re?S(this,$,Math.min(p(this,$)+Math.min(p(this,W),D(a=p(this,K),L,at).call(a)),p(this,H))):S(this,$,Math.min(p(this,$)+p(this,W),p(this,H)));const t=p(this,q).slice();p(this,q).length=0,t.forEach(r=>r())},at=function(){return p(this,$)>0?we(this,$)._--:p(this,$)};let k=Re;const _e=m;Ae({storeName:"results",type:"reload",expiresInSeconds:60*60*24*365}),Ae({storeName:"results",type:"reload",expiresInSeconds:60*60*7}),Ae({storeName:"results",type:"fetch-once",expiresInSeconds:60*60*24*365}),Ae({storeName:"results",type:"only-if-cached",expiresInSeconds:60*60*24*365}),new k({start:90,limit:90,interval:60,defaultDelay:20}),new k({start:5,limit:5,interval:2,defaultDelay:20,pool:new k({start:60,limit:90,interval:60,fillAmount:60})}),new k({start:1,limit:1,interval:1/3,defaultDelay:1,pool:new k({start:3,limit:3,interval:1.25,pool:new k({start:60,limit:60,interval:60,fillAmount:60})})});const De=new Map,Ie=new Map;function Ae(e){return e.storeName??(e.storeName=""),e.fetchOnDebug??(e.fetchOnDebug=!1),e.type??(e.type="default"),F(e.type==="no-store"||Number.isInteger(e.expiresInSeconds),"Give explisite expiration time. 0 if the data never expires"),F(e.type==="no-store"||e.expiresInSeconds>0,"Expiration time should be more than 0"),F(e.type!=="no-store"||!e.storeName,"StoreName is not used because cache type is no-store"),function(a){return(...r)=>{const[i,s]=P(void 0),[o,d]=P(!1),[l,E]=P(!1),[X,y]=P(!0);let u=null;const w=e.type=="default"||e.type=="only-if-cached",T=(_e==!1||e.fetchOnDebug||e.type=="no-store"||!e.storeName)&&w==!1,se=(c,M)=>{if(typeof c=="function"&&(c=c(ge(i))),c=structuredClone(c),F(ge(i)!==null||e.type!=="only-if-cached","Can't mutate null data"),F(typeof c=="object","Data should always be JSON object data"),e.type!=="no-store"&&(De.set(u.cacheKey,c),e.storeName)){y(!1);const _=N.fetchCache();_.onsuccess=Ce=>{const Oe=Ce.target.result,$e=N.store(Oe,e.storeName,"readwrite",()=>y(!0),()=>y(!0)).put(c);M&&($e.onsuccess=M)}}},oe=c=>{c.cacheKey===u.cacheKey&&s(c)},Te=c=>{typeof c=="function"&&(c=c(ge(i))),s(c)},O=async()=>{if(e.type==="only-if-cached")return E(!1),s(null);Ie.has(u.cacheKey)||Ie.set(u.cacheKey,u.send());const c=await Ie.get(u.cacheKey);if(Ie.delete(u.cacheKey),c!==null){if(e.expiresInSeconds){const M=new Date;c.expires=M.setSeconds(M.getSeconds()+e.expiresInSeconds)}Ee(()=>{c.error?(d(!0),console.assert(!_e,"Fetch error, not saving data to cache")):(se(c),oe(c)),E(!1)})}};return nt(()=>{const c=r.map(_=>typeof _=="function"?_():_);if(c.some(_=>_===void 0))return;u==null||u.abort(),u=a(...c),_e&&console.log("Fetching",e.type,u.body||u.url),Ee(()=>{E(!0),d(!1)});const M=De.get(u.cacheKey);if(M&&M.expires>new Date)if(oe({...M,fromCache:!0}),e.type==="fetch-once"){E(!1);return}else T===!1&&E(!1);else if(e.type!=="no-store"&&e.storeName){const _=N.fetchCache();_.onerror=O,_.onsuccess=Ce=>{const Oe=Ce.target.result,$e=N.store(Oe,e.storeName,"readonly").get(u.cacheKey);$e.onerror=O,$e.onsuccess=ne=>{if(ne.target.result&&(F(ne.target.result.expires,"Cache should have a expiration date"),F(ne.target.result.data,"Cache should always have data"),ne.target.result.expires>new Date)){T==!1&&E(!1);const Me={...ne.target.result,fromCache:!0};return e.type!=="only-if-cached"&&De.set(Me.cacheKey,Me),oe(Me)}T==!1&&O()}}}else T==!1&&O();T&&O()}),Object.defineProperties(i,{error:{get:()=>o()},loading:{get:()=>l()},indexedDBClosed:{get:()=>X()}}),dt(()=>u==null?void 0:u.abort()),[i,{mutate:Te,refetch:O,mutateCache:se}]}}}const Q=class Q{static store(t,a,r,i,s){const o=t.transaction(a,r);return i?o.onerror=i:o.onerror=console.warn,s&&(o.oncomplete=s),o.objectStore(a)}static fetchCache(t){const a=indexedDB.open("legendary-octo-barnacle-cache",2);return t&&(a.onerror=t),a.onupgradeneeded=r=>{var s,o;const i=r.target.result;switch(r.oldVersion){case 0:D(s=Q,J,Se).call(s,i,"results",{keyPath:"cacheKey"});case 1:D(o=Q,J,Se).call(o,i,"debug",{keyPath:"cacheKey"})}},a}static user(t){const a=indexedDB.open("legendary-octo-barnacle-users",1);return t&&(a.onerror=t),a.onupgradeneeded=r=>{var s;const i=r.target.result;switch(r.oldVersion){case 0:D(s=Q,J,Se).call(s,i,"data")}},a}};J=new WeakSet,Se=function(t,a,r){t.objectStoreNames.contains(a)||t.createObjectStore(a,r)},x(Q,J);let N=Q;onmessage=({data:{cacheKey:e,type:t,...a}})=>{const r=N.fetchCache();r.onerror=V,r.onsuccess=i=>{const s=i.target.result,d=N.store(s,"results","readonly").get(e);d.onerror=V,d.onsuccess=l=>{l.target.result?At(l.target.result,t,a):V()}}};function At(e,t,a){const r={format:a.format,status:a.status,genre:a.genre,reverse:a.reverse,countryOfOrigin:a.countryOfOrigin,missingStart:a.missingStart,missingScore:a.missingScore,isAdult:a.isAdult,year:a.year,private:a.private,studio:a.studio,tag:a.tag,notes:a.notes,repeat:a.repeat,userStatus:a.userStatus};a.search&&(a.search=a.search.replace(/[#-.]|[[-^]|[?|{}]/g,"\\$&"),a.search.trim()===""?r.searchRegex=new RegExp(a.search,"i"):a.search.match(/\W/)?r.searchRegex=new RegExp(a.search.replace(/ +/g,"\\W"),"i"):r.searchRegex=new RegExp(a.search.split("").join("\\W?"),"i"));const i=new Set,s=new Set,o=new Set;e.data.indecies={},e.data.lists.forEach((y,u)=>{let w=0;y.entries.forEach((T,se,oe)=>{var Te,O;(Te=e.data.indecies)[O=T.media.id]??(Te[O]=[]),e.data.indecies[T.media.id].push([u,se]);for(const c of T.media.studios.edges)if(c.isMain)o.add(c.node.name);else break;for(const c of T.media.tags)if(c.rank>50)s.add(c.name);else break;$t(T,r)&&(i.add(T.media.id),w++<se&&(oe[w-1]=T))}),y.entries.length=w}),e.data.total=i.size,e.data.studios=Array.from(o).sort(),e.data.tags=Array.from(s).sort();const d=Tt(a.sort,a.reverse?-1:1);e.data.lists.forEach(y=>{y.entries.sort(d)});const l=e.data.user.mediaListOptions[t==="anime"?"animeList":"mangaList"].sectionOrder,E=Object.fromEntries(Object.entries(l).map(([y,u])=>[u,+y+1]));e.data.lists.sort((y,u)=>E[y.name]-E[u.name]);const X=N.user();X.onerror=V,X.onsuccess=y=>{const u=y.target.result,w=N.store(u,"data","readwrite",V);w.onerror=V;const T=w.put(e,"media_list");T.onerror=V,T.onsuccess=()=>{postMessage("success")}}}function Tt(e,t=1){switch(e){case"score":return(a,r)=>g.score(a,r)*t||g.title(a,r);case"title":return(a,r)=>g.title(a,r)*t||g.score(a,r);case"progress":return(a,r)=>g.progress(a,r)*t||g.title(a,r);case"updatedAt":return(a,r)=>g.updatedAt(a,r)*t||g.title(a,r);case"startedAt":return(a,r)=>(g.startedAt(a,r)||g.completedAt(a,r))*t||g.title(a,r);case"completedAt":return(a,r)=>(g.completedAt(a,r)||g.updatedAt(a,r))*t;case"releaseDate":return(a,r)=>g.releaseDate(a,r)*t||g.title(a,r);case"averageScore":return(a,r)=>g.averageScore(a,r)*t||g.title(a,r);case"popularity":return(a,r)=>g.popularity(a,r)*t||g.title(a,r);case"repeat":return(a,r)=>(g.repeat(a,r)||g.progress(a,r))*t||g.title(a,r);default:return console.error("No sort given"),(a,r)=>g.score(a,r)*t||g.title(a,r)}}const g={score:(e,t)=>(t.score||0)-(e.score||0),title:(e,t)=>e.media.title.userPreferred.localeCompare(t.media.title.userPreferred),progress:(e,t)=>(t.progress||0)-(e.progress||0),updatedAt:(e,t)=>(e.updatedAt||0)>(t.updatedAt||0)?-1:1,startedAt:(e,t)=>{var a,r,i,s,o,d;return(((a=t.startedAt)==null?void 0:a.year)||0)-(((r=e.startedAt)==null?void 0:r.year)||0)||(((i=t.startedAt)==null?void 0:i.month)||0)-(((s=e.startedAt)==null?void 0:s.month)||0)||(((o=t.startedAt)==null?void 0:o.day)||0)-(((d=e.startedAt)==null?void 0:d.day)||0)},completedAt:(e,t)=>{var a,r,i,s,o,d;return(((a=t.completedAt)==null?void 0:a.year)||0)-(((r=e.completedAt)==null?void 0:r.year)||0)||(((i=t.completedAt)==null?void 0:i.month)||0)-(((s=e.completedAt)==null?void 0:s.month)||0)||(((o=t.completedAt)==null?void 0:o.day)||0)-(((d=e.completedAt)==null?void 0:d.day)||0)},releaseDate:(e,t)=>{var a,r,i,s,o,d;return(((a=t.media.startDate)==null?void 0:a.year)||0)-(((r=e.media.startDate)==null?void 0:r.year)||0)||(((i=t.media.startDate)==null?void 0:i.month)||0)-(((s=e.media.startDate)==null?void 0:s.month)||0)||(((o=t.media.startDate)==null?void 0:o.day)||0)-(((d=e.media.startDate)==null?void 0:d.day)||0)},averageScore:(e,t)=>(t.media.averageScore||0)-(e.media.averageScore||0),popularity:(e,t)=>(t.media.popularity||0)-(e.media.popularity||0),repeat:(e,t)=>(t.repeat||0)-(e.repeat||0)};function $t(e,t){var a,r,i,s,o,d;if(t.searchRegex)e:{if((e.searchMatch=e.media.title.userPreferred.match(t.searchRegex))||(e.searchMatch=(a=e.media.title.native)==null?void 0:a.match(t.searchRegex))||(e.searchMatch=(r=e.media.title.english)==null?void 0:r.match(t.searchRegex))||(e.searchMatch=(i=e.media.title.romaji)==null?void 0:i.match(t.searchRegex))||(e.searchMatch=(s=e.media.synonyms)==null?void 0:s.some(l=>l.match(t.searchRegex))))break e;return!1}if(t.format&&e.media.format!==t.format||t.status&&e.media.status!==t.status||t.countryOfOrigin&&e.media.countryOfOrigin!==t.countryOfOrigin||t.year&&((o=e.media.startDate)==null?void 0:o.year)!==t.year||typeof t.isAdult=="boolean"&&e.media.isAdult!==t.isAdult||t.genre&&e.media.genres.every(l=>l!==t.genre)||t.userStatus&&e.status!==t.userStatus||t.private&&!e.private||t.notes&&!e.notes||t.repeat&&!(e.repeat>0)||t.missingStart&&((d=e.startedAt)!=null&&d.year)||t.missingScore&&e.score!==0)return!1;if(t.studio)e:{for(const l of e.media.studios.edges)if(l.isMain&&l.node.name===t.studio)break e;return!1}if(t.tag)e:{for(const l of e.media.tags)if(l.rank>50&&l.name===t.tag)break e;return!1}return!0}function V(e){console.warn(e),postMessage("error")}})();
