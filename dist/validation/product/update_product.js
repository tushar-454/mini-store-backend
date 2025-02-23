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
exports.updateProductValidation = void 0;
const zod_1 = require("zod");
const formatZodError_1 = __importDefault(require("../../utils/formatZodError"));
const updateProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty().optional(),
    description: zod_1.z.string().nonempty().optional(),
    price: zod_1.z.number().positive().optional(),
    discount: zod_1.z.number().int().min(0).max(100).optional().optional(),
    stock: zod_1.z.number().int().min(0).optional().optional(),
    images: zod_1.z.array(zod_1.z.string().url()).nonempty().optional(),
    is_featured: zod_1.z.boolean().optional().optional(),
    is_upcoming: zod_1.z.boolean().optional().optional(),
    is_deleted: zod_1.z.boolean().optional().optional(),
    sell_count: zod_1.z.number().int().min(0).optional(),
    rating: zod_1.z.number().min(0).max(5).optional(),
    category: zod_1.z.string().nonempty().optional(),
    variants: zod_1.z
        .array(zod_1.z.object({
        _id: zod_1.z.string(),
        name: zod_1.z.string().nonempty(),
        price: zod_1.z.number().positive(),
    }))
        .optional(),
    status: zod_1.z.enum(['active', 'inactive', 'stock out']).optional(),
});
const updateProductValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body = updateProductValidationSchema.parse(req.body);
        next();
    }
    catch (error) {
        const result = updateProductValidationSchema.safeParse(req.body);
        res.status(400).json({
            status: 400,
            errors: result.error ? (0, formatZodError_1.default)(result.error) : [],
        });
    }
});
exports.updateProductValidation = updateProductValidation;
