import React from 'react'
import { inject, observer } from "mobx-react";
import { history } from "umi"
import collectionIcon from "../../images/collection-icon.png";
import collectionActiveIcon from "../../images/collection-active-icon.png";
import styles from "./index.less";
import { History } from 'history';

const MusicItem = ({id, imgUrl, singer, name, audioUrl, music}) => {
    const handleLink = () => {
        music.setDetail({id, imgUrl, singer, name, audioUrl});
        history.push(`/player/${id}`);
    }
    return (
        <div className={styles.container}>
            <div onClick={handleLink}>
                <img className={styles.logo} src={imgUrl} />
            </div>
            <div onClick={handleLink} className={styles.content}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.author}>{singer}</p>
            </div>
            <div className={styles.collection}>
                <img className={styles.collection_icon} src={collectionIcon} />
            </div>
        </div>
    )
}

export default inject(store => ({
    music: store.music
}))(observer(MusicItem));