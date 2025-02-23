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
exports.updateCategory = void 0;
const find_category_by_property_1 = require("../../services/category/find_category_by_property");
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const { name, photo } = req.body;
        const category = yield (0, find_category_by_property_1.findCategoryByProperty)('_id', categoryId);
        if (!category) {
            res.status(400).json({
                success: false,
                error: 'Resource not found',
            });
            return;
        }
        category.name = name !== null && name !== void 0 ? name : category.name;
        category.photo = photo !== null && photo !== void 0 ? photo : category.photo;
        yield category.save();
        res.status(200).json({
            status: true,
            message: 'Resource updated',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCategory = updateCategory;
