const Router = require("koa-router");
const router = new Router({prefix: "/api"});
const userController = require("../controllers/user.controller");
const musicController = require("../controllers/music.controller");
const collectionController = require("../controllers/collection.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validatorMiddleware = require("../middlewares/validator.middleware");

module.exports = (app) => {
    // 用户相关路由
    router.post("/user/login",  validatorMiddleware({
        name: [{required: true, message: "请填写用户名！"}],
        password: [{required: true, message: "请填写密码！"}]
    }), userController.login);
    router.post("/user/register", validatorMiddleware({
        name: [{required: true, message: "请填写用户名！"}],
        nickName: [{required: true, message: "请填写昵称！"}],
        password: [{required: true, message: "请填写密码！"}]
    }), userController.register);
    router.post("/user/logout", userController.logout);
    router.all("/user/detail", authMiddleware, userController.detail);

    // 歌曲相关
    router.get("/music/list", musicController.query);

    // 收藏相关
    router.post("/collection/add", validatorMiddleware({
        musicId: [{required: true, message: "请选择歌曲"}]
    }), authMiddleware, collectionController.add);
    // 收藏列表
    router.post("/collection/list", authMiddleware, collectionController.list);
    // 取消收藏
    router.post("/collection/delete",validatorMiddleware({
        id: [{required: true, message: "缺少必要参数"}]
    }), authMiddleware, collectionController.delete);

    app.use(router.routes())
       .use(router.allowedMethods());
};