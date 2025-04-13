import { Router } from "express";
import { addIncome, getIncomes, deleteIncome, downloadIncomeExcel } from "../controllers/income.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/add").post(verifyJWT, addIncome)
router.route("/get").get(verifyJWT, getIncomes)
router.route("/download").get(verifyJWT, downloadIncomeExcel)
router.route("/delete/:id").delete(verifyJWT, deleteIncome)


export default router