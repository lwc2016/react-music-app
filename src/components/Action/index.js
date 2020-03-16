import React, { Component } from 'react'
import { history } from "umi";
import { inject, observer } from "mobx-react";
import classname from "classname";
import ReactDOM from "react-dom";
import styles from "./index.less";


class Action extends Component {
    constructor(props){
        super(props);
        this.container = document.createElement("div");
        document.body.appendChild(this.container);
        this.state = {
            status: false
        }
    }
    handleClick = () => {
        const { music: { detail: { id } } } = this.props;
        if(this.state.status) return history.push(`/player/${id}`);
        this.setState({status: true});
        this.timer = setTimeout(() => {
            this.setState({status: false});
        }, 3000);
    }
    componentWillUnmount(){
        clearTimeout(this.timer);
    }
    render() {
        const { music: { detail: { id, imgUrl }}, player: { isPlaying } } = this.props;
        if(!id) return null;
        return ReactDOM.createPortal(
            <div onClick={this.handleClick} className={classname({
                [styles.container]: true,
                [styles.active]: this.state.status
            })}>
                <img className={classname({
                    [styles.avatar]: true,
                    [styles.running]: isPlaying
                })} src={imgUrl} />
            </div>,
            this.container
        )
    }
}

export default  inject(store => ({music: store.music, player: store.player }))(observer(Action));
