"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const middleware_1 = require("../authentication/middleware");
function initApiRouter(passport) {
    const api = express.Router();
    api.all('*', middleware_1.default, function (req, res, next) {
        next();
    });
    api.get('/me', (req, res) => {
        if (req.isAuthenticated()) {
            res.json({ username: req.user.username });
        }
        else {
            res.send(401);
        }
    });
    api.post('/me', passport.authenticate('local'), (req, res) => {
        res.json({ username: req.user.username });
    });
    return api;
}
exports.default = initApiRouter;
//# sourceMappingURL=ApiRouter.js.map