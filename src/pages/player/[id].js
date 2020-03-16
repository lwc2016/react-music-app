import React, { Component } from 'react';
import classname from "classname";
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
    const { match: { params: { id }}, music: { fetchDetail, detail: { audioUrl } }, player: { play, setSrc }} = this.props;
    if(audioUrl){
      setSrc(audioUrl);
      play();
    }else{
      // 判断是否有音乐
      await fetchDetail(id)
      const { music: { detail: { audioUrl: url } } } = this.props;
      setSrc(url);
    }
    this.moveDot();
  }
  componentDidUpdate(){
    const { player: { duration, currentTime } } = this.props;
    const percent = ( currentTime / duration ) * 100 + "%";
    const clientWidth = this.refs["progress-dot"].clientWidth;
    this.refs["progress-dot"].style.left =`calc(${percent} - ${clientWidth / 2}px)`;
    this.refs["progress-line"].style.width = percent;
  }
  moveDot = () => {

    this.$dot = this.refs["progress-dot"];
    this.$line = this.refs["progress-line"];
    this.clientWidth = this.$dot.clientWidth;
    this.progressWidth = this.refs["progress-line"].clientWidth;
    this.startX = 0;
    this.startLeft = 0;
    this.endLeft = 0;

    this.$dot.addEventListener("touchstart", this.touchStart);
    this.$dot.addEventListener("touchmove", this.touchmove);
    this.$dot.addEventListener("touchend", this.touchend);
  }
  touchStart = (event) => {
    const { clientX } = event.changedTouches[0];
    this.startX = clientX;
    this.startLeft = this.$dot.offsetLeft;
  }
  touchmove = (event) => {
    const clientX = event.changedTouches[0].clientX;
    const distance = clientX - this.startX;
    const left = distance + this.startLeft;
    if(left >= - (this.clientWidth / 2) && left <= this.progressWidth - this.clientWidth / 2){
      this.$dot.style.left = left + "px";
      this.$line.style.width = left + "px";
      this.endLeft = left;
    }
  }
  touchend = () => {
    const { player : { duration, setCurrentTime }} = this.props;
    const left = Math.round(this.endLeft);
    const percent = (left + this.clientWidth / 2) / this.progressWidth;
    const currentTime = duration * percent;
    setCurrentTime(currentTime);
  }
  componentWillUnmount(){
    console.log("组件卸载了");
    this.$dot.removeEventListener("touchstart", this.touchStart);
    this.$dot.removeEventListener("touchmove", this.touchmove);
    this.$dot.removeEventListener("touchend", this.touchend);
  }
  render() {
    const { music: { detail }, player: { play, isPlaying, duration, currentTime } } = this.props;
    return (
      <div className={styles["container"]}>
      <p className={styles["title"]}>{detail.name}</p>
      <p className={styles["singer"]}>{detail.singer}</p>
      <div className={classname({
        [styles["audio-img"]]: true,
        [styles["audio-img-active"]]: isPlaying
      })}>
        <img src={detail.imgUrl}  />
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