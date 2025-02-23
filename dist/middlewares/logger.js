"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, res, next) => {
    const { method, url, headers, body } = req;
    const { statusCode } = res;
    const log = {
        headers,
        body,
        method,
        url,
        statusCode,
    };
    console.log(log);
    next();
};
exports.logger = logger;
