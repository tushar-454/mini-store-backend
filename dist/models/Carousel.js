"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carousel = void 0;
const mongoose_1 = require("mongoose");
const CarouselSchema = new mongoose_1.Schema({
    image: { type: String, required: true },
}, { timestamps: true, versionKey: false });
const Carousel = (0, mongoose_1.model)('Carousel', CarouselSchema);
exports.Carousel = Carousel;
