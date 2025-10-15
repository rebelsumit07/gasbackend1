import express from "express";
import { getVerifiedOrders, updateStatus } from "../controllers/courierController.js";

const router = express.Router();

router.get("/verified", getVerifiedOrders);
router.put("/status/:orderId", updateStatus);

export default router;
