"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalError = (err, _req, res, _next) => {
    var _a, _b;
    const error = (_a = err.message) !== null && _a !== void 0 ? _a : 'Server Internal Error';
    const status = (_b = err.status) !== null && _b !== void 0 ? _b : 500;
    res.status(status).json({ status, error });
};
exports.default = globalError;
