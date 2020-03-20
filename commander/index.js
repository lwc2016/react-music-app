const db = require("../config/db");
const data = require("./song-data");

const addSong = async (data=[]) => {
    for(let i = 0; i < data.length; i ++){
        const { name, singer, audioUrl, imgUrl } = data[i];
        await db.query(`insert into musics_table (name, singer, audioUrl, imgUrl ) values (?, ?, ?, ?)`, [name, singer, audioUrl, imgUrl]);
    }
};

addSong(data);