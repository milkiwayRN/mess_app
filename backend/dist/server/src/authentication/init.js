"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
// Generate Password
const saltRounds = 10;
const myPlaintextPassword = 'my-password';
const salt = bcrypt.genSaltSync(saltRounds);
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt);
;
const user = {
    username: 'test-user',
    passwordHash,
    id: 1
};
function findUser(username, callback) {
    if (username === user.username) {
        return callback(null, user);
    }
    return callback(null);
}
passport.serializeUser(function (user, cb) {
    cb(null, user.username);
});
passport.deserializeUser(function (username, cb) {
    findUser(username, cb);
});
function initPassportStrategy() {
    console.log('STR VER 1');
    return (new LocalStrategy({
        usernameField: 'email',
        passwordField: 'passwd',
    }, (username, password, done) => {
        console.log(username, password);
        findUser(username, (err, user) => {
            if (err) {
                return done(err);
            }
            // User not found
            if (!user) {
                console.log('User not found');
                return done(null, false);
            }
            // Always use hashed passwords and fixed time comparison
            bcrypt.compare(password, user.passwordHash, (err, isValid) => {
                if (err) {
                    return done(err);
                }
                if (!isValid) {
                    return done(null, false);
                }
                return done(null, user);
            });
        });
    }));
}
exports.default = initPassportStrategy;
//# sourceMappingURL=init.js.map