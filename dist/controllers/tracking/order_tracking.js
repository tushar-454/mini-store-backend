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
exports.orderTracking = void 0;
const find_order_by_property_1 = require("../../services/order/find_order_by_property");
const orderTracking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { trackingId } = req.params;
        const order = yield (0, find_order_by_property_1.findOrderByProperty)('tracking_id', trackingId);
        if (!order) {
            res.status(404).json({
                success: false,
                error: 'Resource not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.orderTracking = orderTracking;
