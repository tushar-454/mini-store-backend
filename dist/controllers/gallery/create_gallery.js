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
exports.createGallery = void 0;
const create_gallery_1 = require("../../services/gallery/create_gallery");
const createGallery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { src, width, height, label } = req.body;
        const gallery = yield (0, create_gallery_1.createGalleryService)({ src, width, height, label });
        res.status(201).json({ success: true, data: gallery });
    }
    catch (error) {
        next(error);
    }
});
exports.createGallery = createGallery;
