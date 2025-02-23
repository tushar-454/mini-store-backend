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
exports.createUser = void 0;
const create_user_1 = require("../../services/user/create_user");
const find_user_by_property_1 = require("../../services/user/find_user_by_property");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, photo } = req.body;
        const existing_user = yield (0, find_user_by_property_1.findUserByProperty)('email', email);
        if (existing_user) {
            res.status(409).json({
                success: false,
                message: 'User already exists',
            });
            return;
        }
        const new_user = yield (0, create_user_1.createUserService)({ name, email, photo });
        const user = new_user === null || new_user === void 0 ? void 0 : new_user.toObject();
        delete user.password;
        delete user.is_deleted;
        delete user.createdAt;
        delete user.updatedAt;
        res.status(201).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        console.error('Error creating user:', error);
        next(error);
    }
});
exports.createUser = createUser;
