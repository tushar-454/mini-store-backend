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
exports.updateCoupon = void 0;
const find_coupon_by_property_1 = require("../../services/coupon/find_coupon_by_property");
const updateCoupon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { couponId } = req.params;
        const { code, type, discount, quantity, startAt, expireAt } = req.body;
        const coupon = yield (0, find_coupon_by_property_1.findCouponByProperty)('_id', couponId);
        if (!coupon) {
            res.status(400).json({
                success: false,
                error: 'Resource not found',
            });
            return;
        }
        coupon.code = code !== null && code !== void 0 ? code : coupon.code;
        coupon.type = type !== null && type !== void 0 ? type : coupon.type;
        coupon.discount = discount !== null && discount !== void 0 ? discount : coupon.discount;
        coupon.quantity = quantity !== null && quantity !== void 0 ? quantity : coupon.quantity;
        coupon.startAt = startAt !== null && startAt !== void 0 ? startAt : coupon.startAt;
        coupon.expireAt = expireAt !== null && expireAt !== void 0 ? expireAt : coupon.expireAt;
        yield coupon.save();
        res.status(200).json({
            status: true,
            message: 'Resource updated',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCoupon = updateCoupon;
