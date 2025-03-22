import style from "../../pages/AnimeInfo.module.scss";

const Scores = (props) => {
  return (
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
  );
};

export default Scores; 