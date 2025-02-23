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
exports.createCategoryValidation = void 0;
const zod_1 = require("zod");
const formatZodError_1 = __importDefault(require("../../utils/formatZodError"));
const createCategoryValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ message: 'Name is required' }),
    photo: zod_1.z.string({ message: 'Photo link is required' }).url({ message: 'Invalid photo URL' }),
});
const createCategoryValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body = createCategoryValidationSchema.parse(req.body);
        next();
    }
    catch (error) {
        const result = createCategoryValidationSchema.safeParse(req.body);
        res.status(400).json({
            status: 400,
            errors: result.error ? (0, formatZodError_1.default)(result.error) : [],
        });
    }
});
exports.createCategoryValidation = createCategoryValidation;
