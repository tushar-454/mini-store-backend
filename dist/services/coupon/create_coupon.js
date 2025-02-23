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
exports.createCouponService = void 0;
const Coupon_1 = require("../../models/Coupon");
const createCouponService = (coupon) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, type, discount, quantity, minprice, startAt, expireAt } = coupon;
    try {
        const new_coupon = yield Coupon_1.Coupon.create({ code, type, discount, quantity: quantity === 0 ? null : quantity, minprice, startAt, expireAt });
        yield new_coupon.save();
        return new_coupon;
    }
    catch (error) {
        console.error('Error creating coupon:', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
exports.createCouponService = createCouponService;
