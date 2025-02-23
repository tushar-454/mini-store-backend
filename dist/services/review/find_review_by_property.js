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
exports.findReviewByProperty = void 0;
const Review_1 = require("../../models/Review");
const findReviewByProperty = (property, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield Review_1.Review.findOne({
            [property]: value,
        });
        return review || undefined;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        console.error('Error finding review by property:', error);
    }
});
exports.findReviewByProperty = findReviewByProperty;
