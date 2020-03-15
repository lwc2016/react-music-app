import React, { useState, useEffect } from 'react';
import { Provider } from "mobx-react";
import { Link } from "umi";
import store from "../store";
import loadingImg from "../images/loading.gif";
import styles from "./index.less";

const Initial = () => {
    return (
        <div className={styles.loading}>
            <img className={styles.loading_img} src={loadingImg} />
            <p className={styles.loading_text}>正在加载中...</p>
        </div>
    )
}

const Layout = (props) => {
    const { children } = props;
    return (
        <div>
            <div className={styles.header}>
                <h3 className={styles.brand}>
                    <Link to="/">畅享音乐</Link>
                </h3>
                <div>
                    <Link to="/">登录</Link>
                </div>
            </div>
            <div className={styles.wrapper}>{children}</div>
        </div>
        
    )
}


export default (props) => {
    const [ isLoading, setLoading ] = useState(true);
    const { children } = props
    useEffect(() => {
        const initData = async () => {
            await Promise.all([store.user.fetch(), store.music.fetch()]);
            setLoading(false);
        }
        initData();
    }, [])
    return (
        <Provider {...store}>
            {isLoading ? <Initial /> : <Layout>{children}</Layout>}
        </Provider>
    )
}
