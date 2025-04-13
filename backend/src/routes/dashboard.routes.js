import {Router} from 'express';
import { getDashboardData, getSummary } from '../controllers/dashboard.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.route("/").get(verifyJWT, getDashboardData);
router.route("/generateSummary").get(verifyJWT, asyncHandler(getSummary));


export default router;