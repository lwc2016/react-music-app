import { observable, action } from "mobx";

class Player{
    constructor(){
        this.$audio = new Audio();
        this.bindEvent();
    }
    @observable isPlaying = false;   // 是否正在播放：true表示正在播放，false表示暂停播放;
    @observable isReady = false;     // 音乐是否正在加载
    @observable duration = 0;        // 音乐总时长
    @observable currentTime = 0;     // 当前位置

    @action.bound setSrc(src){
        this.initialAudio(src);
    }
    // 播放与暂停
    @action.bound play(){
        // 音乐加载完毕后才能进行播放
        if(this.isReady) return null;
        if(this.isPlaying){
            this.$audio.pause();
        }else{
            this.$audio.play();
        }
        this.isPlaying = !this.isPlaying;
    }
    // 设置当前播放的时间
    @action.bound setCurrentTime(currentTime){
        this.$audio.currentTime = currentTime;
    }
    initialAudio(src){
        this.$audio.src = src;
        this.$audio.load();
        this.isPlaying = false;
        this.isReady = false;
    }
    bindEvent(){
        this.$audio.addEventListener("loadstart", () => {
            console.log("开始请求中");
            this.isReady = true;
        })
        this.$audio.addEventListener("progress", () => {
            console.log("请求中");
        })
        this.$audio.addEventListener("timeupdate", () => {
            console.log("播放时间改变");
            this.currentTime = this.$audio.currentTime;
        })
        this.$audio.addEventListener("error", (error) => {
            console.log(error);
            console.log("文件资源有问题");
        })
        this.$audio.addEventListener("ended", () => {
            console.log("播放结束");
            this.currentTime = 0;
            this.isPlaying = false;
        })
        this.$audio.addEventListener("canplaythrough", () => {
            console.log("加载完毕了");
            this.isReady = false;
            this.duration = this.$audio.duration;
            console.log(this.duration);
        })
    }
    
}

const player = new Player();
export default player;