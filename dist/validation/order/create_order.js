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
exports.createOrderValidation = void 0;
const zod_1 = require("zod");
const formatZodError_1 = __importDefault(require("../../utils/formatZodError"));
const createOrderValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        message: 'Name is required',
    }),
    email: zod_1.z.string().email({
        message: 'Invalid email address',
    }),
    phone: zod_1.z.string({
        message: 'Phone is required',
    }),
    line_items: zod_1.z.array(zod_1.z.object({
        product_id: zod_1.z.string(),
        name: zod_1.z.string(),
        image: zod_1.z.string().url({
            message: 'Invalid image URL',
        }),
        quantity: zod_1.z.number(),
        variant: zod_1.z.string(),
    })),
    division: zod_1.z.string({
        message: 'Division is required',
    }),
    district: zod_1.z.string({
        message: 'District is required',
    }),
    sub_district: zod_1.z.string({
        message: 'Upazilla is required',
    }),
    address: zod_1.z.string({
        message: 'Address is required',
    }),
    coupon_code: zod_1.z.string().optional(),
    instruction: zod_1.z.string().optional(),
});
const createOrderValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body = createOrderValidationSchema.parse(req.body);
        next();
    }
    catch (error) {
        const result = createOrderValidationSchema.safeParse(req.body);
        res.status(400).json({
            status: 400,
            errors: result.error ? (0, formatZodError_1.default)(result.error) : [],
        });
    }
});
exports.createOrderValidation = createOrderValidation;
