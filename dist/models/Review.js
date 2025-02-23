"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '+8801********' },
    photo: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/219/219969.png' },
    comment: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });
const Review = (0, mongoose_1.model)('Review', ReviewSchema);
exports.Review = Review;
