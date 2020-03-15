import request from "../config/request";

// 获取音乐列表
export const getMusicList = params => request.get("/api/music/list", params);