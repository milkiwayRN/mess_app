const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

function initJWTStrategy() {
  return new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
  },
    function (jwtPayload: any, cb: Function) {
      //find the user in db if needed. This functionality may be
      //omitted if you store everything you'll need in JWT payload.
      return cb(null, jwtPayload);
    }
  );
}

export default initJWTStrategy;