import musicList from "./data/music";
export default {
    "/api/music/list": (req, res) => {
        res.send({
            status: 200,
            data: musicList,
            message: "success"
        })
    },
    "/api/music/detail": (req, res) => {
        const random = Math.floor((Math.random() * musicList.length));
        const music = musicList[random]
        res.send({
            status: 200,
            data: music,
            message: "success"
        })
    }
}