import express from 'express';
import { getBalance, getTicker } from  "../controllers/geminiController.js";

const router = express.Router();

router.get('/balance', getBalance);
router.get('/ticker/:symbol', getTicker);

export default router;