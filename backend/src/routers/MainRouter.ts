import * as express from 'express';
import * as path from 'path';

const mainRouter = express.Router();
const apiRegExp = /^\/api/;
const staticRegExp = /^\/static/;

mainRouter.get('*', function (req, res, next) {
    if (!apiRegExp.test(req.originalUrl)) {
        if(!staticRegExp.test(req.originalUrl)) {
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

export default mainRouter;