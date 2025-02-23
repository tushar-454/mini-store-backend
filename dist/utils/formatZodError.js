"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatZodErrors = (zodError) => zodError.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
}));
exports.default = formatZodErrors;
