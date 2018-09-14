"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authenticationMiddleware(req, res, next) {
    console.log(req.originalUrl);
    if (req.isAuthenticated()) {
        return next();
    }
    else if (req.originalUrl === '/api/me') {
        return next();
    }
    res.sendStatus(401);
}
exports.default = authenticationMiddleware;
//# sourceMappingURL=middleware.js.map