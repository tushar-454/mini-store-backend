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
exports.getProductService = void 0;
const Product_1 = require("../../models/Product");
const getProductService = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { is_featured, is_deleted, sell_count, is_upcoming, category, min_price, max_price } = props;
    const categories = category === null || category === void 0 ? void 0 : category.split(',');
    try {
        const query = {};
        if (is_featured)
            query.is_featured = is_featured;
        if (is_deleted)
            query.is_deleted = is_deleted;
        if (sell_count)
            query.sell_count = { $gte: +sell_count };
        if (is_upcoming)
            query.is_upcoming = is_upcoming;
        if (category && Array.isArray(categories))
            query.category = { $in: categories };
        const convert_min_price = Number(min_price || 0);
        const convert_max_price = Number(max_price || 0);
        if (convert_min_price && convert_max_price) {
            query.price = { $gte: convert_min_price, $lte: convert_max_price };
        }
        else if (convert_min_price) {
            query.price = { $gte: convert_min_price };
        }
        else if (convert_max_price) {
            query.price = { $lte: convert_max_price };
        }
        const products = yield Product_1.Product.find(query)
            .sort({ createdAt: -1 })
            .select({
            variants: 0,
            createdAt: 0,
            updatedAt: 0,
        });
        return products || [];
    }
    catch (error) {
        console.log('Error in getProductService', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
exports.getProductService = getProductService;
