const { updateProfile } = require("../databaseQueries");
const { Mood } = require("../prisma/generated/prisma");

const updateProfileController = async (req, res) => {
    const userId = req.user.id
    let casualName = req.body.casualName
    const mood = req.body.mood

    if (!casualName.trim()) casualName = null;

    if (!Object.values(Mood).includes(mood)) {
        res.status(400).json({
            error: {
                message: "Invalid mood value"
            }
        })
        return
    }

    await updateProfile(userId, {casualName, mood})

    res.json({
        message: "Profile successfully updated"
    })
}

module.exports = {
    updateProfileController
}