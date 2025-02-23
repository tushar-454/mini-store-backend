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
exports.createCoupon = void 0;
const create_coupon_1 = require("../../services/coupon/create_coupon");
const createCoupon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, type, discount, quantity, minprice, startAt, expireAt } = req.body;
        const coupon = yield (0, create_coupon_1.createCouponService)({ code, type, discount, quantity, minprice, startAt, expireAt });
        res.status(201).json({ success: true, data: coupon });
    }
    catch (error) {
        next(error);
    }
});
exports.createCoupon = createCoupon;
