"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const find_user_by_property_1 = require("../services/user/find_user_by_property");
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.email;
        const user = yield (0, find_user_by_property_1.findUserByProperty)('email', email);
        if (!user) {
            res.status(403).json({
                success: false,
                error: 'forbidden',
            });
            return;
        }
        if (user.role !== 'admin') {
            res.status(403).json({
                success: false,
                error: 'forbidden',
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.verifyAdmin = verifyAdmin;
