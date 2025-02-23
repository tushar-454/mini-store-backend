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
exports.findProductByProperty = void 0;
const Product_1 = require("../../models/Product");
const findProductByProperty = (property, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.Product.findOne({
            [property]: value,
        });
        return product || undefined;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        console.error('Error finding product by property:', error);
    }
});
exports.findProductByProperty = findProductByProperty;
