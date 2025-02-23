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
exports.updateCarousel = void 0;
const find_carousel_by_property_1 = require("../../services/carousel/find_carousel_by_property");
const updateCarousel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carouselId } = req.params;
        const { image } = req.body;
        const carousel = yield (0, find_carousel_by_property_1.findCarouselByProperty)('_id', carouselId);
        if (!carousel) {
            res.status(400).json({
                success: false,
                error: 'Resource not found',
            });
            return;
        }
        carousel.image = image !== null && image !== void 0 ? image : carousel.image;
        yield carousel.save();
        res.status(200).json({
            status: true,
            message: 'Resource updated',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCarousel = updateCarousel;
