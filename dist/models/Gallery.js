"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = void 0;
const mongoose_1 = require("mongoose");
const GallerySchema = new mongoose_1.Schema({
    src: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    label: { type: String, required: true },
}, { timestamps: true, versionKey: false });
const Gallery = (0, mongoose_1.model)('Gallery', GallerySchema);
exports.Gallery = Gallery;
