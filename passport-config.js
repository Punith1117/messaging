const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { getUserDetails } = require("./databaseQueries");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
        const user = await getUserDetails(jwt_payload.id)

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
  })
);

module.exports = passport;
