import {createEffect, createSignal, For, Match, Switch} from "solid-js";
import {A, useParams} from "@solidjs/router";
import {useUser} from "../../../../context/providers.js";
import {capitalize, countryNameFromCountryCode, formatMediaFormat, numberCommas} from "../../../../utils/formating.js";
import {DistributionFooterScoped} from "./DistributionFooter.scoped.jsx";

export function StatsDistributionListsScoped(props) {
  const [formats, setFormats] = createSignal();
  const params = useParams();
  const {user} = useUser();

  createEffect(() => {
    setFormats(props.formats.reduce((acc, v) => acc + v.count, 0));
  });

  return (
    <section class="user-profile-stats-formats">
      <div>
        <h2>Format distribution</h2>
        <ol>
          <For each={props.formats}>{format => (
            <li>
              <div>
                <div class="container">
                  <A class="title"
                     href={"/user/" + user().name + "/" + params.type + "/" + "?format=" + format.format}>{formatMediaFormat(format.format)}</A>
                  <p>{format.meanScore || ""}</p>
                </div>
                <DistributionFooterScoped stats={format}/>
              </div>
              <div class="right">
                <p>{(format.count / formats() * 100).toFixed(2)}%</p>
                <p>{numberCommas(format.count)}/{formats()}</p>
              </div>
            </li>
          )}</For>
        </ol>
        <div class="filler"></div>
      </div>
      <div>
        <h2>Status distribution</h2>
        <ol>
          <For each={props.statuses}>{status => (
            <li>
              <div>
                <div class="container">
                  <A class="title" href={"/user/" + user().name + "/" + params.type + "?userStatus=" + status.status}>
                    <Switch fallback={capitalize(status.status)}>
                      <Match when={status.status === "CURRENT"}>
                        <Switch>
                          <Match when={params.type === "anime"}>Watching</Match>
                          <Match when={params.type === "manga"}>Reading</Match>
                        </Switch>
                      </Match>
                      <Match when={status.status === "REPEATING"}>
                        <Switch>
                          <Match when={params.type === "anime"}>Rewatching</Match>
                          <Match when={params.type === "manga"}>Rereading</Match>
                        </Switch>
                      </Match>
                    </Switch>
                  </A>
                  <p>{status.meanScore || ""}</p>
                </div>
                <DistributionFooterScoped stats={status}/>
              </div>
              <div class="right">
                <p>{(status.count / formats() * 100).toFixed(2)}%</p>
                <p>{numberCommas(status.count)}/{formats()}</p>
              </div>
            </li>
          )}</For>
        </ol>
        <div class="filler"></div>
      </div>
      <div>
        <h2>Country distribution</h2>
        <ol>
          <For each={props.countries}>{country => (
            <li>
              <div>
                <div class="container">
                  <A class="title"
                     href={"/user/" + user().name + "/" + params.type + "?countryOfOrigin=" + country.country}>{countryNameFromCountryCode(country.country)}</A>
                  <p>{country.meanScore || ""}</p>
                </div>
                <DistributionFooterScoped stats={country}/>
              </div>
              <div class="right">
                <p>{(country.count / formats() * 100).toFixed(2)}%</p>
                <p>{numberCommas(country.count)}/{formats()}</p>
              </div>
            </li>
          )}</For>
        </ol>
        <div class="filler"></div>
      </div>
    </section>
  );
}
