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
exports.createOrder = void 0;
const find_coupon_by_property_1 = require("../../services/coupon/find_coupon_by_property");
const create_order_1 = require("../../services/order/create_order");
const find_product_by_property_1 = require("../../services/product/find_product_by_property");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address, district, division, sub_district, line_items, coupon_code, name, email, phone, instruction } = req.body;
        const populate_line_items = yield Promise.all(line_items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const { product_id, variant } = item;
            const product = yield (0, find_product_by_property_1.findProductByProperty)('_id', product_id.toString());
            if (!product) {
                throw new Error('Product not found');
            }
            return Object.assign(Object.assign({}, item), { price: ((_a = product.variants.find((v) => v.name === variant)) === null || _a === void 0 ? void 0 : _a.price) || product.price, discount: product.discount });
        })));
        const { price, discount } = populate_line_items.reduce((acc, cur) => {
            const curDiscount = cur.price * cur.quantity * (cur.discount / 100);
            const curPrice = cur.price * cur.quantity;
            acc.discount = acc.discount + curDiscount;
            acc.price = acc.price + curPrice - curDiscount;
            return acc;
        }, {
            discount: 0,
            price: 0,
        });
        let shipping = 120;
        if (division === 'Dhaka')
            shipping = 80;
        // Check if coupon code is valid
        let coupon_discount = 0;
        if (coupon_code) {
            const is_coupon_valid = yield (0, find_coupon_by_property_1.findCouponByProperty)('code', coupon_code);
            if (!is_coupon_valid) {
                res.status(400).json({ success: false, message: 'Invalid coupon code' });
                return;
            }
            const { expireAt, quantity, type, discount } = is_coupon_valid;
            if (expireAt && new Date().getTime() < Date.now()) {
                res.status(400).json({ success: false, message: 'Coupon code has expired' });
                return;
            }
            if (quantity === 0) {
                res.status(400).json({ success: false, message: 'Coupon code has been exhausted' });
                return;
            }
            if (type === 'flat') {
                coupon_discount = discount;
            }
            else if (type === 'percentage') {
                coupon_discount = price * (discount / 100);
            }
        }
        const actual_price = +(price + shipping - coupon_discount).toFixed(2);
        const order = yield (0, create_order_1.createOrderService)({
            name,
            email,
            phone,
            line_items: populate_line_items,
            price: actual_price < 0 ? 0 : actual_price,
            discount: +discount.toFixed(2),
            shipping,
            division,
            district,
            sub_district,
            address,
            coupon_code,
            coupon_discount: +coupon_discount.toFixed(2),
            tracking_id: +Date.now().toString().slice(4),
            instruction,
        });
        if (coupon_code) {
            const coupon = yield (0, find_coupon_by_property_1.findCouponByProperty)('code', coupon_code);
            if (coupon && coupon.quantity) {
                coupon.quantity -= 1;
                yield coupon.save();
            }
        }
        res.status(201).json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
});
exports.createOrder = createOrder;
