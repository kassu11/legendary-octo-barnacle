import { A } from "@solidjs/router";
import { For, Match, Show, Switch } from "solid-js";
import { capitalize, formatMediaFormat, mediaUrl, numberCommas } from "../../utils/formating.js";
import EmojiByScoreScoped from "../../components/EmojiByScore.scoped.jsx";
import "./VerticalCardRow.scoped.css";
import { asserts } from "../../collections/collections.js";
import { formatSecondsToLongString } from "../../utils/timeUtils.js";
import { BrowsePageHeaderLinks } from "./BrowsePageHeaderLinks.scoped.jsx";

export function VerticalCardRowScoped(props) {
  asserts.assertTrueOLD("href" in props, "Link is missing");
  asserts.isTypeStringOLD(props.type, "type");

  return (
    <section>
      <BrowsePageHeaderLinks {...props} />
      <ol class="vertical-search-card-row">
        <For each={props.data}>
          {(card, i) => (
            <li class="vertical-search-card" style={{"--media-background-color": card.coverImage.color}}>
              <p class="ranking">
                #
                <span>{i() + 1}</span>
              </p>
              <div class="vertical-search-card-body">
                <A class="cover-container" tabindex="-1" href={mediaUrl(card)}>
                  <img src={card.coverImage.large} class="cover" alt="Cover."/>
                </A>
                <div class="vertical-search-card-content clamp">
                  <A href={mediaUrl(card)} class="title">
                    {card.title.userPreferred}
                  </A>
                  <ol class="vertical-search-card-genre-list">
                    <For each={card.genres}>{genre => (
                      <li class="vertical-search-card-genre">
                        <A href={`/search${props.type ? ("/" + props.type) : ""}?genre=` + genre}>{genre}</A>
                      </li>
                    )}</For>
                  </ol>
                </div>
                <div class="vertical-search-card-info">
                  <div class="vertical-search-card-score">
                    <EmojiByScoreScoped score={card.averageScore}/>
                    <div class="clamp">
                      <p>{card.averageScore}%</p>
                      <p>{numberCommas(card.popularity)} users</p>
                    </div>
                  </div>
                  <div class="clamp">
                    <p>{formatMediaFormat(card.format) || "TBA"}</p>
                    <p>
                      <Switch>
                        <Match when={card.type === "ANIME"}>
                          <Switch>
                            <Match when={card.format === "MOVIE"}>{formatSecondsToLongString(card.duration)}</Match>
                            <Match when={card.episodes}>
                              {numberCommas(card.episodes)} Episode
                              <Show when={card.episodes > 1}>s</Show>
                            </Match>
                          </Switch>
                        </Match>
                        <Match when={card.type === "MANGA" && card.format === "NOVEL" && card.volumes}>
                          {numberCommas(card.volumes)} Volume
                          <Show when={card.volumes > 1}>s</Show>
                        </Match>
                        <Match when={card.type === "MANGA" && card.chapters}>
                          {numberCommas(card.chapters)} Chapter
                          <Show when={card.chapters > 1}>s</Show>
                        </Match>
                      </Switch>
                    </p>
                  </div>
                  <div class="clamp">
                    <Switch>
                      {/* TODO: Check how anilist handles airing episodes*/}
                      {/* TODO Add edit media button for row cards*/}
                      {/* <Match when={card.status === "AIRING"}>*/}
                        {/* <p>{capitalize(card.status)}</p>*/}
                        {/* <p></p>*/}
                      {/* </Match>*/}
                      <Match when={true}>
                        <Switch>
                          <Match when={(card.episodes > 32 || card.type === "MANGA") && card.endDate?.year - card.startDate?.year > 0}>
                            <p>{card.startDate.year} - {card.endDate.year}</p>
                          </Match>
                          <Match when={card.season}>
                            <p>{capitalize(card.season)} {card.seasonYear}</p>
                          </Match>
                        </Switch>
                        <p>{capitalize(card.status)}</p>
                      </Match>
                    </Switch>
                  </div>
                </div>
              </div>
            </li>
          )}
        </For>
      </ol>
    </section>
  );
}
