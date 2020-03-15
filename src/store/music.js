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
        const result = this.list.find(item => item.id === id);
        if(result) return this.detail = result;
        this.detail = await getMusicDetail({id});
    }
}

// 实例化music
const music = new Music();
// 导出music
export default music;