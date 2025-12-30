const healthController = (req, res) => {
    res.status(200).json({
        status: 'ok'
    })
}

module.exports = {
    healthController
}