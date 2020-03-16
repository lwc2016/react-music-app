import React from 'react'
import classname from "classname";
import Item from "./Item";
import styles from "./index.less";

export default ({ visible, onCancel }) => {
    return (
        <div>
            <div className={classname({
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
                    <div></div>
                </div>
                <div className={styles["list"]}>
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </div>
                <div onClick={onCancel} className={styles["footer"]}>关闭</div>
            </div>
        </div>
    )
}
