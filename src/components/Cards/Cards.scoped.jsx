import { A } from "@solidjs/router";
import { asserts, queries } from "../../collections/collections.js";
import { formatingUtils, urlUtils } from "../../utils/utils.js";
import Edit from "../../assets/Edit.jsx";
import Planning from "../../assets/Planning.jsx";
import Watching from "../../assets/Watching.jsx";
import Complete from "../../assets/Complete.jsx";
import Rewatched from "../../assets/Rewatched.jsx";
import { useEditMediaEntries } from "../../context/providers.js";
import Star from "../../assets/Star.jsx";
import { QuickActionListButton } from "../Buttons.scoped.jsx";
import ThumbUp from "../../assets/ThumbUp.jsx";
import ThumbDown from "../../assets/ThumbDown.jsx";
import "./Cards.scoped.css";
import { For, Match, Show, Switch } from "solid-js";
import { createAnilistFetcher, fetcherToFetch } from "../../utils/fetcherUtils.js";
import { addApplicationNotification } from "../../pages/App/ApplicationNotifications.scoped.jsx";
import { mediaWithMalId, token2 } from "../../core/globalState.js";
import { capitalize, formatMediaFormat, formatMediaStatus, languageFromCountry } from "../../utils/formating.js";
import { DurationToTime, EpisodeTime2 } from "../../pages/Home/EpisodeTime.jsx";

function AnilistMediaCardListBody(props) {
  return (
    <li class="cp-media-card inline-container" data-index={props["data-index"]} classList={{ skeleton: props.skeleton, loading: props.loading, "loading-end": !props.loading }} style={{ "--card-cover-url": `url("${props.media?.coverImage?.large}")`, "--media-background-color": props.media?.coverImage?.color }} ref={props.ref}>
      <Show when={!props.skeleton}>
        <A class="block-link" href={urlUtils.anilistMediaUrl(props.media)}>
          <div class="wrapper">
            <img class="absolute-inset" src={props.media.coverImage.extraLarge || props.media.coverImage.large} alt="Cover." />
            <Show when={props.media.averageScore}>
              <div class="score">
                <Star /> {(props.media.averageScore / 10)}
              </div>
            </Show>
            {props.children}
          </div>
          <p class="line-clamp">
            <Show when={props.media.mediaListEntry?.status}>
              <div class="list-status" attr:data-status={props.media.mediaListEntry.status}></div>
            </Show>
            {props.media.title.userPreferred}
          </p>
        </A>
        <div class="hover-card" style={{ "--media-background-color": props.media?.coverImage?.color }}>
          <Show when={props.media?.bannerImage}>
            <img src={props.media?.bannerImage} />
          </Show>
          <p class="line-clamp header shadow">{props.media.title.userPreferred}</p>
          <Show when={props.media.nextAiringEpisode?.episode && props.media.nextAiringEpisode?.airingAt}>
            <p class="episodes">
              <Show when={props.media.format !== "MOVIE"} fallback="Movie ">
                Ep {props.media.nextAiringEpisode.episode}{" "}
              </Show>
              <EpisodeTime2 airingAt={props.media.nextAiringEpisode.airingAt} flavorText="airing in " day=" day" hour=" hour" fallback={
                <EpisodeTime2 airingAt={props.media.nextAiringEpisode.airingAt} flavorText="airing in " minute=" minute" fallback="has aired" />
              } />
            </p>
          </Show>
          <div class="body">
            <Show when={props.media.studios?.edges.length}>
              <div class="studios shadow">
                <For each={props.media.studios?.edges}>{edge => (
                  <p>{edge.node.name}</p>
                )}</For>
              </div>
            </Show>
            <Show when={props.media.genres?.length}>
              <div class="genres">
                <For each={props.media.genres}>{genre => (
                  <p>{genre}</p>
                )}</For>
              </div>
            </Show>
          </div>
          <div class="type-and-season">
            <div class="flex-bullet-separator">
              <Show when={props.media?.format}>
                <span>
                  <Switch>
                    <Match when={props.media?.countryOfOrigin !== "JP"}>
                      {formatMediaFormat(props.media?.format)} ({languageFromCountry(props.media?.countryOfOrigin)})
                    </Match>
                    <Match when={props.media?.countryOfOrigin === "JP"}>
                      {formatMediaFormat(props.media?.format)}
                    </Match>
                  </Switch>
                </span>
              </Show>
              <span>
                <Switch>
                  <Match when={props.media?.type === "MANGA"}>
                    <Switch>
                      <Match when={props.media?.format === "NOVEL" && props.media?.volumes}>
                        {props.media.volumes} Volume{formatingUtils.plural(props.media.volumes)}
                      </Match>
                      <Match when={props.media?.chapters}>
                        {props.media.chapters} Chapter{formatingUtils.plural(props.media.chapters)}
                      </Match>
                      <Match when={props.media?.status}>
                        {formatMediaStatus(props.media.status)}
                      </Match>
                    </Switch>
                  </Match>
                  <Match when={props.media?.type === "ANIME"}>
                    <Switch>
                      <Match when={props.media?.format === "MOVIE" && props.media?.duration}>
                        <DurationToTime time={props.media.duration * 60} minute=" minute" hour=" hour" />
                      </Match>
                      <Match when={props.media?.format !== "MOVIE" && props.media?.episodes}>
                        {props.media.episodes} Episode{formatingUtils.plural(props.media.episodes)}
                      </Match>
                    </Switch>
                  </Match>
                </Switch>
              </span>
            </div>
            <span class="season">
              <Switch>
                <Match when={props.media?.type === "MANGA"}>
                  <Switch>
                    <Match when={props.media?.startDate?.year}>
                      {props.media?.startDate.year}
                    </Match>
                    <Match when={props.media?.startDate?.year == null}>
                      TBA
                    </Match>
                  </Switch>
                </Match>
                <Match when={props.media?.type === "ANIME"}>
                  <Switch>
                    <Match when={props.media?.seasonYear && props.media?.season}>
                      {capitalize(props.media?.season)} {props.media?.seasonYear}
                    </Match>
                    <Match when={props.media?.startDate?.year}>
                      {props.media?.startDate.year}
                    </Match>
                    <Match when={props.media?.startDate?.year == null}>
                      TBA
                    </Match>
                  </Switch>
                </Match>
              </Switch>
            </span>
          </div>
        </div>
      </Show>
    </li>
  )
}

function JikanMediaCardListBody(props) {
  asserts.assertTrueOLD(props.media, "Missing media");

  return (
    <li class="cp-media-card inline-container">
      <A class="block-link" href={urlUtils.jikanMediaUrl(props.type, props.media)}>
        <div class="wrapper">
          <img class="absolute-inset" src={props.media.images.webp.large_image_url} alt="Cover." />
          <Show when={props.media.score}>
            <div class="score">
              <Star /> {(props.media.score)}
            </div>
          </Show>
          {props.children}
        </div>
        <p class="line-clamp">
          <Show when={props.media.titles} fallback={props.media.title}>
            <Switch>
              <Match when={props.media.titles.English}>{props.media.titles.English}</Match>
              <Match when={props.media.titles.Default}>{props.media.titles.Default}</Match>
            </Switch>
          </Show>
        </p>
      </A>
    </li>
  )
}

export function AnilistMediaCard(props) {
  return (
    <AnilistMediaCardListBody {...props}>
      <QuickActionItemList {...props} />
    </AnilistMediaCardListBody>
  );
}

export function JikanMediaCard(props) {
  asserts.assertTrueOLD(props.media, "Missing media");
  asserts.isTypeStringOLD(props.type);

  return (
    <JikanMediaCardListBody {...props}>
      <Show when={mediaWithMalId[props.media.mal_id]}>
        <QuickActionItemList media={mediaWithMalId[props.media.mal_id]} />
      </Show>
    </JikanMediaCardListBody>
  );
}

function QuickActionItemList(props) {
  const { openEditor } = useEditMediaEntries();

  asserts.assertTrueOLD(props.media, "Missing media");

  const handleClick = status => async e => {
    e.preventDefault();

    const fetcher = createAnilistFetcher(queries.anilistMutateMedia, { mediaId: props.media.id, status }, AbortSignal.timeout(30_000));
    const res = await fetcherToFetch(fetcher);
    if (res.status === 200) {
      const json = await res.json();
      console.log("JSON", json)
      // props.activity.likeCount = json.data.ToggleLike.likeCount;
    } else {
      addApplicationNotification({ type: "error", message: "Failed to update media status", duration: 30_000 });
    }
  };

  return (
    <Show when={token2()}>
      <ul class="cp-media-card-quick-action-items">
        <QuickActionListButton label="Edit media" onClick={e => {
          e.preventDefault();
          openEditor(props.media);
        }}>
          <Edit />
        </QuickActionListButton>
        <QuickActionListButton label="Set to planning" onClick={handleClick("PLANNING")}>
          <Planning />
        </QuickActionListButton>
        <QuickActionListButton label={"Set to " + (props.media.type === "ANIME" ? "watching" : "reading")} onClick={handleClick("CURRENT")}>
          <Watching />
        </QuickActionListButton>
        <QuickActionListButton label="Set to completed" onClick={handleClick("COMPLETED")}>
          <Complete />
        </QuickActionListButton>
        <QuickActionListButton label={"Set to " + (props.media.type === "ANIME" ? "rewatching" : "rereading")} onClick={handleClick("REPEATING")}>
          <Rewatched />
        </QuickActionListButton>
      </ul>
    </Show>
  );
}

export function AnilistMediaRecommendationCard(props) {
  asserts.assertTrueOLD(props.node, "Missing node");
  asserts.assertTypeFunctionOLD(props.handleRateUp, "handleRateUp");
  asserts.assertTypeFunctionOLD(props.handleRateDown, "handleRateDown");
  asserts.isTypeStringOLD(props.userRating, "userRating");
  asserts.isTypeInteger(props.rating, "rating");

  return (
    <AnilistMediaCardListBody media={props.node.mediaRecommendation}>
      <div class="absolute-inset recommendation-rating-wrapper">
        <div class="flex-space-between">
          <div>
            <button classList={{active: props.userRating === "RATE_UP"}} style={{"--color": "lime"}} onClick={props.handleRateUp}>
              <ThumbUp />
            </button>
            <button classList={{active: props.userRating === "RATE_DOWN"}} style={{"--color": "crimson"}} onClick={props.handleRateDown}>
              <ThumbDown />
            </button>
          </div>
          <span>
            <Show when={props.rating > 0}>+</Show>
            {props.rating}
          </span>
        </div>
      </div>
    </AnilistMediaCardListBody>
  );
}

export function MalCharacterCard(props) {
  asserts.assertTrueOLD(props.character, "character");
  asserts.isTypeStringOLD(props.role, "role");

  return (
    <li class="cp-character-card">
      <CharacterSection
        href={urlUtils.jikanCharacterUrl(props.character)}
        src={props.character.images.webp.image_url}
        name={props.character.name}
        extra={props.role}
        alt="Character."
      />
      <Show when={props.voiceActor}>
        <CharacterSection
          href={props.voiceActor.person.url}
          src={props.voiceActor.person.images.jpg.image_url}
          name={props.voiceActor.person.name}
          extra={props.voiceActor.language}
          alt="Voice actor."
          class="dir-rtl"
        />
      </Show>
    </li>
  );
}

export function MalStaffCard(props) {
  asserts.assertTrueOLD(props.staff, "staff");
  asserts.assertTrueOLD(props.positions, "positions");

  return (
    <li class="cp-character-card">
      <CharacterSection
        href={props.staff.url}
        src={props.staff.images.jpg.image_url}
        name={props.staff.name}
        extra={props.positions.join(", ")}
        alt="Staff."
      />
    </li>
  );
}

function CharacterSection(props) {
  asserts.isTypeStringOLD(props.alt);

  return (
    <A className="clean-link flex" class={props.class} href={props.href}>
      <img src={props.src} alt={props.alt} />
      <div class="grid">
        <span>{props.name}</span>
        <span>{props.extra}</span>
      </div>
    </A>
  )
}
