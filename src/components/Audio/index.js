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
            console.log("ok");
            this.audio = this.refs["audio"];
            // this.audio.load();
            this.audio.play();
        }
    }
    render() {
        const { detail: { id, audioUrl } } = this.props;
        console.log(id);
        console.log(audioUrl);
        return (
            <audio ref="audio">
                <source src={audioUrl} />
            </audio>
        )
    }
}

export default inject(store => ({detail: store.music.detail}))(observer(Audio));