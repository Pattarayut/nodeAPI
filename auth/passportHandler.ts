import passport from "passport";
import config from "../config/index";
import passportJwt from "passport-jwt";
import User from "../models/User";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET,
    },
    function (jwtToken, done) {
      User.findOne(
        { username: jwtToken.username },
        function (err: any, user: boolean | Express.User | undefined) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(undefined, user, jwtToken);
          } else {
            return done(undefined, false);
          }
        }
      );
    }
  )
);
