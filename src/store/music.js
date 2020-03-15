import { action, observable } from "mobx";
import { getMusicList } from "../api/music";
class Music{

    // 音乐列表
    @observable list = [];

    // 获取音乐列表
    @action async fetch(){
        this.list = await getMusicList();
    }
}

// 实例化music
const music = new Music();
// 导出music
export default music;