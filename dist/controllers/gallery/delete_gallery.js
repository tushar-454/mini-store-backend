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
exports.deleteGallery = void 0;
const find_gallery_by_property_1 = require("../../services/gallery/find_gallery_by_property");
const deleteGallery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { galleryId } = req.params;
        const gallery = yield (0, find_gallery_by_property_1.findGalleryByProperty)('_id', galleryId);
        if (!gallery) {
            res.status(400).json({
                success: false,
                error: 'Resource not found',
            });
            return;
        }
        const result = yield gallery.deleteOne();
        if (result.deletedCount === 0) {
            res.status(500).json({
                success: false,
                error: 'Problem occur while deleting.',
            });
            return;
        }
        res.status(204).json({
            status: true,
            message: 'Resource deleted',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteGallery = deleteGallery;
