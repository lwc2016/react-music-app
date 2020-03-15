import request from "../config/request";

export const getUserDetail = params => request.get("/api/user/detail", params);