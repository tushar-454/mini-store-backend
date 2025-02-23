"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(403).json({
            success: false,
            error: 'unauthorized',
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded !== 'string' && 'email' in decoded) {
            req.email = decoded.email;
            next();
        }
    }
    catch (error) {
        next(error);
    }
};
exports.default = verifyToken;
