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
exports.getGallery = void 0;
const get_gallery_1 = require("../../services/gallery/get_gallery");
const getGallery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const galleries = yield (0, get_gallery_1.getGalleryService)();
        res.status(200).json({ success: true, data: galleries });
    }
    catch (error) {
        next(error);
    }
});
exports.getGallery = getGallery;
