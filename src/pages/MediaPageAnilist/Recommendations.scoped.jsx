import { useParams } from "@solidjs/router";
import { fetcherSenderUtils, scheduleUtils } from "../../utils/utils";
import { asserts, fetchersOLD, fetcherSendersOLD, queries } from "../../collections/collections";
import "./Recommendations.scoped.css";
import { batch, createEffect, createSignal, For, Match, on, Show, Switch } from "solid-js";
import { useAuthentication } from "../../context/providers";
import { AnilistMediaRecommendationCard } from "../../components/Cards/Cards.scoped";
import { createAnilistFetcher, fetcherToFetch } from "../../utils/fetcherUtils";
import { addApplicationNotification } from "../App/ApplicationNotifications.scoped";
import { Intersection } from "../../components/utils/Intersection.scoped";

export function Recommendations(props) {
  const params = useParams();
  const [showMore, setShowMore] = createSignal(false);
  const [id, setId] = createSignal();

  createEffect(on(() => params.id, id => {
    setShowMore(false);
    setId(id);
  }));

  return (
    <Show when={props.recommendations?.nodes.length > 0}>
      <div class="recommendations">
        <div class="flex-space-between">
          <h2>Recommendations</h2>
          <div>
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
  const fetcher = fetcherSenderUtils.createFetcherOLD(fetchersOLD.anilist.getRecommendationsByid, accessToken, id, props.page);
  const [recommendations, { mutateCache: mutateRecommendations }] = fetcherSendersOLD.sendWithNullUpdates(fetcher);

  const mutateCache = (i, node) => mutateRecommendations(res => {
    res.data.nodes[i] = node;
    return res;
  });

  return (
    <>
      <Intersection onIntersection={() => setId(props.id)}>
        <Show when={recommendations()?.data?.nodes} fallback={<RecommendationCards nodes={props.oldCards || []} mutateCache={props.mutateCache} />}>
          <RecommendationCards nodes={recommendations().data.nodes} mutateCache={mutateCache} mutateOldCardsCache={props.mutateOldCardsCache} oldCards={props.oldCards} />
        </Show>
      </Intersection>
      <Show when={!recommendations.loading && recommendations()?.data?.pageInfo.hasNextPage}>
        <RecommendationsPage id={id()} page={props.page + 1} />
      </Show>
    </>
  );
}

function RecommendationCards(props)  {
  asserts.assertTrueOLD(!props.oldCards === !props.mutateOldCardsCache, "These two props needs to be used together");

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
  const [userRating, setUserRating] = createSignal(props.node.userRating);
  const [rating, setRating] = createSignal(props.node.rating);

  let localRating = props.node.userRating;
  const triggerLikeRating = scheduleUtils.leadingAndTrailingDebounce(async (id, rating, mediaId, mediaRecommendationId) => {
    if (rating !== localRating) {
      const fetcher = createAnilistFetcher(queries.anilistRateRecommendations, { id, rating, mediaId, mediaRecommendationId }, AbortSignal.timeout(30_000));
      const res = await fetcherToFetch(fetcher);
      if (res.status === 200) {
        const json = await res.json();
        props.mutateCache(json.data.SaveRecommendation);
      } else {
        addApplicationNotification({ type: "error", message: "Rating recommendation failed", duration: 30_000 });
      }
    }

    localRating = rating
  }, 1000);

  const handleRateUp = e => {
    e.preventDefault();
    setUserRating(rating => {
      if(rating === "RATE_UP") {
        triggerLikeRating(props.node.id, "NO_RATING", params.id, props.node.mediaRecommendation.id);
        setRating(v => v - 1);
        return "NO_RATING";
      } else {
        triggerLikeRating(props.node.id, "RATE_UP", params.id, props.node.mediaRecommendation.id);
        setRating(v => v + 1);
        return "RATE_UP";
      }
    });
  };

  const handleRateDown = e => {
    e.preventDefault();
    setUserRating(rating => {
      if(rating === "RATE_DOWN") {
        triggerLikeRating(props.node.id, "NO_RATING", params.id, props.node.mediaRecommendation.id);
        setRating(v => v + 1);
        return "NO_RATING";
      } else {
        triggerLikeRating(props.node.id, "RATE_DOWN", params.id, props.node.mediaRecommendation.id);
        setRating(v => v - 1);
        return "RATE_DOWN";
      }
    });
  }

  return (
    <AnilistMediaRecommendationCard
      node={props.node}
      rating={rating()}
      userRating={userRating()}
      handleRateUp={handleRateUp}
      handleRateDown={handleRateDown}
    />
  )
};
