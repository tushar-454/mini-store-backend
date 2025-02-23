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
exports.createCarouselService = void 0;
const Carousel_1 = require("../../models/Carousel");
const createCarouselService = (carousel) => __awaiter(void 0, void 0, void 0, function* () {
    const { image } = carousel;
    try {
        const new_carousel = yield Carousel_1.Carousel.create({ image });
        yield new_carousel.save();
        return new_carousel;
    }
    catch (error) {
        console.error('Error creating carousel:', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
exports.createCarouselService = createCarouselService;
