import React, { Component }  from 'react'
import { observer, inject } from "mobx-react";

class Audio extends Component {
    componentDidMount(){
        this.getAudio();
    }
    componentDidUpdate(){
        this.getAudio();
    }
    getAudio(){
        if(this.props.detail.id){
            const $audio = document.getElementById("audio");
            
            // const $audio = this.refs["audio"];
            $audio.addEventListener("loadstart", function(){
                console.log("开始请求中");
            })
            $audio.addEventListener("progress", function(){
                console.log("请求中");
            })
            $audio.addEventListener("timeupdate", function(){
                console.log("播放时间改变");
            })
            $audio.addEventListener("ended", function(){
                console.log("播放结束");
            })
            $audio.addEventListener("canplaythrough", function(){
                console.log("加载完毕了");
                $audio.play();
            })
        }
    }
    render() {
        const { detail: { id, audioUrl } } = this.props;
        return null
    }
}

export default inject(store => ({detail: store.music.detail}))(observer(Audio));