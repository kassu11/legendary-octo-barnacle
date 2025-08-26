import { batch, createEffect, createSignal, For, on, Show } from "solid-js";
import { A, useParams } from "@solidjs/router";
import { formatTitleToUrl, mediaUrl } from "../../utils/formating";
import api from "../../utils/api";
import { DoomScroll } from "../utils/DoomScroll";
import { leadingAndTrailingDebounce } from "../../utils/scheduled";
import { useAuthentication } from "../../context/providers";
import { asserts } from "../../utils/utils";

function Recommendations(props) {
  const params = useParams();
  const [showMore, setShowMore] = createSignal(false);
  const [id, setId] = createSignal();

  createEffect(on(() => params.id, id => {
    setShowMore(false);
    setId(id);
  }));

  return (
    <Show when={props.recommendations?.nodes.length > 0}>
      <div>
        <div class="flex-space-between">
          <h2>Recommendations</h2>
          <div>
            <button>Add</button>
            <Show when={props.recommendations.pageInfo.total > props.recommendations.nodes.length}>
              <button onClick={() => setShowMore(state => !state)}>
                Show
                <Show when={showMore()} fallback=" more"> less</Show>
              </button>
            </Show>
          </div>
        </div>
        <ol class="grid-column-auto-fill recommendations">
          <Switch>
            <Match when={!showMore()}>
              <RecommendationCards nodes={props.recommendations.nodes} mutateCache={props.mutateCache} />
            </Match>
            <Match when={showMore()}>
              <RecommendationsPage id={id()} page={1} mutateOldCardsCache={props.mutateCache} oldCards={props.recommendations.nodes} />
            </Match>
          </Switch>
        </ol>
      </div>
    </Show>
  );
};


function RecommendationsPage(props) {
  const { accessToken } = useAuthentication();
  const [id, setId] = createSignal(undefined)
  const [recommendations, { mutateCache: mutateRecommendations }] = api.anilist.recommendationsId(id, props.page, accessToken);

  const mutateCache = (i, node) => mutateRecommendations(res => {
    res.data.nodes[i] = node;
    return res;
  });

  return (
    <DoomScroll 
      onIntersection={() => setId(props.id)} 
      fetchResponse={recommendations} 
      loadingElement={<RecommendationCards nodes={props.oldCards || []} mutateCache={props.mutateCache} />} 
      loading={props.loading}
    >{fetchCooldown => (
        <>
          <RecommendationCards nodes={recommendations().data.nodes} mutateCache={mutateCache} mutateOldCardsCache={props.mutateOldCardsCache} oldCards={props.oldCards} />
          <Show when={recommendations().data.pageInfo.hasNextPage}>
            <Show when={fetchCooldown === false} fallback="Fetch cooldown">
              <RecommendationsPage id={id()} page={props.page + 1} loading={recommendations.loading} />
            </Show>
          </Show>
        </>
      )}
    </DoomScroll>
  );
}

function RecommendationCards(props)  {
  asserts.assertTrue(!props.oldCards === !props.mutateOldCardsCache, "These two props needs to be used together");

  return (
    <For each={props.nodes}>{(node, i) => (
      <Show when={node.mediaRecommendation}>
        <RecommendationCard node={node} mutateCache={n => {
          batch(() => {
            if (i() < props.oldCards?.length) {
              props.mutateOldCardsCache(i(), n);
            }
            props.mutateCache(i(), n);
          });
        }} />
      </Show>
    )}</For>
  );
}

function RecommendationCard(props) {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [userRating, setUserRating] = createSignal(props.node.userRating);
  const [rating, setRating] = createSignal(props.node.rating);

  let localRating = props.node.userRating;
  const triggerLikeRating = leadingAndTrailingDebounce(async (token, id, rating, mediaId, mediaRecommendationId) => {
    if (rating !== localRating) {
      const response = await api.anilist.rateRecommendation(token, id, rating, mediaId, mediaRecommendationId);
      asserts.assertTrue(!response.fromCache, "Mutation should never be cached");
      if (response.status === 200) {
        props.mutateCache(response.data);
      }
    } 
    localRating = rating 
  }, 1000);

  return (
    <li>
      <A href={mediaUrl(props.node.mediaRecommendation)}>
        <div class="wrapper">
          <img src={props.node.mediaRecommendation.coverImage.large} alt="Media cover" />
        </div>
        <p>{props.node.mediaRecommendation.title.userPreferred}</p>
      </A>
      <div class="recommendation-rating-wrapper">
        <div class="flex-space-between">
          <div>
            <button classList={{active: userRating() === "RATE_UP"}} style={{"--color": "lime"}} onClick={() => {
              setUserRating(rating => {
                if(rating === "RATE_UP") {
                  triggerLikeRating(accessToken(), props.node.id, "NO_RATING", params.id, props.node.mediaRecommendation.id);
                  setRating(v => v - 1);
                  return "NO_RATING";
                } else {
                  triggerLikeRating(accessToken(), props.node.id, "RATE_UP", params.id, props.node.mediaRecommendation.id);
                  setRating(v => v + 1);
                  return "RATE_UP";
                }
              });
            }}>
              <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"></path></svg>
            </button>
            <button classList={{active: userRating() === "RATE_DOWN"}} style={{"--color": "crimson"}} onClick={() => {
              setUserRating(rating => {
                if(rating === "RATE_DOWN") {
                  triggerLikeRating(accessToken(), props.node.id, "NO_RATING", params.id, props.node.mediaRecommendation.id);
                  setRating(v => v + 1);
                  return "NO_RATING";
                } else {
                  triggerLikeRating(accessToken(), props.node.id, "RATE_DOWN", params.id, props.node.mediaRecommendation.id);
                  setRating(v => v - 1);
                  return "RATE_DOWN";
                }
              });
            }}>
              <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z"></path></svg>
            </button>
          </div>
          <span>
            <Switch>
              <Match when={rating() > 0}>+</Match>
              <Match when={rating() > 0}>-</Match>
            </Switch>
            {rating()}
          </span>
        </div>
      </div>
    </li>
  )
};

export default Recommendations; 
