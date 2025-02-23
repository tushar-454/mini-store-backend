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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCouponValidation = void 0;
const zod_1 = require("zod");
const formatZodError_1 = __importDefault(require("../../utils/formatZodError"));
const updateCouponValidationSchema = zod_1.z.object({
    code: zod_1.z.string({ message: 'Coupon code is Required' }).optional(),
    type: zod_1.z.enum(['flat', 'percentage'], { message: 'Coupon type is Required [flat / percentage]' }).optional(),
    discount: zod_1.z.number({ message: 'Coupon discount is Required as number' }).positive({ message: 'Coupon discount must be greater than 0' }).optional(),
    quantity: zod_1.z.number({ message: 'Coupon quantity is Required as number' }).optional(),
    startAt: zod_1.z.string({ message: 'StartAt is Required as ISO String' }).optional(),
    expireAt: zod_1.z
        .string({ message: 'ExpireAt is Required as ISO String' })
        .refine((date) => {
        const expireAtDate = new Date(date).getTime();
        const currentDate = new Date().getTime();
        return currentDate < expireAtDate;
    }, {
        message: 'ExpireAt must be greater than current date',
    })
        .optional(),
});
const updateCouponValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body = updateCouponValidationSchema.parse(req.body);
        next();
    }
    catch (error) {
        const result = updateCouponValidationSchema.safeParse(req.body);
        res.status(400).json({
            status: 400,
            errors: result.error ? (0, formatZodError_1.default)(result.error) : [],
        });
    }
});
exports.updateCouponValidation = updateCouponValidation;
