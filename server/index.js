const koa = require("koa");
const session = require("koa-session");
const bodyParser = require("koa-bodyparser");
const app = new koa();
const routes = require("./routes");

// 注册中间件
app.use(bodyParser());
app.keys = ["music-server-app"];
const CONFIG = {
    key: 'koa:sess', 
    maxAge: 24 * 60 * 60 * 1000,
    autoCommit: true, 
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false, 
    sameSite: null
};
app.use(session(CONFIG, app));

// 注册路由
routes(app);

// 启动服务
app.listen(3030, () => {
    console.log("server is running at port: 3030");
})