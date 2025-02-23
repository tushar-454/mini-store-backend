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
exports.updateOrder = void 0;
const find_order_by_property_1 = require("../../services/order/find_order_by_property");
const find_product_by_property_1 = require("../../services/product/find_product_by_property");
const updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const { status, is_deleted } = req.body;
        const order = yield (0, find_order_by_property_1.findOrderByProperty)('_id', orderId);
        if (!order) {
            res.status(400).json({
                success: false,
                error: 'Resource not found',
            });
            return;
        }
        order.status = status !== null && status !== void 0 ? status : order.status;
        order.is_deleted = is_deleted !== null && is_deleted !== void 0 ? is_deleted : order.is_deleted;
        yield order.save();
        // update product sell count
        if (status === 'delivered') {
            const productQuantities = order.line_items.reduce((acc, lineItem) => {
                const productId = lineItem.product_id.toString();
                if (!acc[productId]) {
                    acc[productId] = 0;
                }
                acc[productId] += lineItem.quantity;
                return acc;
            }, {});
            const updateProductPromises = Object.entries(productQuantities).map((_a) => __awaiter(void 0, [_a], void 0, function* ([productId, quantity]) {
                const product = yield (0, find_product_by_property_1.findProductByProperty)('_id', productId);
                if (product) {
                    product.sell_count += quantity;
                    return product.save();
                }
            }));
            yield Promise.all(updateProductPromises);
        }
        res.status(200).json({
            success: true,
            message: 'Resource updated',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrder = updateOrder;
