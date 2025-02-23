"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackingRouter = void 0;
const express_1 = require("express");
const order_tracking_1 = require("../controllers/tracking/order_tracking");
const router = (0, express_1.Router)();
exports.trackingRouter = router;
router.get('/:trackingId', order_tracking_1.orderTracking);
