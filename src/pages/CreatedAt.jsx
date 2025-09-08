import { createSignal, onCleanup, Match } from "solid-js";
import { plural } from "../utils/formating";

export function CreatedAt(props) {
    const [time, setTime] = createSignal(Math.max(1, Math.abs(new Date() / 1000 - props.createdAt)));

    let interval = null;
    if (time() < 60) {
        interval = setInterval(() => setTime(Math.max(1, Math.abs(new Date() / 1000 - props.createdAt))), 1000);
    } else if (time() < 3600) {
        interval = setInterval(() => setTime(Math.max(1, Math.abs(new Date() / 1000 - props.createdAt))), 1000 * 60);
    }

    onCleanup(() => clearInterval(interval));
    return (
        <time
            class="cp-created-at"
            dateTime={(new Date(props.createdAt * 1000)).toISOString()}
            title={(new Date(props.createdAt * 1000)).toLocaleString()}>
            <Switch>
                <Match when={Math.floor(time() / 3600 / 24 / 365.25)} children={years => (<>{years} years{plural(years())} ago </>)} />
                <Match when={Math.floor(time() / 3600 / 24 / 30)} children={months => (<>{months} month{plural(months())} ago </>)} />
                <Match when={Math.floor(time() / 3600 / 24 / 7)} children={weeks => (<>{weeks} week{plural(weeks())} ago </>)} />
                <Match when={Math.floor(time() / 3600 / 24)} children={days => (<>{days} day{plural(days())} ago </>)} />
                <Match when={Math.floor((time() / 3600) % 24)} children={hours => (<>{hours} hour{plural(hours())} ago</>)} />
                <Match when={Math.floor((time() % 3600) / 60)} children={minutes => (<>{minutes} minute{plural(minutes())} ago </>)} />
                <Match when={Math.floor((time() % 3600) % 60)} children={seconds => (<>{seconds} second{plural(seconds())} ago </>)} />
            </Switch>
        </time>
    );
}

