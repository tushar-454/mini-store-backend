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
exports.createReviewService = void 0;
const Review_1 = require("../../models/Review");
const createReviewService = (review) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: { _id, name, email, phone, photo }, reviewInput: { comment }, } = review;
    try {
        const new_review = yield Review_1.Review.create({ user: _id, name, email, photo, phone, comment });
        yield new_review.save();
        return new_review;
    }
    catch (error) {
        console.error('Error creating review:', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
exports.createReviewService = createReviewService;
