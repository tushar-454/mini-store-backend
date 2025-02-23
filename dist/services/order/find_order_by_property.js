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
exports.findOrderByProperty = void 0;
const Order_1 = require("../../models/Order");
const findOrderByProperty = (property, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.Order.findOne({
            [property]: value,
        });
        return order || undefined;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        console.error('Error finding order by property:', error);
    }
});
exports.findOrderByProperty = findOrderByProperty;
