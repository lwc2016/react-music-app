const db = require("../../config/db");
const { PAGE_SIZE } = require("../../config/page");

// 添加收藏
exports.add = async (ctx, next) => {
    const { id } = ctx.session.user;
    const { musicId } = ctx.request.body;
    const [ collection ] = await db.query("select * from collections_table  where user_id=? and music_id=?", [id, musicId]);
    if(collection){
        return ctx.body = {code: 200, result: ""};
    }
    try{
        await db.query("insert into collections_table (user_id, music_id) values (?, ?)", [id, musicId]);
        ctx.body = {code: 200, data: ""}
    }catch(error){
        ctx.body = {code: 500, message: "数据库错误"};
    }
};

// 删除收藏
exports.delete = async (ctx, next) => {
    const { id : userId } = ctx.session.user;
    const { id : collectionId } = ctx.request.body;
    try{
        await db.query("update collections_table set isValid = 0 where id = ? and user_id = ?", [collectionId, userId]);
        console.log("ok");
        ctx.body = { status: 200, data: "" }
    }catch(err){
        ctx.body = { status: 500, message: "数据库错误"};
    }
    
};

// 获取收藏的歌曲
exports.list = async (ctx, next) => {
    const { id } = ctx.session.user;
    const { pageNo = 1, pageSize = PAGE_SIZE } = ctx.request.body;
    const start = (pageNo - 1) * pageSize;
    const end = pageSize;
    const list = await db.query(`
        select musics_table.id, 
        musics_table.name, 
        musics_table.singer, 
        musics_table.audioUrl, 
        musics_table.imgUrl, 
        collections_table.id as collectionId,
        musics_table.createdTime
        from musics_table
        left join collections_table on musics_table.id = collections_table.music_id where user_id = ? and collections_table.isValid = 1 order by id limit ?, ?;`, [id, start, end]);
    ctx.body = { status: 200, data: list }
}