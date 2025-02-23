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
exports.getGalleryService = void 0;
const Gallery_1 = require("../../models/Gallery");
const getGalleryService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const galleries = yield Gallery_1.Gallery.find().select({
            createdAt: 0,
            updatedAt: 0,
        });
        return galleries || [];
    }
    catch (error) {
        console.log('Error in getGalleryService', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
exports.getGalleryService = getGalleryService;
