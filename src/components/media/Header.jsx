import style from "../../pages/AnimeInfo.module.scss";

const Header = (props) => {
  return (
    <>
      <div class={style.scoresWrapper}>
        <div class={style.scoreBox}>
          <p class={style.scoreLabel}>Mean</p>
          <span class={style.scoreValue}>{((props.meanScore || 0) / 10).toFixed(1)}</span>
        </div>
        <div class={style.scoreBox}>
          <p class={style.scoreLabel}>Average</p>
          <span class={style.scoreValue}>{((props.averageScore || 0) / 10).toFixed(1)}</span>
        </div>
      </div>
      <div class={style.statsWrapper}>
        <div class={style.statColumn}>
          <p class={style.statRow}>
            <span>Total Users</span>
            <span>{Intl.NumberFormat("ja-JP").format(props.stats.scoreDistribution.reduce((acc, v) => v.amount + acc, 0))}</span>
          </p>
          <p class={style.statRow}>
            <span>Source</span>
            <span>{props.source}</span>
          </p>
          <p class={style.statRow}>
            <span>Members</span>
            <span>{Intl.NumberFormat("ja-JP").format(props.popularity)}</span>
          </p>
        </div>
        <div class={style.statColumn}>
          <p class={style.statRow}>
            <span>Episodes</span>
            <span>{props.episodes}</span>
          </p>
          <p class={style.statRow}>
            <span>Season</span>
            <span>{props.season} {props.seasonYear}</span>
          </p>
          <p class={style.statRow}>
            <span>Format</span>
            <span>{props.format}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Header; 
