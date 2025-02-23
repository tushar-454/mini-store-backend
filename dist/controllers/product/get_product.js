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
exports.getProduct = void 0;
const get_product_1 = require("../../services/product/get_product");
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { is_featured, is_deleted, sell_count, is_upcoming, category, min_price, max_price } = req.query;
        const products = yield (0, get_product_1.getProductService)({ is_featured, is_deleted, sell_count, is_upcoming, category, min_price, max_price });
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        next(error);
    }
});
exports.getProduct = getProduct;
