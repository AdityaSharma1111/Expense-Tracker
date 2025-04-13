import { Router } from "express";
import { register, login, getCurrentUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router()

router.route("/register").post(upload.single("avatar"), asyncHandler(register))
router.route("/login").post(asyncHandler(login))
router.route("/current").get(verifyJWT, getCurrentUser)

export default router