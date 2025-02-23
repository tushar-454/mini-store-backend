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
exports.updateProduct = void 0;
const find_product_by_property_1 = require("../../services/product/find_product_by_property");
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { category, description, discount, images, is_deleted, is_featured, is_upcoming, name, rating, sell_count, price, status, stock, variants } = req.body;
        const product = yield (0, find_product_by_property_1.findProductByProperty)('_id', productId);
        if (!product) {
            res.status(400).json({
                success: false,
                error: 'Resource not found',
            });
            return;
        }
        product.category = category !== null && category !== void 0 ? category : product.category;
        product.description = description !== null && description !== void 0 ? description : product.description;
        product.discount = discount !== null && discount !== void 0 ? discount : product.discount;
        product.images = images !== null && images !== void 0 ? images : product.images;
        product.is_deleted = is_deleted !== null && is_deleted !== void 0 ? is_deleted : product.is_deleted;
        product.is_featured = is_featured !== null && is_featured !== void 0 ? is_featured : product.is_featured;
        product.is_upcoming = is_upcoming !== null && is_upcoming !== void 0 ? is_upcoming : product.is_upcoming;
        product.name = name !== null && name !== void 0 ? name : product.name;
        product.rating = rating !== null && rating !== void 0 ? rating : product.rating;
        product.sell_count = sell_count !== null && sell_count !== void 0 ? sell_count : product.sell_count;
        product.price = price !== null && price !== void 0 ? price : product.price;
        product.status = status !== null && status !== void 0 ? status : product.status;
        product.stock = stock !== null && stock !== void 0 ? stock : product.stock;
        product.variants = variants !== null && variants !== void 0 ? variants : product.variants;
        product.slug = name ? name.toLowerCase().replace(/ /g, '-') : product.slug;
        yield product.save();
        res.status(200).json({
            status: true,
            message: 'Resource updated',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProduct = updateProduct;
