import { observable, autorun, action } from "mobx";
import { getUserDetail } from "../api/user";
class User{
    constructor(){
        // 获取历史记录
        this.getLogs();
    }
    @observable data = {};

    // 获取用户详情
    @action async fetch(){
        this.data = await getUserDetail();
    }

    // 获取用户历史记录
    getLogs = () => {
        let logs = localStorage.getItem("logs");
        try{
            this.logs = logs ? JSON.parse(logs) : [];
        }catch(error){
            this.logs = [];
        } 
    }
    // 设置
    setStorage = () => {
        localStorage.setItem("logs", JSON.stringify(this.logs));
    }
    // 清除
    clearStorage = () => {
        localStorage.removeItem("logs");
    }

    // 添加历史记录
    @action.bound addLog(detail){
        // 判断是否存在历史记录中
        if(!this.logs.find(item => item.id == detail.id)){
            this.logs.push(detail);
            this.setStorage();
        }
    }
    // 删除历史记录
    @action.bound deleteLog(id){
        console.log(id);
        this.logs = [...this.logs.filter(item => item.id != id)];
        console.log(this.logs);
        // this.setStorage();
    }
    // 清空所有记录
    @action.bound clearLog(){
        this.logs = this.logs.filter(item => !item.id);
        // this.clearStorage();
    }
}

// 实例化user
const user = new User();
// 返回user对象
export default user;