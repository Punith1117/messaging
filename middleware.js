const passport = require('./passport-config')

const protected = passport.authenticate('jwt', {session: false})

module.exports = {
    protected
}