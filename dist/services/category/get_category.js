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
exports.getCategoryService = void 0;
const Category_1 = require("../../models/Category");
const getCategoryService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.find().select({
            createdAt: 0,
            updatedAt: 0,
        });
        return category || [];
    }
    catch (error) {
        console.log('Error in getCategoryService', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
exports.getCategoryService = getCategoryService;
