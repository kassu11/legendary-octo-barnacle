import { batch, createEffect, createSignal, For, Match, on, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import api from "../../utils/api";
import { DoomScroll } from "../utils/DoomScroll";
import { leadingAndTrailingDebounce } from "../../utils/scheduled";
import { useAuthentication } from "../../context/providers";
import { asserts, fetchers, fetcherSenders } from "../../collections/collections";
import { AnilistMediaRecommendationCard } from "../Cards";
import { fetcherSenderUtils } from "../../utils/utils";

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
  const fetcher = fetcherSenderUtils.createFetcher(fetchers.anilist.getRecommendationsByid, accessToken, id, props.page);
  const [recommendations, { mutateCache: mutateRecommendations }] = fetcherSenders.sendWithNullUpdates(fetcher);

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

  const handleRateUp = e => {
    e.preventDefault();
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
  };

  const handleRateDown = e => {
    e.preventDefault();
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

export default Recommendations; 
