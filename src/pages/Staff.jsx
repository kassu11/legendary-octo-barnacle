import { A, useParams } from "@solidjs/router";
import api from "../utils/api";
import { Switch, Match, Show, createSignal } from "solid-js";
import { Markdown } from "../components/Markdown";
import "./Staff.scss";
import { assert } from "../utils/assert";
import { formatAnilistDate, formatTimeToDate, formatTitleToUrl } from "../utils/formating";
import { useAuthentication } from "../context/AuthenticationContext";
import { FavouriteToggle } from "../components/FavouriteToggle";


function Staff() {
  const params = useParams();
  const { accessToken } = useAuthentication();
  const [staffInfo] = api.anilist.staffInfoById(() => params.id);
  const [favourite, setFavourite] = createSignal();
  // const [staffCharacters] = api.anilist.staffCharactersById(accessToken, () => params.id);
  // const [staffAnime] = api.anilist.staffMediaById(accessToken, () => params.id, "ANIME");
  // const [staffManga] = api.anilist.staffMediaById(accessToken, () => params.id, "MANGA");

  return (
    <div class="staff-page">
      <Show when={staffInfo()}>
        <div className="staff-page-header">
          <img src={staffInfo().data.image.large} class="cover" alt="Staff profile" />
          <div className="row">
            <h1>{staffInfo().data.name.userPreferred}</h1>
            <p class="staff-page-alternative-names">{[staffInfo().data.name.native, ...staffInfo().data.name.alternative].join(", ")}</p>
            <FavouriteToggle 
              checked={favourite()} 
              staffId={params.id} 
              favourites={staffInfo().data.favourites} 
              onChange={setFavourite} 
              mutateCache={(isFavourite) => {
                // mutates()?.setIsFavourite?.(isFavourite);
                console.log("Add mutation later");
              }} 
            />
          </div>
          <ul class="description">
            <Show when={staffInfo().data.dateOfBirth}>
              <li><strong>Birth:</strong> {formatAnilistDate(staffInfo().data.dateOfBirth)}</li>
            </Show>
            <Show when={staffInfo().data.age}>
              <li><strong>Age:</strong> {staffInfo().data.age}</li>
            </Show>
            <Show when={staffInfo().data.gender}>
              <li><strong>Age:</strong> {staffInfo().data.gender}</li>
            </Show>
            <Show when={staffInfo().data.yearsActive}>
              <li>
                <strong>Age:</strong> 
                {staffInfo().data.yearsActive.join("-")}
                <Switch>
                  <Match when={staffInfo().data.dateOfDeath.year && staffInfo().data.yearsActive.at(-1) !== staffInfo().data.dateOfDeath.year}>
                    -{staffInfo().data.dateOfDeath.year}
                  </Match>
                  <Match when={staffInfo().data.dateOfDeath.year == null}>
                    -Present
                  </Match>
                </Switch>
              </li>
            </Show>
            <Show when={staffInfo().data.homeTown}>
              <li><strong>Home town:</strong> {staffInfo().data.homeTown}</li>
            </Show>
            <Show when={staffInfo().data.bloodType}>
              <li><strong>Blood type:</strong> {staffInfo().data.bloodType}</li>
            </Show>
            <Show when={staffInfo().data.description}>
              <li>
                <Markdown>{staffInfo().data.description}</Markdown>
              </li>
            </Show>
          </ul>
        </div>
      </Show>
      {console.log(staffInfo())}
    </div>
  )
}

export default Staff
