import { Router } from "express";
import { cancelOrder, captureOrder, createdOrder } from '../controllers/payment.controller.js';

const router = Router();

router.get('/create-order', createdOrder);

router.get('/capture-order', captureOrder);

router.get('/cancel-order', cancelOrder);

export default router;