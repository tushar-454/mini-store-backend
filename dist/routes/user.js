"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const get_users_1 = require("../controllers/user/get_users");
const update_user_1 = require("../controllers/user/update_user");
const verify_admin_1 = require("../middlewares/verify_admin");
const verify_token_1 = __importDefault(require("../middlewares/verify_token"));
const update_user_2 = require("../validation/user/update_user");
const router = (0, express_1.Router)();
exports.usersRoutes = router;
router.get('/', verify_token_1.default, verify_admin_1.verifyAdmin, get_users_1.getUsers);
router.put('/:userId', update_user_2.updateUserValidation, verify_token_1.default, verify_admin_1.verifyAdmin, update_user_1.updateUser);
