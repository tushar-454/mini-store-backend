"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const create_category_1 = require("../controllers/category/create_category");
const delete_category_1 = require("../controllers/category/delete_category");
const get_category_1 = require("../controllers/category/get_category");
const update_category_1 = require("../controllers/category/update_category");
const verify_admin_1 = require("../middlewares/verify_admin");
const verify_token_1 = __importDefault(require("../middlewares/verify_token"));
const create_category_2 = require("../validation/category/create_category");
const router = (0, express_1.Router)();
exports.categoryRoutes = router;
router.post('/', verify_token_1.default, verify_admin_1.verifyAdmin, create_category_2.createCategoryValidation, create_category_1.createCategory);
router.get('/', get_category_1.getCategory);
router.put('/:categoryId', verify_token_1.default, verify_admin_1.verifyAdmin, update_category_1.updateCategory);
router.delete('/:categoryId', verify_token_1.default, verify_admin_1.verifyAdmin, delete_category_1.deleteCategory);
