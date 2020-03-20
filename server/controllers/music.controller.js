const db = require("../../config/db");
const { PAGE_SIZE } = require("../../config/page");

exports.query = async (ctx, next) => {
    const { pageNo = 1, pageSize = PAGE_SIZE } = ctx.query;
    const start = (pageNo - 1) * pageSize;
    const end = pageSize;
    let list = [];
    // 判断是否登录
    if(ctx.session.user && ctx.session.user.id){
        const userId = ctx.session.user.id;
        list = await db.query(`
        select musics_table.id, 
        musics_table.name, 
        musics_table.singer, 
        musics_table.audioUrl, 
        musics_table.imgUrl, 
        collections_table.id as collectionId,
        musics_table.createdTime
        from musics_table
        left join collections_table on musics_table.id = collections_table.music_id and user_id = ? and collections_table.isValid = 1 order by musics_table.id limit ?, ? ;`, [userId, start, end]);
    }else {
        list = await db.query("select * from musics_table limit ?, ?", [start, end]);
    }
    ctx.body = {
        status: 200,
        result: list,
        errorMsg: ""
    }
};