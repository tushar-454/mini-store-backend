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
exports.createReview = void 0;
const find_order_by_property_1 = require("../../services/order/find_order_by_property");
const create_review_1 = require("../../services/review/create_review");
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, name, email, phone, photo } = req.user;
    const { orderId } = req.params;
    try {
        const order = yield (0, find_order_by_property_1.findOrderByProperty)('_id', orderId);
        if (!order) {
            res.status(404).json({ success: false, error: 'order not found' });
            return;
        }
        if (order.isReviewed) {
            res.status(400).json({ success: false, error: 'order already reviewed' });
            return;
        }
        if (order.status !== 'delivered') {
            res.status(400).json({ success: false, error: 'order not delivered yet' });
            return;
        }
        const { comment } = req.body;
        if (!name || !email) {
            res.status(400).json({ success: false, error: 'update your profile with phone photo' });
            return;
        }
        const review = yield (0, create_review_1.createReviewService)({
            user: { _id, name, email, phone, photo },
            reviewInput: { comment },
        });
        order.isReviewed = true;
        yield order.save();
        res.status(201).json({ success: true, data: review });
    }
    catch (error) {
        next(error);
    }
});
exports.createReview = createReview;
