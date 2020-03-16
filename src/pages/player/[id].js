import React, { Component } from 'react';
import { inject, observer} from "mobx-react";
import forwardIcon from "../../images/forward.png";
import playIcon from "../../images/play.png";
import pauseIcon from "../../images/pause.png";
import backIcon from "../../images/back.png";
import styles from './index.less';
import { formatTime } from "../../utils/utils"

class Player extends Component {
  async componentDidMount(){
    // 获取音乐
    const { match: { params: { id }}, music: { fetchDetail } } = this.props;
    await fetchDetail(id);
    const { music: { detail: { audioUrl }}, player: { setSrc }} = this.props;
    setSrc(audioUrl);

    this.moveDot();
  }
  componentDidUpdate(){
    const { player: { duration, currentTime } } = this.props;
    const percent = ( currentTime / duration ) * 100 + "%";
    const clientWidth = this.refs["progress-dot"].clientWidth;
    this.refs["progress-dot"].style.left =`calc(${percent} - ${clientWidth / 2}px)`;
    this.refs["progress-line"].style.width = percent;
  }
  moveDot(){
    $dot = this.refs["progress-dot"];

    
    $dot.addEventListener("touchstart", () => {

    });
    $dot.addEventListener("touchmove", () => {

    });
    $dot.addEventListener("touchup", () => {

    });
  }
  render() {
    const { music: { detail }, player: { play, isPlaying, duration, currentTime } } = this.props;
    return (
      <div className={styles["container"]}>
      <p className={styles["title"]}>{detail.name}</p>
      <p className={styles["singer"]}>{detail.singer}</p>
      <div className={styles["audio-img"]}>
        <img src={detail.imgUrl} />
      </div>
      <div className={styles["progress"]}>
        <div className={styles["line"]}></div>
        <div ref="progress-line" className={styles["line"] + " " + styles["line-active"]}></div>
        <div ref="progress-dot" className={styles["dot"]}></div>
        <div className={styles["time"]}>
          <div className={styles["readTime"]}>{formatTime(currentTime)}</div>
          <div className={styles["totalTime"]}>{formatTime(duration)}</div>
        </div>
      </div>
      <div className={styles["operator"]}>
        <div className={styles["operator-item"] + " " + styles["back"]}>
          <img src={backIcon} alt="" />
        </div>
        <div onClick={play} className={styles["operator-item"] + " " + styles["play"]}>
          <img src={isPlaying ? pauseIcon : playIcon} alt="" />
        </div>
        <div className={styles["operator-item"] + " " + styles["forward"]}>
          <img src={forwardIcon} alt="" />
        </div>
      </div>
    </div>
    )
  }
}

export default inject(store => ({
  music: store.music,     // 音乐对象
  player: store.player    // 播放器对象
}))(observer(Player));