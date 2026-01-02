const { getUsers } = require("../databaseQueries")

const getUsersController = async (req, res) => {
    const userId = req.user.id
    const query = req.query.q

    if (!query || query.trim() === "") {
        return res.status(400).json({
            error: {
                message: "Query cannot be empty"
            }
        })
    }

    const users = await getUsers(userId, query)

    res.json({
        users
    })
}

module.exports = {
    getUsersController
}