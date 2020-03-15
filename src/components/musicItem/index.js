import React from 'react'
import collectionIcon from "../../images/collection-icon.png";
import collectionActiveIcon from "../../images/collection-active-icon.png";
import styles from "./index.less";

export default function MusicItem({id, imgUrl, singer, name}) {
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={imgUrl} />
            <div className={styles.content}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.author}>{singer}</p>
            </div>
            <div className={styles.collection}>
                <img className={styles.collection_icon} src={collectionIcon} />
            </div>
        </div>
    )
}
