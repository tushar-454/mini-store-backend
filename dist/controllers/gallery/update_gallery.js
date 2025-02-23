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
exports.updateGallery = void 0;
const find_gallery_by_property_1 = require("../../services/gallery/find_gallery_by_property");
const updateGallery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { galleryId } = req.params;
        const { src, width, height, label } = req.body;
        const gallery = yield (0, find_gallery_by_property_1.findGalleryByProperty)('_id', galleryId);
        if (!gallery) {
            res.status(400).json({
                success: false,
                error: 'Resource not found',
            });
            return;
        }
        gallery.src = src !== null && src !== void 0 ? src : gallery.src;
        gallery.width = width !== null && width !== void 0 ? width : gallery.width;
        gallery.height = height !== null && height !== void 0 ? height : gallery.height;
        gallery.label = label !== null && label !== void 0 ? label : gallery.label;
        yield gallery.save();
        res.status(200).json({
            status: true,
            message: 'Resource updated',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateGallery = updateGallery;
