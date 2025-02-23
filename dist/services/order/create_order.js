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
exports.createOrderService = void 0;
const Order_1 = require("../../models/Order");
const createOrderService = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, line_items, price, discount, shipping, division, district, sub_district, address, coupon_code, coupon_discount, tracking_id, instruction } = order;
    try {
        const new_order = yield Order_1.Order.create({
            name,
            email,
            phone,
            line_items,
            price,
            discount,
            shipping,
            division,
            district,
            sub_district,
            address,
            coupon_code,
            coupon_discount,
            tracking_id,
            instruction,
        });
        yield new_order.save();
        return new_order;
    }
    catch (error) {
        console.error('Error creating order:', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
exports.createOrderService = createOrderService;
