import { Router } from "express";
import { addExpense, getExpenses, deleteExpense, downloadExpenseExcel } from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/add").post(verifyJWT, addExpense)
router.route("/get").get(verifyJWT, getExpenses)
router.route("/download").get(verifyJWT, downloadExpenseExcel)
router.route("/delete/:id").delete(verifyJWT, deleteExpense)


export default router