"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: { type: [String], required: true },
    is_featured: { type: Boolean, default: false },
    is_upcoming: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    sell_count: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    category: { type: String, required: true },
    variants: { type: [{ name: String, price: Number }], required: true },
    status: { type: String, default: 'active' },
    slug: { type: String, required: true },
}, { timestamps: true, versionKey: false });
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.Product = Product;
