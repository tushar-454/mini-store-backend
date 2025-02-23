"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = require("mongoose");
const CouponSchema = new mongoose_1.Schema({
    code: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ['flat', 'percentage'] },
    discount: { type: Number, required: true },
    quantity: { type: Number, default: null },
    minprice: { type: Number, default: null },
    startAt: { type: String, default: null },
    expireAt: { type: String, default: null },
}, { timestamps: true, versionKey: false });
const Coupon = (0, mongoose_1.model)('Coupon', CouponSchema);
exports.Coupon = Coupon;
