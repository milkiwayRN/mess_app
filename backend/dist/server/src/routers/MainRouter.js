"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const mainRouter = express.Router();
const apiRegExp = /^\/api/;
const staticRegExp = /^\/static/;
mainRouter.get('*', function (req, res, next) {
    if (!apiRegExp.test(req.originalUrl)) {
        if (!staticRegExp.test(req.originalUrl)) {
            res.sendFile(path.resolve('./static/index.html'));
        }
        else {
            next();
        }
    }
    else {
        next();
    }
});
exports.default = mainRouter;
//# sourceMappingURL=MainRouter.js.map