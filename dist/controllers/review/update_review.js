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
exports.updateReview = void 0;
const find_review_by_property_1 = require("../../services/review/find_review_by_property");
const updateReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reviewId } = req.params;
        const { is_deleted } = req.body;
        const review = yield (0, find_review_by_property_1.findReviewByProperty)('_id', reviewId);
        if (!review) {
            res.status(400).json({
                success: false,
                error: 'Resource not found',
            });
            return;
        }
        review.is_deleted = is_deleted !== null && is_deleted !== void 0 ? is_deleted : review.is_deleted;
        yield review.save();
        res.status(200).json({
            success: true,
            message: 'Resource updated',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateReview = updateReview;
