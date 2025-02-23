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
exports.getCouponByCode = void 0;
const find_coupon_by_property_1 = require("../../services/coupon/find_coupon_by_property");
const getCouponByCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        const coupon = yield (0, find_coupon_by_property_1.findCouponByProperty)('code', code);
        if (!coupon) {
            res.status(404).json({ success: false, message: 'Coupon not found' });
            return;
        }
        res.status(200).json({
            success: true,
            data: coupon,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCouponByCode = getCouponByCode;
