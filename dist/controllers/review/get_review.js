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
exports.getReview = void 0;
const get_review_1 = require("../../services/review/get_review");
const getReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { is_deleted } = req.query;
        if (is_deleted === 'all') {
            const reviews = yield (0, get_review_1.getReviewService)({});
            res.status(200).json({ success: true, data: reviews });
            return;
        }
        else if (is_deleted === 'true') {
            const reviews = yield (0, get_review_1.getReviewService)({ is_deleted: true });
            res.status(200).json({ success: true, data: reviews });
            return;
        }
        const reviews = yield (0, get_review_1.getReviewService)({ is_deleted: false });
        res.status(200).json({ success: true, data: reviews });
    }
    catch (error) {
        next(error);
    }
});
exports.getReview = getReview;
