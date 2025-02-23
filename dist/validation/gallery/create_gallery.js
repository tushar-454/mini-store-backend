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
exports.createGalleryValidation = void 0;
const zod_1 = require("zod");
const formatZodError_1 = __importDefault(require("../../utils/formatZodError"));
const createGalleryValidationSchema = zod_1.z.object({
    src: zod_1.z.string({ message: 'src is required' }).url({ message: 'src must be a valid URL' }),
    width: zod_1.z.number({ message: 'width is required' }).positive(),
    height: zod_1.z.number({ message: 'height is required' }).positive(),
    label: zod_1.z.string({ message: 'label is required' }),
});
const createGalleryValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body = createGalleryValidationSchema.parse(req.body);
        next();
    }
    catch (error) {
        const result = createGalleryValidationSchema.safeParse(req.body);
        res.status(400).json({
            status: 400,
            errors: result.error ? (0, formatZodError_1.default)(result.error) : [],
        });
    }
});
exports.createGalleryValidation = createGalleryValidation;
