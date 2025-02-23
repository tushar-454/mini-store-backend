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
exports.getUsersService = void 0;
const User_1 = require("../../models/User");
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find().select({
            password: 0,
            createdAt: 0,
            updatedAt: 0,
        });
        return users || [];
    }
    catch (error) {
        console.log('Error in getUsersService', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
exports.getUsersService = getUsersService;
