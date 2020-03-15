import musicList from "./data/music";
export default {
    "/api/music/list": (req, res) => {
        res.send({
            status: 200,
            data: musicList,
            message: "success"
        })
    }
}