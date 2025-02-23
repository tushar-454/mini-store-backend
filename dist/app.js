"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
// express app
const app = (0, express_1.default)();
exports.app = app;
(0, middlewares_1.applyMiddleware)(app);
app.get('/', (_req, res) => {
    res.status(200).json({ message: 'Ok' });
});
app.get('/health', (_req, res) => {
    res.status(200).json({ message: 'Server health Ok' });
});
