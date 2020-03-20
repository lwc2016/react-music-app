module.exports = async (ctx, next) => {
    if(ctx.session.user && ctx.session.user.id){
        await next();
    }else{
        ctx.body = {status: 401, errorMsg: "请登录"};
    }
};