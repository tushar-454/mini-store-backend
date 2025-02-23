"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: null },
    password: { type: String, default: null },
    photo: { type: String, default: null },
    role: { type: String, required: true, default: 'admin' },
    status: { type: String, required: true, default: 'active' },
    is_deleted: { type: Boolean, required: true, default: false },
}, { timestamps: true, versionKey: false });
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
