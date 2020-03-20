const db = require("../../config/db");
const generatePassword = require("../utils/generatePassword");

// 登录
exports.login = async (ctx, next) => {
    const { name, password } = ctx.request.body;
    const _password = generatePassword(password);
    const [ user ] = await db.query("select id, name, nickName, createdTime from users_table where name=? and password=?", [name, _password]);
    if(user){
        ctx.session.user = user;
        ctx.body = {status: 200, data: user, message: ""};
    }else{
        ctx.body = {status: 400, message: "用户名或密码错误！"};
    }
}

// 注册
exports.register = async (ctx, next) => {
    const { name, password, nickName } = ctx.request.body;
    const _password = generatePassword(password);
    try{
        await db.query("insert into users_table (name, nickName, password) values (?, ?, ?)", [name, nickName, _password]);
        ctx.body = { status: 200, data: "", message: "" };
    }catch(error){
        ctx.body = { status: 500, message: "数据库错误" }
    }
};

// 退出登录
exports.logout = (ctx, next) => {
    ctx.session.user = null;
    ctx.body = {status: 200, data: "", message: ""};
};

// 详情
exports.detail = (ctx, next) => {
    ctx.body = { status: 200, data: ctx.session.user }
};