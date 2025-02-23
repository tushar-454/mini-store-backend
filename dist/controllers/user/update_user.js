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
exports.updateUser = void 0;
const find_user_by_property_1 = require("../../services/user/find_user_by_property");
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { name, phone, photo, role, status, is_deleted } = req.body;
        const user = yield (0, find_user_by_property_1.findUserByProperty)('_id', userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }
        user.name = name !== null && name !== void 0 ? name : user.name;
        user.phone = phone !== null && phone !== void 0 ? phone : user.phone;
        user.photo = photo !== null && photo !== void 0 ? photo : user.photo;
        user.role = role !== null && role !== void 0 ? role : user.role;
        user.status = status !== null && status !== void 0 ? status : user.status;
        user.is_deleted = is_deleted !== null && is_deleted !== void 0 ? is_deleted : user.is_deleted;
        yield user.save();
        res.status(200).json({
            success: true,
            message: 'Resource updated',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
