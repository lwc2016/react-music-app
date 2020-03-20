export default {
    "/api/user/detail": (req, res) => {
        setTimeout(() => {
            res.send({
                status: 200,
                message: "success",
                data: {
                    id: 12,
                    name: "harry",
                    age: 21
                }
            })
        }, 800);
    }
}