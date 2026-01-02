const { updateProfile, getProfile, getChat } = require("../databaseQueries");
const { Mood, ChatStatus } = require("../prisma/generated/prisma");

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

const getProfileController = async (req, res) => {
    const userId = req.user.id
    const otherUserId = Number(req.params.id)

    if (!otherUserId) {
        const profile = await getProfile(userId, true)

        res.json({
            profile
        })
        return
    }

    const user1Id = Math.min(userId, otherUserId)
    const user2Id = Math.max(userId, otherUserId)

    const chat = await getChat(user1Id, user2Id)

    if (!chat || chat.status != ChatStatus.accepted) {
        const profile = await getProfile(otherUserId)

        if (!profile) {
            res.status(404).json({
                error: {
                    message: "User doesn't exist"
                }
            })
            return
        }

        res.json({
            profile
        })
        return
    }

    const profile = await getProfile(otherUserId, true)
    res.json({
        profile
    })
}

module.exports = {
    updateProfileController,
    getProfileController
}