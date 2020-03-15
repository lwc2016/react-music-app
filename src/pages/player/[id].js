import React, { Component } from 'react';
import { inject, observer} from "mobx-react";
import forwardIcon from "../../images/forward.png";
import playIcon from "../../images/play.png";
import backIcon from "../../images/back.png";
import styles from './index.less';

class Player extends Component {
  componentDidMount(){
    const { match: { params: { id }}, fetchDetail } = this.props;
    fetchDetail(id);
  }

  render() {
    const { detail } = this.props;
    return (
      <div className={styles["container"]}>
      <p className={styles["title"]}>{detail.name}</p>
      <p className={styles["singer"]}>{detail.singer}</p>
      <div className={styles["audio-img"]}>
        <img src={detail.imgUrl} />
      </div>
      <div className={styles["progress"]}>
        <div className={styles["line"]}></div>
        <div className={styles["line"] + " " + styles["line-active"]}></div>
        <div className={styles["dot"]}></div>
      </div>
      <div className={styles["operator"]}>
        <div className={styles["operator-item"] + " " + styles["back"]}>
          <img src={backIcon} alt="" />
        </div>
        <div className={styles["operator-item"] + " " + styles["play"]}>
          <img src={playIcon} alt="" />
        </div>
        <div className={styles["operator-item"] + " " + styles["forward"]}>
          <img src={forwardIcon} alt="" />
        </div>
      </div>
    </div>
    )
  }
}

export default inject(store => ({detail: store.music.detail, fetchDetail: store.music.fetchDetail}))(observer(Player));