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
exports.findGalleryByProperty = void 0;
const Gallery_1 = require("../../models/Gallery");
const findGalleryByProperty = (property, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gallery = yield Gallery_1.Gallery.findOne({
            [property]: value,
        });
        return gallery || undefined;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        console.error('Error finding gallery by property:', error);
    }
});
exports.findGalleryByProperty = findGalleryByProperty;
