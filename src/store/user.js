import { observable, autorun, action } from "mobx";
import { getUserDetail } from "../api/user";
class User{
    @observable data = {};

    // 获取用户详情
    @action async fetch(){
        this.data = await getUserDetail();
    }
}

// 实例化user
const user = new User();
// 返回user对象
export default user;