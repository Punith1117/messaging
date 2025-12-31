const { userAlreadyExists, createUser } = require("../databaseQueries");
const { isValidUsername, isValidPassword, hashPassword } = require("../utils");

const signUpController = async (req, res) => {
    const {username, password, casualName} = req.body;
    
    if (await userAlreadyExists(username)) {
        res.status(409).json({ // conflict
            error: {
                message: "Username already exists"
            }
        })
        return
    }

    if (!isValidUsername(username)) {
        res.status(400).json({ // bad request
            error: {
                message: "Username can only contain underscore, letters and numbers"
            }
        })
        return
    }

    if (!isValidPassword(password)) {
        res.status(400).json({
            error: {
                message: "Password cannot be blank or contain spaces"
            }
        })
        return
    }

    const hashedPassword = await hashPassword(password)

    await createUser(username, hashedPassword, casualName)

    res.json({
        username,
        message: "User is successfully created"
    })
}

module.exports = {
    signUpController
}