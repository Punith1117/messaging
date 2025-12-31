const { userAlreadyExists, createUser, getUserAuthDetails } = require("../databaseQueries");
const { isValidUsername, isValidPassword, hashPassword, comparePassword, getNewToken } = require("../utils");

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

const loginController = async (req, res) => {
    const { username, password } = req.body
    
    const user = await getUserAuthDetails(username);

    if (!user) {
        res.status(401).json({ // unauthorized
            error: {
                message: "Invalid username or password"
            }
        })
        return
    }

    const correctPassword = await comparePassword(password, user.password)

    if (!correctPassword) {
        res.status(401).json({ // unauthorized
            error: {
                message: "Invalid username or password"
            }
        })
        return
    }

    const token = getNewToken({id: user.id, username: user.username}) // sending payload

    res.json({
        message: `${user.username} is successfully authenticated for 5 mins`,
        token
    })
}

module.exports = {
    signUpController,
    loginController
}