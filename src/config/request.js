import axios from "axios";

const request = axios.create({
    baseUrl: "/",
    headers: {
        "Content-type": "application/x-www-form-urlencoded"
    }
});

// 处理请求
request.interceptors.request.use(req => req);

// 处理响应
request.interceptors.response.use(res => {
    console.log(res.data);
    let { status, data, message } = res.data;
    if(status !== 200){
        return Promise.reject(message);
    }
    return data;
}, (error) => {
    return Promise.reject(error);
})

export default request;