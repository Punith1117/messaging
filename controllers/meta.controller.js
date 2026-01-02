const { Mood } = require("../prisma/generated/prisma")

const getMoodsController = (req, res) => {
    
    const moods = Object.values(Mood)

    res.json({
        moods
    })
}

module.exports = {
    getMoodsController
}