"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const args = require("args-parser")(process.argv);
console.log(args.REDIS_STORE_URI);
console.log(args.REDIS_STORE_SECRET);
const config = {
    redisStore: {
        url: args.REDIS_STORE_URI,
        secret: args.REDIS_STORE_SECRET,
    },
};
exports.default = config;
//# sourceMappingURL=config.js.map