"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMiddleware = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const logger_1 = require("../middlewares/logger");
const routes_1 = __importDefault(require("../routes"));
const global_error_1 = require("./global_error");
const CLIENT_URL = process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL_PROD : process.env.NODE_ENV === 'development' ? process.env.CLIENT_URL_DEV : '';
const applyMiddleware = (app) => {
    app.use((0, cors_1.default)({
        origin: CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(logger_1.logger);
    app.use(routes_1.default);
    app.use(global_error_1.globalError);
};
exports.applyMiddleware = applyMiddleware;
