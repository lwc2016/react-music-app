import { action, observable } from "mobx";
import { getMusicList, getMusicDetail } from "../api/music";
class Music{

    // 音乐列表
    @observable list = [];

    // 音乐详情
    @observable detail = {};

    // 获取音乐列表
    @action.bound async fetch(){
        this.list = await getMusicList();
    }

    // 获取音乐详情
    @action.bound async fetchDetail(id){
        this.detail = await getMusicDetail({id});
    }

    // 设置详情
    @action.bound setDetail(detail){
        this.detail = detail;
    }
}

// 实例化music
const music = new Music();
// 导出music
export default music;