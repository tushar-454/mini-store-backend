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
exports.findCouponByProperty = void 0;
const Coupon_1 = require("../../models/Coupon");
const findCouponByProperty = (property, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupon = yield Coupon_1.Coupon.findOne({
            [property]: value,
        });
        return coupon || undefined;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        console.error('Error finding coupon by property:', error);
    }
});
exports.findCouponByProperty = findCouponByProperty;
