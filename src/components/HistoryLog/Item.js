import React from 'react';
import playingIcon from "../../images/playing.gif"
import deleteIcon from "../../images/delete.png";
import styles from "./Item.less";

export default function Item({ data, currentId, onPlay, onDelete }) {
    const { id, name } = data;
    return (
        <div className={styles["container"]}>
            <div onClick={onPlay.bind(null, data)}>
                {currentId == id ? <img className={styles["play-icon"]} src={playingIcon} />: null}
                <span className={styles["name"]}>{name}</span>
            </div>
            <div onClick={onDelete.bind(null, id)} className={styles["delete"]}>
                <img className={styles["delete-icon"]} src={deleteIcon} />
            </div>
        </div>
    )
}
