import React from 'react'
import { inject, observer } from "mobx-react";
import deleteIcon from "../../images/delete.png";
import classname from "classname";
import Item from "./Item";
import styles from "./index.less";

const Logs =  ({ visible, onCancel, user, music, player }) => {
    const { logs, deleteLog, clearLog } = user;
    const { detail: { id }, setDetail } = music;
    // 播放
    const handlePlay = (data) => {
        const { audioUrl } = data;
        const { setSrc, play } = player;
        setDetail(data);
        setSrc(audioUrl);
        play();
    }
    // 删除记录
    const handleDelete = (deleteId) => {
        deleteLog(deleteId);
    }
    // 清空历史记录
    const clearAll = () => {
        clearLog();
    }
    return (
        <div>
            <div onClick={onCancel} className={classname({
                [styles["mask"]]: true,
                [styles["mask-active"]]: visible
            }) }></div>
            <div className={classname({
                [styles["wrapper"]]: true,
                [styles["wrapper-active"]]: visible
            }) }>
                <div className={styles["header"]}>
                    <div className={styles["title"]}>
                        <span>单曲循环</span>
                        <span>（25首）</span>
                    </div>
                    <div className={styles["clear"]} onClick={clearAll}>
                        <img className={styles["clear-icon"]} src={deleteIcon} />
                        <span>清空历史</span>
                    </div>
                </div>
                <div className={styles["list"]}>
                    {logs.map(item => <Item onPlay={handlePlay} onDelete={handleDelete} key={item.id} data={item} currentId={id} />)}
                </div>
                <div onClick={onCancel} className={styles["footer"]}>关闭</div>
            </div>
        </div>
    )
}

export default observer(
    inject(store => ({ user: store.user, music: store.music, player: store.player }))(Logs)
);