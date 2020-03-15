import request from "../config/request";

// 获取音乐列表
export const getMusicList = params => request.get("/api/music/list", params);

// 获取音乐详情
export const getMusicDetail = params => request.get("/api/music/detail", params);